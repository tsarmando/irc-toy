//simple dict:
let fs = require('fs')
const myDictionary = new Map()
let ircLog = ''
let sentence = "Alright, listen up. This is a test. is dog is cat is boy is cat"
/*
fs.readFile('./cleanLog.txt','utf8', (err, data) => {
	if(err)
		return console.log(err)	
	ircLog = data		
	if(ircLog !='')
	fillDictionary(myDictionary,ircLog)
	//console.log(myDictionary.get("blade"))
	const map1 = new Map();
	fillDictionary(map1,sentence)
	let seed  = randomKey(map1)
	let seed1 = randomKey(map1)
	let seed2 = randomKey(map1)
	let seed3 = randomKey(myDictionary)
	console.log(map1.get(seed))
	console.log(makeSentence(map1,seed2, 3))
	console.log(makeSentence(myDictionary,seed3, 50))
//	console.log(myDictionary)
//	writeMapJson(myDictionary, "brain.json")
})

*/
const fillDictionary = (dictionary,str) =>{
	let arr = str.split(' '), eof = false
	for(let i = 0; i<arr.length;i++){
		let values = [], total = 1 
		if(i+1<arr.length){
			values.push({"word": arr[i+1], "frequency": 1})
		}
		else eof = true
		if(dictionary.has(arr[i])){ 
				let [old,numWords] = dictionary.get(arr[i]), 
				elemOfDictionary = false;
			if(!eof){
				for(let k = 0; k<old.length-1; k++){
					if(old[k].word == values[0].word) {
						old[k].frequency++	
						dictionary.set(arr[i], [old,++numWords])
						elemOfDictionary = true;
					}
				}
			if(!elemOfDictionary){
					old.push(values[0])
					++numWords	
					dictionary.set(arr[i], [old,numWords])
				}
			}
			else{
				old.push({"word": '', "frequency": 0})
				dictionary.set(arr[i], [old,numWords])
			}	
		}
		else{ 
			if(!eof)
				dictionary.set(arr[i],[values,total])
			else {
				 val = ({"word": '', "frequency": 0})
				dictionary.set(arr[i], [val,0])
			}	
		}

	}

}	

const randRange = (lower,upper) => lower + Math.floor(Math.random() * (upper-lower))
const randArrIdx = (arr) => (!arr) ? "":arr[randRange(0,arr.length-1)]
//random key may experience async behavior, ex console.log(iterator)
//further testing required
const randomKey = (dictionary) => {
	let iterator = dictionary.keys(), stop = randRange(0,dictionary.size)
	for(let i = 0; i< stop-1; i++){
		iterator.next().value
	}
	return iterator.next().value
}

const probableWord = (wrdFreq, total) => {
	let rand = Math.random(), probability = 0
	for(let i = 0; i<wrdFreq.length-1; i++){
		probability += wrdFreq[i].frequency/total
		if(rand <= probability)
		       return wrdFreq[i].word	
	}
	return wrdFreq[wrdFreq.length-1].word
}

const makeSentence = (dictionary,seed, sentenceLength) => {
//	console.log("Dictionary is:" + " " + JSON.stringify(dictionary))
	if(sentenceLength == 0) return ""
	else {
		if(!dictionary.has(seed))
			seed = randomKey(dictionary)
		let [words,total] = dictionary.get(seed)
		let sentence = probableWord(words,total) 
		return sentence + " " + makeSentence(dictionary,sentence,sentenceLength-1)
	}
}

module.exports = {makeSentence: makeSentence, randomKey: randomKey, 
		randArrIdx: randArrIdx, randRange: randRange, fillDictionary : fillDictionary, probableWord: probableWord}
