let irc = require("irc")
let mp = require('./mapToJson.js')
let brainTools = require('./dictionaryMap.js')

const config = {
	channels: ["#yourServer"],
	server: "irc.rizon.net",
	botName: "paranoid_android"
}


const startBot = (brain) => {
	const bot = new irc.Client(config.server, config.botName, {
		channels: config.channels

	})
	//say things to channel upon entering
	bot.addListener("join", (channel, who) => {

		bot.say(channel, "...dude...help me!")
	})
	//keeps track of everything said in channel
	bot.addListener('message#loooseGoose', function (from, message) {
		    console.log(from + ' => #looseGoose: ' + message);
		    if(message)	
			    bot.say('#loooseGoose', brainTools.makeSentence(brain, message[0], 25));
	})
	bot.addListener('message#loooseGoose', function (from, message) {
		console.log(typeof message)
		brainTools.fillDictionary(brain,message)//adds new messages to  dictionary
	})
}
mp.loadMapJson('brain.json', startBot) 

//const brain = new map()
//brain.set("hello", ["yo", "hi", "test"])
//brain.set("other", ["me", "go", "fall"])

/*brainTools.fillDictionary(brain,"This is a test message. Here is some filler. Boy goes boom. Cat speaks meow")*/
