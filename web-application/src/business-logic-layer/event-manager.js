

module.exports = function({eventRepository}) {
	return {
		getAllEvents: function(callback) {
			eventRepository.getAllEvents(function(errors, events) {
				callback(errors, events)
			})
		},

		createEvent: function(event, callback) {
			eventRepository.createEvent(event, callback)			
		},

		getEventsByDate: function(date, callback) {
			eventRepository.getEventsByDate(date, callback)
		},

		getEventById: function(date, id, callback) {
			eventRepository.getEventById(date, id, callback)
		},

		updateEventById: function(event, callback) {
			eventRepository.updateEventById(event, callback)
		},

		deleteEventById: function(id, callback) {
			eventRepository.deleteEventById(id, callback)
		},

		addAttendantToEvent: function(id, username, callback) {
			eventRepository.addAttendantToEvent(id, username, callback)
		},

		getAllAttendants: function(id, callback) {
			eventRepository.getAllAttendants(id, function(errors, attendants) {
				callback(errors, attendants)
			})
		}
	}
}