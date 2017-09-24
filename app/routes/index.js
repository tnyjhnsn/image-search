'use strict'

const request = require('request')

const url = 'https://www.googleapis.com/customsearch/v1' +
'?searchType=image&key=' + process.env.API_KEY +
'&cx=' + process.env.CSE_ID + '&q='

module.exports = (app, collection) => {

	app.route('/')
		.get( (req, res) => {
			res.sendFile(process.cwd() + '/public/index.html')
		}
	)

	app.route('/imagesearch/:q').get((req, res) => {
		let search = url + req.params.q
		let start = +req.query.offset || 0
		if (start > 0) {
			search += '&start=' + start
		}
		request.get(search, function(err, results, body) {
			if (err) return res.status(500).send(err)
			if (results.statusCode !== 200) return res.sendStatus(results.status)
			let response = JSON.parse(body).items.map(item => {
				return {
					url: item.link,
					snippet: item.snippet,
					thumbnail: item.image.thumbnailLink,
					context: item.image.contextLink
				}
			})
			let log = {
				term: req.params.q.split('?').shift(),
				when: new Date()
			}
			collection.insert(log, (err, data) => {
				if (err) return res.status(500).send(err)
				res.json(response)
			})
		})
	})

	app.route('/latest').get((req, res) => {
		collection.find({}, {_id: false})
		.sort({_id: -1})
		.limit(10)
		.toArray((err, docs) => {
			if (err) return res.status(500).send(err)
			res.json(docs)
		})
	})
}
