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

	const account = {username: request.body.username, password: request.body.password}

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

app.get("/api/accounts", function(request, response){
	
	// TODO: Extracting the payload is better put in a function
	// (preferably a middleware function).
	const authorizationHeader = request.get('authorization')
	const accessToken = authorizationHeader.substr("Bearer ".length)
	
	try {
		
		// TODO: Better to use jwt.verify asynchronously.
		const payload = jwt.verify(accessToken, serverSecret)
		
		// Use payload to implement authorization...
		
	}catch(e){
		response.status(401).end()
		return
	}
	
	theAccountManager.getAllAccounts(function(errors, accounts){
		if(0 < errors.length){
			response.status(500).end()
		}else{
			response.status(200).json(accounts)
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

const correctUsername = "admin"
const correctPassword = "admin"
const serverSecret = "sdfkjdslkfjslkfd"

app.post("/api/tokens", function(request, response){
	
	const grantType = request.body.grant_type
	const username = request.body.username
	const password = request.body.password
	
	if(grantType != "password"){
		response.status(400).json({error: "unsupported_grant_type"})
		return
	}
	
	// TODO: Handle other type of errors as described at:
	// https://tools.ietf.org/html/rfc6749#section-5.2
	
	if(username == correctUsername && password == correctPassword){
		
		// TODO: Put user authorization info in the access token.
		const payload = {id: 123}
		// TODO: Better to use jwt.sign asynchronously.
		const accessToken = jwt.sign(payload, serverSecret)
		
		// TODO: Put user info in the id token.
		// Try to use the standard claims:
		// https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
		const idToken = jwt.sign(
			{sub: 123, email: "123@gmail.com"},
			"lkjlkjlkjljlk"
		)
		
		response.status(200).json({
			access_token: accessToken,
			id_token: idToken
		})
		
	}else{
		response.status(400).json({error: "invalid_grant"})
	}
	
})