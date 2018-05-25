//simple dict:
let fs = require('fs')
const myDictionary = new Map()
let ircLog = ''
/*
fs.readFile('./cleanLog.txt','utf8', (err, data) => {
	if(err)
		return console.log(err)	
	ircLog = data		
	if(ircLog !='')
	fillDictionary(myDictionary,ircLog)
	let seed = (randomKey(myDictionary))
	console.log(myDictionary.get("I"))
	console.log(makeSentence(myDictionary,"blade", 50))
	console.log(myDictionary)
	writeMapJson(myDictionary, "brain.json")
})

*/
const fillDictionary = (dictionary,str) =>{
	let arr = str.split(' ')
	for(let i = 0; i<arr.length;i++){
		let values = [] 
		if(i+1<arr.length){
			values.push(arr[i+1])
		}
		//todo add frequency/probabilities to values 
		if(dictionary.has(arr[i])){ 
			let mergedValues = new Set (dictionary.get(arr[i]))
			mergedValues.add(...values)
			dictionary.set(arr[i],new Array(...mergedValues))
		}
		else{ 
//			values = new Array(...values)
			dictionary.set(arr[i],values)
		}

	}
	dictionary.set(arr[arr.length-1],["O/"])
}	

const randRange = (lower,upper) => lower + Math.floor(Math.random() * (upper-lower))
const randArrIdx = (arr) => (!arr) ? "":arr[randRange(0,arr.length-1)]
const randomKey = (dictionary) => {
	let iterator = dictionary.keys(), stop = randRange(0,dictionary.size)
	for(let i = 0; i< stop-1; i++){
		iterator.next().value
	}
	return iterator.next().value
}
const makeSentence = (dictionary,seed, sentenceLength) => {
	if(sentenceLength == 0) return ""
	else {
		if(!dictionary.has(seed))
			seed = randomKey(dictionary)
			let sentence = randArrIdx(dictionary.get(seed)) 
			return sentence + " " + makeSentence(dictionary,sentence[sentence.length-1],sentenceLength-1)
																	}
}

module.exports = {makeSentence: makeSentence, randomKey: randomKey, 
		randArrIdx: randArrIdx, randRange: randRange, fillDictionary : fillDictionary}

//To do: turn array into a Dictionary using Map
//dictionary takes each unique word in the text as key 
//for each key there is a word object:
//the word object contains an array (map with count of string?) ,where ever element is a string of n words that follows that follow the key, 
//and a function that selects a phrase based off of prob
//After this is created, this can be made into a json -> text file 
/* 
let dictionary = new Map()

class freqMap{
	constructor(){
	this.wrdFreq = new Map()
	}
}

class WordObject{
	constructor(){
	this.successor = new freqMap()
	}
	get frequency(){
		return 0;
	}
}*/	
