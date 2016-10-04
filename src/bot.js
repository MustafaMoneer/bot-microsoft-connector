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
  recastClient.converse(text, config.recast.language, session.message.address.conversation.id)
  .then((res) => {
    const action = res.action()
    const reply = res.reply()

    if (action.done) {
      console.log('Action is done!')
    }
    session.send(reply)
  })
  .catch(() => {
    session.send('I need some sleep right now... Talk to me later!')
  })
})

// Setup Restify Server
const server = restify.createServer()
server.listen(config.port)
server.post('/', connector.listen())
