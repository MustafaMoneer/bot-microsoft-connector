# Start coding your bot: Recast.AI + Microsoft Bot Connector

This Starter Kit will help you start coding a bot connected to Microsoft Bot connector with [Recast.AI](https://recast.ai).

## Requirements

* Create an account on [Recast.AI](https://recast.ai)
* Create an account on [Microsoft Bot Framework](https://dev.botframework.com)
* Create accounts on messaging applications available on Microsoft Bot Platform (Slack, Messenger, Kik...)

## Get your Recast.AI bot token

* Log in to your [Recast.AI](https://recast.ai/) account
* Create your Bot
* Create intents and fill them with some expressions
* Build your conversation flow on bot builder in the 'Build' tab
* In the tab menu, click on the the little screw
* Here is the `request access token` you will need to configure your bot!

## Get your Microsoft secret

* Create an account on [Microsoft Bot Framework](https://dev.botframework.com/)
* Create a new bot and follow the procedure. The endpoint url you have to put will be explained later.
* Get your app password and app ID that will be useful later
	![Microsoft](https://github.com/RecastAI/Pokebot/raw/master/pictures/recast-ai-microsoft-bot-creation.png)
* Follow the different steps for every channel you want to add.
	![Channels](https://github.com/RecastAI/Pokebot/raw/master/pictures/recast-ai-messenger-connect.png)

## Put your local server online with Ngrok

Whenever the bot receives a message on Microsoft Bot Platform, it will be sent to the server running on the endpoint url specified on Microsoft Bot Platform.
Problem: the server will be running locally (no url) That’s why you will use ngrok which make a local server run online.

* Download [ngrok](https://ngrok.com/) and put it at the root of your folder
* run it with `./ngrok http 8080`
* Copy and paste the secured url (https) on the endpoint field of your bot in Microsoft Bot Framework

	![Ngrok](https://github.com/RecastAI/Pokebot/raw/master/pictures/recast-ai-ngrok-console.png)

## Launch the bot

#### Complete the config.js file

* Clone this repository

```
git clone https://github.com/RecastAI/bot-microsoft-connector.git
```

* Fill the config.js with your tokens

```javascript
const config =
{
	recast: {
		token: 'RECAST TOKEN',
		language: 'en',
	},
	microsoft: {
		appId: 'MICROSOFT APP ID',
		appPassword: 'MICROSOFT APP PASSWORD',
	},
	port: 8080,
}
```

#### Run

* install the dependencies

```
cd bot-microsoft-connector
```
```
npm install
```

* run your bot

```
npm run start
```

## Go further

Here is the heart of your bot. The following function is called every time your bot receives a message.
'res' is full of precious information:

* use **res.memory('notion')** to access a notion you just got in the input like a email address, a datetime etc...
* use **res.action** to get the current action according to your bot builder flow
* in **action**, you can find a done boolean to know if this action is complete according to the requirements (ex: booking need to signin, signin needs a login)
* use **res.reply()** to get the reply you've set for this action
* use **res.replies** to get an array containing the reply set for the action && the following one if the next action is complete
* use **res.nextActions** to get an array of all the following actions

For more information, please read the [SDK NodeJS documentation](https://github.com/RecastAI/SDK-NodeJS)

```javascript
bot.dialog('/', (session) => {
  const text = session.message.text

  // CALL TO RECAST.AI: session.message.address.conversation.id contains a unique ID of your conversation with the channel used
  // The conversationToken is what lets Recast.AI identify your conversation.
  // As session.message.address.conversation.id is what identifies your conversation with the channel used, you can use it as conversationToken.

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
```

## Author

Hugo Cherchi - Recast.AI hugo.cherchi@recast.ai

You can follow us on Twitter at @recastai for updates and releases.

## License

Copyright (c) [2016] [Recast.AI](https://recast.ai/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
