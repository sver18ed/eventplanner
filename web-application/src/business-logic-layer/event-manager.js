

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
			eventRepository.getEventsByDate(date, callback)
		},

		getEventById: function(date, id, callback){
			eventRepository.getEventById(date, id, callback)
		}
	}
}