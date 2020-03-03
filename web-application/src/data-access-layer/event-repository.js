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
		/*
		Retrieves the event with the given id.
		Possible errors: databaseError
		Success value: The fetched event, or null if no event has that id.
		*/
		getEventById: function(id, callback){
		
			const query = `SELECT * FROM events WHERE id = ? LIMIT 1`
			const values = [id]
			
			db.query(query, values, function(error, events){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], events[0])
				}
			})
		},
		/*
		Creates a new event.
		event: {title: "The Title", description: "The description", dateTime: "The date & time"}
		Possible errors: databaseError, usernameTaken
		Success value: The id of the new account.
		*/
		createEvent: function(event, callback){
		
			const query = `INSERT INTO events (title, accountUsername, description, dateTime) VALUES (?, ?, ?, ?)`
			const values = [event.title, event.accountUsername, event.description, event.dateTime]
			
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