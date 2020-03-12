const express = require('express')

module.exports = function({eventManager}){

	const router = express.Router()

	router.get("/", function(request, response){
		eventManager.getAllEvents(function(errors, events){
			//console.log(errors, events)
			//request.session = null
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
		if(response.locals.isLoggedIn){
			response.render("events-create-event.hbs")
		} else {
			response.redirect("accounts-sign-in.hbs")
		}
	})

	// POST /events/create
	router.post("/create", function(request, response){
		
		const title = request.body.title
		const username = request.session.key
		const description = request.body.description
		const date = request.body.date

		const event = { 
			title: title, 
			accountUsername: username,
			description: description, 
			date: date
		}
		
		// if(response.locals.isLoggedIn){
		// 	validationErrors.push("Not logged in")
		// }
		
		// TODO: you probably want to use other validation rules (min/max length on username, min/max values on age).
			
		eventManager.createEvent(event, function(errors, id){
			response.redirect("/events/"+date+"/"+id)
		})		
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
		const username = request.session.key
		const description = request.body.description
		const date = request.params.date

		const event = { 
			title: title, 
			accountUsername: username, 
			description: description, 
			date: date
		}
		
		// if(response.locals.isLoggedIn){
		// 	validationErrors.push("Not logged in")
		// }
		
		// TODO: you probably want to use other validation rules (min/max length on username, min/max values on age).
			
		eventManager.createEvent(event, function(errors, id){
			response.redirect("/events/"+date+"/"+id)
		})		
	})

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

	return router
}