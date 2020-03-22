const db = require('./db')
const Sequelize = require('sequelize')

module.exports = function({}){

	const Account = db.define('account', {
		username: {
			type: Sequelize.STRING
		},
		firstname: {
			type: Sequelize.STRING
		},
		lastname: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING
		}
	}, {
		timestamps: false
	})

	return {

		getAllAccounts: function(callback){

			Account.findAll({raw: true}).then(function(allAccounts){
				callback([], allAccounts)
			}).catch(function(error){
				callback(['databaseError'], null)
			})		
		},

		getAccountByUsername: function(username, callback){

			Account.findOne({
				raw: true,
				where: {username: username}, 
			}).then(function(theAccount){
				callback([], theAccount)
			}).catch(function(error){
				callback(['databaseError'], null)
			})		
		},

		createAccount: function(account, callback){

			Account.create({
				username: account.username,
				firstname: account.firstname,
				lastname: account.lastname,
				password: account.password
			}).then(function(createdAccount){
				callback([], createdAccount)
			}).catch(function(error){
				callback(['databaseError'], null)
			})
		}
	}
}