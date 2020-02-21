const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const redis = require('redis')
const session = require('express-session')

let redisStore = require('connect-redis')(session)
let redisClient = redis.createClient(6379, "redis")

redisClient.on('error', function(err){
	console.log('Something went wrong ', err)
  });

const variousRouter = require('./routers/various-router')
const accountRouter = require('./routers/account-router')
const eventRouter = require('./routers/event-router')

const app = express()

// Setup express-handlebars.
app.set('views', path.join(__dirname, 'views'))

app.use(session({
	store: new redisStore({ client: redisClient }),
	secret: "ssshhhhh",
	saveUninitialized: false,
	resave: false
}))

// Add info about if the user is logged in or not.
app.use(function(request, response, next){
	response.locals.isLoggedIn = request.session.isLoggedIn
	next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))

app.engine('hbs', expressHandlebars({
	extname: 'hbs',
	defaultLayout: 'main',
	layoutsDir: path.join(__dirname, 'layouts')
}))

// Handle static files in the public folder.
app.use(express.static(path.join(__dirname, 'public')))

// Attach all routers.
app.use('/', variousRouter)
app.use('/accounts', accountRouter)
app.use('/events', eventRouter)

// Start listening for incoming HTTP requests!
app.listen(8080, function(){
	console.log('Running on 8080!')
})