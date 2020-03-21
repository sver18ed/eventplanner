const express = require('express')

module.exports = function({eventManager}){

	const router = express.Router()

	router.get("/", function(request, response){
		eventManager.getAllEvents(function(errors, events){
			const model = {
				errors: errors,
				events: events
			}
			response.render("events-list-all.hbs", model)
		})
	})

	router.get("/calendar", function(request, response){
		eventManager.getAllEvents(function(errors, events){
			const model = {
				errors: errors,
				events: events
			}
			response.render("calendar.hbs", model)
		})
	})

	// GET /events/create
	router.get("/create", function(request, response){
		if(request.session.username){
			response.render("events-create-event.hbs")
		} else {
			response.redirect("/accounts/login")
		}
	})

	// POST /events/create
	router.post("/create", function(request, response){
		
		const title = request.body.title
		const username = request.session.username
		const description = request.body.description
		const date = request.body.date

		const event = { 
			title: title, 
			accountUsername: username,
			description: description, 
			date: date
		}

		if (request.session.username) {
			eventManager.createEvent(event, function(errors, id){
				response.redirect("/events/"+date+"/"+id)
			})	
		} else {
			response.send("You need to login to create event...")
		}
	})

	router.get('/:date', function(request, response){
		
		const date = request.params.date

		eventManager.getEventsByDate(date, function(errors, events){
			const model = {
				errors: errors,
				events: events,
				date: date
			}
			response.render("events-list-all-on-date.hbs", model)
		})	
	})

	// GET /events/:date/create
	router.get("/:date/create", function(request, response){
		response.render("events-create-event-on-date.hbs")
	})

	router.post('/:date/create', function(request, response){
		
		const title = request.body.title
		const username = request.session.username
		const description = request.body.description
		const date = request.params.date

		const event = { 
			title: title, 
			accountUsername: username, 
			description: description, 
			date: date
		}

		if (request.session.username) {
			eventManager.createEvent(event, function(errors, id){
				response.redirect("/events/"+date+"/"+id)
			})	
		} else {
			response.send("You need to login to create event...")
		}
	})

	// GET /events/:date/:id
	router.get('/:date/:id', function(request, response){
		
		const date = request.params.date
		const id = request.params.id
		
		eventManager.getEventById(date, id, function(errors, event){
			const model = {
				errors: errors,
				event: event
			}
			response.render("events-show-one.hbs", model)
		})
		
	})

	// UPDATE /events/update/:date/:id
	router.post('/update/:date/:id', function(request, response){
		
		const date = request.params.date
		const id = request.params.id

		eventManager.getEventById(date, id, function(errors, event){

			if (request.session.username == event.accountUsername) {
				eventManager.updateEventById(event, function(errors, event){
					const model = {
						errors: errors,
						event: event
					}
					response.render("events-show-one.hbs", model)
				})
			} else {
				response.send("You are not allowed to update this event!")
			}
		})
	})

	// DELETE /events/delete/:date/:id
	router.post('/delete/:date/:id', function(request, response){

		const date = request.params.date
		const id = request.params.id

		eventManager.getEventById(date, id, function(errors, event){

			if (request.session.username == event.accountUsername) {
				eventManager.deleteEventById(id, function(errors, event){
					response.redirect("/events/"+date+"/")
				})
			} else {
				response.send("You are not allowed to delete this event!")
			}
		})
	})

	return router
}