

module.exports = function({eventRepository}){
	return {
		getAllEvents: function(callback){
			eventRepository.getAllEvents(function(errors, events){
				callback(errors, events)
			})
		},

		createEvent: function(event, callback){
	
			// Validate the event.
			// const errors = eventValidator.getErrorsNewEvent(event)
			
			// if(0 < errors.length){
			// 	callback(errors, null)
			// 	return
			// }
		
			
			eventRepository.createEvent(event, callback)			
		},

		getEventsByDate: function(date, callback){
			eventRepository.getEventById(date, callback)
		},

		getEventById: function(id, callback){
			eventRepository.getEventById(id, callback)
		}
	}
}