const awilix = require('awilix')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const redis = require('redis')
const session = require('express-session')

let redisStore = require('connect-redis')(session)
let redisClient = redis.createClient(6379, "redis")

redisClient.on('error', function(err){
	console.log('Something went wrong with redis', err)
  })

const variousRouter = require('./routers/various-router')

const accountRepository = require('../data-access-layer-mySQL/account-repository')
const accountManager = require('../business-logic-layer/account-manager')
const accountRouter = require('../presentation-layer/routers/account-router')

const eventRepository = require('../data-access-layer-mySQL/event-repository')
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

const app = module.exports = express()

app.set('views', path.join(__dirname, 'views'))

app.use(cookieParser())

// Setup sessions stored in redis
app.use(session({
	store: new redisStore({ client: redisClient }),
	secret: "saweg324sawt23t54htvbn2dfbdf3412d",
	saveUninitialized: false,
	resave: false,
	cookie: {
		maxAge: 1000 * 60 * 60,
		sameSite: true
	}
}))

const redirectLogin = (function(request, response, next){
	if (!request.session.username) {
		response.redirect('/accounts/login')
	} else {
		next()
	}
})

// Check if a user is logged in.
app.use(function(request, response, next){
	response.locals.isLoggedIn = request.session.isLoggedIn
	response.locals.username = request.session.username
	next()
})

// Setup express-handlebars.
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