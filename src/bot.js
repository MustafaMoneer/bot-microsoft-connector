// MODULES IMPORT
const recast = require('recastai')
const restify = require('restify')
const builder = require('botbuilder')
const config = require('../config.js')

// RECAST.AI INIT
const recastClient = new recast.Client(config.recast.token, config.recast.language)

// CONNECTION TO MICROSOFT BOT
const connector = new builder.ChatConnector({
  appId: config.microsoft.appid,
  appPassword: config.microsoft.secret,
})
const bot = new builder.UniversalBot(connector)

// MESSAGE RECEIVED
bot.dialog('/', (session) => {

  const text = session.message.text
  recastClient.converse(text, { language: config.recast.language, converseToken: session.message.address.conversation.id })
  .then((res) => {
    const action = res.action
    const replies = res.replies

    if (!action) {
      console.log('No action')
      session.send('I didn\'t understand... Sorry :(')
      return
    }
    console.log(`The action of this message is: ${action.slug}`)

    if (replies[0]) {
      console.log('current action has a reply')
      session.send(replies[0])
    }

    if (action.done && replies[1]) {
      console.log('Action is done && next action has a reply')
      session.send(replies[1])
    }
  })
  .catch(() => {
    session.send('I need some sleep right now... Talk to me later!')
  })
})

// Setup Restify Server
const server = restify.createServer()
server.listen(config.port)
server.post('/', connector.listen())
