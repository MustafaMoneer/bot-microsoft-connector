# Start coding your bot: Recast.AI + Microsoft Bot Connector

This Starter Kit will help you start coding a bot connected to Microsoft Bot connector with [Recast.AI](https://recast.ai/).

## Requirements

* Create an account on Recast.AI
* Create an account on Microsoft Bot Framework
* Create accounts on messaging applications handled by Microsoft Bot Platform(Slack, Messenger, Kik...)

## Get your Recast Bot Token

* Log in to your Recast.AI account
* Create your Bot
* Create intents and fill them with some expressions
* Build your conversation flow on bot builder in the 'Build' tab
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
	},
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

* use **res.memory('knowledge')** to access a knowledge you just got in the input like a mail, a datetime etc...
* use **res.action** to get the current action according to your bot builder flow
* in **action**, you can find a done boolean to know if this action is complete according to the requirements (ex: booking need to signin, signin needs a login)
* use **res.reply()** to get the reply you've set for this action
* use **res.replies** to get an array containing the reply set for the action && the following one if the next action can be done
* use **res.nextActions** to get an array of all the following actions

For more information, please read the [SDK NodeJS documentation](https://github.com/RecastAI/SDK-NodeJS)

```javascript
bot.dialog('/', (session) => {
  const text = session.message.text

  // CALL TO RECAST.AI: message.user contain a unique Id of your conversation in Slack
  // The converseToken is what let Recast identify your conversation.
  // As message.user is what identify your slack conversation, you can use it as converseToken.

  recastClient.converse(text, { converseToken: session.message.address.conversation.id })
  .then((res) => {
    const replies = res.replies
    const action = res.action

    if (!replies.length) {
      session.send('I didn\'t understand... Sorry :(')
      return
    }

    if (action.done) {
      // Use external services: use res.memory('knowledge') if you got a knowledge from this action
    }

    replies.forEach(reply => session.send(reply))
  })
  .catch(() => {
    session.send('I need some sleep right now... Talk to me later!')
  })
})
```

## Author

Hugo Cherchi - Recast.AI hugo.cherchi@recast.ai

You can follow us on Twitter at @recastai for updates and releases.

## License

Copyright (c) [2016] [Recast.AI](https://recast.ai/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
