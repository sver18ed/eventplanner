const eventRepository = require('../data-access-layer/event-repository')

exports.getAllEvents = function(callback){
	eventRepository.getAllEvents(callback)
}

exports.createEvent = function(event, callback){
	
	// Validate the event.
	// const errors = eventValidator.getErrorsNewEvent(event)
	
	// if(0 < errors.length){
	// 	callback(errors, null)
	// 	return
	// }
	
	eventRepository.createEvent(event, callback)
	
}

exports.getEventById = function(id, callback){
	eventRepository.getEventById(id, callback)
}