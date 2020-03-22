const express = require('express')
const awilix = require('awilix')
const jwt = require('jsonwebtoken')

const app = module.exports = express()

const accountRepository = require('../data-access-layer-mySQL/account-repository')
const accountManager = require('../business-logic-layer/account-manager')

const eventRepository = require('../data-access-layer-mySQL/event-repository')
const eventManager = require('../business-logic-layer/event-manager')

const container = awilix.createContainer()

container.register("accountRepository", awilix.asFunction(accountRepository))
container.register("accountManager", awilix.asFunction(accountManager))

container.register("eventRepository", awilix.asFunction(eventRepository))
container.register("eventManager", awilix.asFunction(eventManager))

const theAccountManager = container.resolve("accountManager")
const theEventManager = container.resolve("eventManager")

app.get("/api/", function(request, response) {
	response.send("hello api")
})

app.post("/api/register", function(request, response) {

	const account = {
		username: request.body.username, 
		password: request.body.password
	}

	theAccountManager.createAccount(account, function(errors, id){
		if (errors.includes("databaseError")) {
			response.status(500).end()
		} else if(0 < errors.length) {
			response.status(400).json(errors)
		} else {
			//response.setHeader("Location", "/pets/"+id)
			response.status(201).json({
				message: "Account registered successfully!"
			})
		}
	})
})

app.get("/api/events", function(request, response) {
	theEventManager.getAllEvents(function(errors, events) {
			const model = {
				errors: errors,
				events: events
			}
		response.status(200).json({
			content: model
		})
	})
})