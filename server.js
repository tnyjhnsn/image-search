'use strict'

const express = require('express')
const mongo = require('mongodb').MongoClient

require('dotenv').load()
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/image-search'
const app = express()
const routes = require('./app/routes/index.js')

mongo.connect(uri, (err, db) => {
	if (err) throw err

	routes(app, db.collection('images'))

	let port = process.env.PORT || 3002
	app.listen(port, () => {
		console.log('Node.js listening on port ' + port + '...')
	})
})
