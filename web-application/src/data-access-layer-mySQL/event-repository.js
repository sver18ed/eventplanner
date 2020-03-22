const db = require('./db')

module.exports = function({}){
	
	return {

		getAllEvents: function(callback){
		
			const query = `SELECT * FROM events ORDER BY title`
			const values = []
		
			db.query(query, values, function(error, events){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], events)
				}
			})	
		},

		getEventsByDate: function(date, callback){
		
			console.log(date)
			const query = `SELECT * FROM events WHERE date = ?`
			const values = [date]
			
			db.query(query, values, function(error, events){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], events)
				}
			})
		},

		getEventById: function(date, id, callback) {
		
			const query = ` SELECT id, title, host, description, date FROM events WHERE date = ? AND id = ? LIMIT 1`
			const values = [date, id]
			
			db.query(query, values, function(error, events) {
				if(error) {
					callback(['databaseError'], null)
				} else {
					callback([], events[0])
				}
			})
		},

		createEvent: function(event, callback) {
		
			const query = `INSERT INTO events (title, host, description, date) VALUES (?, ?, ?, ?)`
			const values = [event.title, event.host, event.description, event.date]
			
			db.query(query, values, function(error, results) {
				if(error) {
					callback(['databaseError'], null)
				} else {
					callback([], results.insertId)
				}
			})		
		},

		updateEventById: function(event, callback) {

			const query = `UPDATE events SET title = ?, description = ?, date = ? WHERE id = ?`
			const values = [event.title, event.description, event.date, event.id]
		
			db.query(query, values, function(error) {
				if(error) {
					callback(['databaseError'], null)
				} else {
					callback(error)
				}
			})
		},

		deleteEventById: function(id, callback) {

			const query = `DELETE FROM events WHERE id = ?`
			const values = [id]
		
			db.query(query, values, function(error) {
				if(error) {
					callback(['databaseError'], null)
				} else {
					callback(error)
				}
			})
		},

		addAttendantToEvent: function(id, username, callback) {

			const query = `INSERT INTO attendants (eventId, attendant) VALUES (?, ?)`
			const values = [id, username]

			db.query(query, values, function(error) {
				if(error) {
					callback(['databaseError'], null)
				} else {
					callback(error)
				}
			})
		},

		getAllAttendants: function(id, callback) {

			const query = `SELECT * FROM attendants WHERE eventId = ?`
			const values = [id]

			db.query(query, values, function(error, attendants) {
				if(error) {
					callback(['databaseError'], null)
				} else {
					callback([], attendants)
				}
			})
		}
	}
}