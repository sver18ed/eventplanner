const express = require('express')
const webApp = require('./presentation-layer/app')

const app = express()

app.use(webApp)

// Start listening for incoming HTTP requests!
app.listen(8080, function(){
	console.log('Running on 8080!')
})