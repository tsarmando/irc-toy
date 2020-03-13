let irc = require("irc")
let mp = require('./mapToJson.js')
let brainTools = require('./dictionaryMap.js')

const config = {
	channels: ["#loooseGoose"],
	server: "irc.rizon.net",
	botName: "marvin"
}


const startBot = (brain) => {
	const bot = new irc.Client(config.server, config.botName, {
		channels: config.channels
	})
	console.log(brainTools.makeSentence(brain, 'i', 20))
	//say things to channel upon entering
	bot.addListener("join", (channel, who) => {

		bot.say(channel, "...dude...help me!")
	})
	//keeps track of everything said in channel
	bot.addListener('message#loooseGoose', function (from, message) {
		    console.log(from + ' => #looseGoose: ' + message);
		    let regexp = new RegExp('marvin*','g')
		    if(regexp.test(message))
		    { 
			  let seed = brainTools.randomKey(brain) 
			  console.log("your seed: " ,seed)
			  bot.say('#loooseGoose', brainTools.makeSentence(brain, seed, 15)); 
		    }
	})

}

mp.loadMapJson('brain2.json',startBot) 
