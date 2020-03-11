const db = require('./db')
const Sequelize = require('sequelize')

module.exports = function({}){
	
	const Event = db.define('event', {
		title: {
			type: Sequelize.STRING
		},
		accountUsername: {
			type: Sequelize.STRING
		},
		description: {
			type: Sequelize.STRING
		},
		date: {
			type: Sequelize.DATE
		}
	}, {
		timestamps: false
	})

	return {

		/*
		Retrieves all events ordered by title.
		Possible errors: databaseError
		Success value: The fetched events in an array.
		*/
		getAllEvents: function(callback){

			Event.findAll({raw: true}).then(function(allEvents){
				callback([], allEvents)
			}).catch(function(error){
				callback(['databaseError'], null)
			})	
		},

		getEventsByDate: function(date, callback){

			Event.findAll({
				raw: true,
				where: {date: date}, 
			}).then(function(allEvents){
				callback([], allEvents)
			}).catch(function(error){
				callback(['databaseError'], null)
			})	
		},
		/*
		Retrieves the event with the given id.
		Possible errors: databaseError
		Success value: The fetched event, or null if no event has that id.
		*/
		getEventById: function(id, callback){

			Event.findOne({
				raw: true,
				where: {id: id}, 
			}).then(function(theEvent){
				callback([], theEvent)
			}).catch(function(error){
				callback(['databaseError'], null)
			})	
		},
		/*
		Creates a new event.
		event: {title: "The Title", description: "The description", date: "The date"}
		Possible errors: databaseError, usernameTaken
		Success value: The id of the new account.
		*/
		createEvent: function(event, callback){

			Event.create({
				title: event.title,
				accountUsername: event.accountUsername,
				description: event.description,
				date: event.date
			}).then(function(createdEvent){
				callback([], createdEvent)
			}).catch(function(error){
				callback(['databaseError'], null)
			})	
		}
	}
}