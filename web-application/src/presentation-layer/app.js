const path = require('path')
const awilix = require('awilix')
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

const accountRepository = require('../data-access-layer-sequelize/account-repository')
const accountManager = require('../business-logic-layer/account-manager')
const accountRouter = require('../presentation-layer/routers/account-router')

const eventRepository = require('../data-access-layer-sequelize/event-repository')
const eventManager = require('../business-logic-layer/event-manager')
const eventRouter = require('../presentation-layer/routers/event-router')

const container = awilix.createContainer()

container.register("accountRepository", awilix.asFunction(accountRepository))
container.register("accountManager", awilix.asFunction(accountManager))
container.register("accountRouter", awilix.asFunction(accountRouter))

container.register("eventRepository", awilix.asFunction(eventRepository))
container.register("eventManager", awilix.asFunction(eventManager))
container.register("eventRouter", awilix.asFunction(eventRouter))

// Retrieve the router, which resolves all other dependencies.
const theAccountRouter = container.resolve("accountRouter")
const theEventRouter = container.resolve("eventRouter")


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
app.use('/accounts', theAccountRouter)
app.use('/events', theEventRouter)

app.use(function(request, response, next){
	const error = new Error('Not found -'+request.originalUrl)
	response.status(404)
	next(error)
})

// Start listening for incoming HTTP requests!
app.listen(8080, function(){
	console.log('Running on 8080!')
})