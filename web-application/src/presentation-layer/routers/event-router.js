const express = require('express')
const eventManager = require('../../business-logic-layer/event-manager')

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

	const event = {title: request.body.title, accountUsername: username, description: request.body.description, dateTime: request.body.dateTime}
	
	// if(response.locals.isLoggedIn){
	// 	validationErrors.push("Not logged in")
	// }
	
	// TODO: you probably want to use other validation rules (min/max length on username, min/max values on age).
		
    eventManager.createEvent(event, function(errors, id){
        response.redirect("/events/"+id)
    })		
})

router.get('/:id', function(request, response){
	
	const id = request.params.id
	
	eventManager.getEventById(id, function(errors, event){
		const model = {
			errors: errors,
			event: event
		}
		response.render("events-show-one.hbs", model)
	})
	
})

module.exports = router