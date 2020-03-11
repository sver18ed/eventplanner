const express = require('express')

module.exports = function({eventManager}){

	const router = express.Router()

	router.get("/", function(request, response){
		eventManager.getAllEvents(function(errors, events){
			//console.log(errors, events)
			request.session = null
			const model = {
				errors: errors,
				events: events
			}
			response.render("events-list-all.hbs", model)
		})
	})

	// GET /events/create
	router.get("/create", function(request, response){
		response.render("events-create-event.hbs")
	})

	// POST /events/create
	router.post("/create", function(request, response){
		
		const username = request.session.key

		const event = {title: request.body.title, accountUsername: username, description: request.body.description, date: request.body.date}
		
		// if(response.locals.isLoggedIn){
		// 	validationErrors.push("Not logged in")
		// }
		
		// TODO: you probably want to use other validation rules (min/max length on username, min/max values on age).
			
		eventManager.createEvent(event, function(errors, id){
			response.redirect("/events/"+id)
		})		
	})

	router.get('/:date', function(request, response){
		
		const date = request.params.date
		console.log(date)
		eventManager.getEventsByDate(date, function(errors, events){
			const model = {
				errors: errors,
				events: events
			}
			response.render("events-list-all.hbs", model)
		})
		
	})

	router.get('/:date/:id', function(request, response){
		
		const id = request.params.id
		
		eventManager.getEventById(id, function(errors, event){
			const model = {
				errors: errors,
				event: event
			}
			response.render("events-show-one.hbs", model)
		})
		
	})

	return router
}