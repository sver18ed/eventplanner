const db = require('./db')
const Sequelize = require('sequelize')

module.exports = function({}){
	
	const Event = db.define('event', {
		title: {
			type: Sequelize.STRING
		},
		host: {
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

		createEvent: function(event, callback){

			Event.create({
				title: event.title,
				host: event.host,
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