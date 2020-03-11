const db = require('./db')

module.exports = function({}){
	
	return {

		/*
		Retrieves all events ordered by title.
		Possible errors: databaseError
		Success value: The fetched events in an array.
		*/
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
		/*
		Retrieves the event with the given id.
		Possible errors: databaseError
		Success value: The fetched event, or null if no event has that id.
		*/
		getEventById: function(id, callback){
		
			const query = ` SELECT id, title, accountUsername, description, date FROM events WHERE id = ? LIMIT 1`
			const values = [id]
			
			db.query(query, values, function(error, events){
				if(error){
					callback(['databaseError'], null)
				}else{
					if(events[0] != null) {
						callback([], events[0])
					}
				}
			})
		},
		/*
		Creates a new event.
		event: {title: "The Title", description: "The description", date: "The date"}
		Possible errors: databaseError, usernameTaken
		Success value: The id of the new account.
		*/
		createEvent: function(event, callback){
		
			const query = `INSERT INTO events (title, accountUsername, description, date) VALUES (?, ?, ?, ?)`
			const values = [event.title, event.accountUsername, event.description, event.date]
			
			db.query(query, values, function(error, results){
				if(error){
					// TODO: Look for usernameUnique violation.
					callback(['databaseError'], null)
				}else{
					callback([], results.insertId)
				}
			})		
		}
	}
}