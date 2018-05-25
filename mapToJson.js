
const mapToObject= (yourMap) => {
	const converted = {}	
	console.log(yourMap)
	yourMap.forEach( (value,key,map) => converted[key] = value )
	return converted
}
const objectToMap = (obj) => {
	const map1 = new Map(), entries = Object.entries(obj)
	for(let i = 0; i < entries.length;i++)
		map1.set(entries[i][0],entries[i][1])
	return map1
}
const writeMapJson= (yourMap, file) => {
	const fs = require('fs')
	fs.writeFile(file,JSON.stringify(mapToObject(yourMap)), 
		(err) => err ? console.log(err):console.log('okay'))

		
}

const loadMapJson = (file, cb) => {
	const fs = require('fs')
	fs.readFile(file,'utf8', (err, data) => {
		if(err)	return console.log(err)	
		const yourMap = objectToMap(JSON.parse(data))	      
		cb(yourMap)
	})

}

module.exports =  { writeMapJson: writeMapJson, mapToObject: mapToObject, 
		objectToMap: objectToMap, loadMapJson: loadMapJson }

//module.exports = writeMapJson 
//module.exports = mapToObject
//module.exports = objectToMap 
//let testMap1 = loadMapJson('testmap.json')
