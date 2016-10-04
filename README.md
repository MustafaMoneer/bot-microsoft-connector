# Start coding your bot with Microsoft Bot Connector

This Starter Kit will help you start coding a bot connected to Microsoft Bot connector with Recast.AI.

## Requirements

* Create an account on Recast.AI
* Create an account on Microsoft Bot Framework
* Create accounts on messaging applications handled by Microsoft Bot Platform(Slack, Messenger, Kik...)
* Set up your Recast.AI account

## Get your Recast Bot Token

* Log in to your Recast.AI account
* Create your Bot
* Create intents and fill them with some expressions
* Build your tree on BotBuilder in the 'Build' tab
* In the tab menu, click on the the little screw
* Here is the `request access token` you will need to configure your bot!

## Get your Microsoft secret

* Create an account on [Microsoft Bot Framework](https://dev.botframework.com/)
* Create a new Bot and follow the procedure. The Endpoint Url you have to put will be explain later.
* Get your Secret and AppId that will be usefull later
* Follow the differents steps for every channel you want to add.

## Put your local server Online

```
./ngrok http 8080
```

this terminal is now used by ngrok and you can see your full Url that is required on microsoft bot Platform

## Launch the Bot

#### Complete the config.js

* Clone this Repository

```
git clone https://github.com/hcherchi/Starter-Kit-Microsoft-bot-connector.git
```

* Fill the config.js with your Tokens

```javascript
const config =
{
	recast: {
		token: 'RECAST TOKEN',
		language: 'en',
	},
	microsoft: {
		AppId: 'MICROSOFT APP ID',
		Secret: 'MICROSOFT APP SECRET',
	}
	port: 8080,
}
```

#### Run

* install the dependencies

```
npm install
```

* run your bot

```
npm run start
```

## Go further

Here is the heart of your bot, this function is called everytime your bot receive a message.
'res' is full of precious informations:

* use res.get('nameOfEntity') to extract an entity like a mail, a datetime etc...
* use res.action() to get the current action according to your botbuilder schema
* in action, you can find a done boolean to know if this action can be done according to the requirements (ex: signin needs login)
* use res.reply() to get the reply you've set for this action
* use res.replies() to get an array containing the reply set for the action && the following one if the next action can be done
* use res.nextActions() to get an array of all the following actions

```javascript
bot.dialog('/', (session) => {

  const text = session.message.text
  recastClient.converse(text, config.recast.language, session.message.address.conversation.id)
  .then((res) => {
    const action = res.action()
    const replies = res.replies()

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
```

## Author

Hugo Cherchi - Recast.AI hugo.cherchi@recast.ai

You can follow us on Twitter at @recastai for updates and releases.
