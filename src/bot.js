// MODULES IMPORT
const recast = require('recastai')
const restify = require('restify')
const builder = require('botbuilder')
const config = require('../config.js')

// RECAST.AI INIT: Language is optionnal
const recastClient = new recast.Client(config.recast.token, config.recast.language)

// CONNECTION TO MICROSOFT BOT
const connector = new builder.ChatConnector({
  appId: config.microsoft.appId,
  appPassword: config.microsoft.appPassword,
})
const bot = new builder.UniversalBot(connector)

// EVENT: message received on Microsoft
bot.dialog('/', (session) => {
  const text = session.message.text

  // CALL TO RECAST.AI: session.message.address.conversation.id contain a unique Id of your conversation with the channel used
  // The conversationToken is what let Recast identify your conversation.
  // As session.message.address.conversation.id is what identify your conversation with the channel used, you can use it as conversationToken.
  recastClient.textConverse(text, { conversationToken: session.message.address.conversation.id })
  .then((res) => {
    const replies = res.replies
    const action = res.action

    if (!replies.length) {
      session.send('I didn\'t understand... Sorry :(')
      return
    }

    if (action && action.done) {
      // Use external services: use res.memory('notion') if you got a notion from this action
    }

    replies.forEach(reply => session.send(reply))
  })
  .catch(() => {
    session.send('I need some sleep right now... Talk to me later!')
  })
})

// Setup Restify Server
const server = restify.createServer()
server.listen(config.port)
server.post('/', connector.listen())
