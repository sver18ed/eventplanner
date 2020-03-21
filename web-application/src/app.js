const express = require('express')
const bodyParser = require('body-parser')
const webApp = require('./presentation-layer/app')
const restAPI = require('./presentation-layer-API/app')

const app = express()

// Setup bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))

app.use(webApp)
app.use(restAPI)

// If we get this far it's 404
app.use(function(request, response, next){
	const error = new Error('404 - Not found: '+request.originalUrl)
	response.status(404)
	next(error)
  })

app.use(function(error, request, response, next){
	const statusCode = response.statusCode === 200 ? 500 : response.statusCode
	response.status(statusCode)
	response.send(error.message)
})

// Start listening for incoming HTTP requests!
app.listen(8080, function(){
	console.log('Running on 8080!')
})