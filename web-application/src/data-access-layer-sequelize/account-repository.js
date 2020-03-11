const db = require('./db')
const Sequelize = require('sequelize')

module.exports = function({}){

	const Account = db.define('account', {
		username: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING
		}
	}, {
		timestamps: false
	})

	return {

		/*
		Retrieves all accounts ordered by username.
		Possible errors: databaseError
		Success value: The fetched accounts in an array.
		*/
		getAllAccounts: function(callback){

			Account.findAll({raw: true}).then(function(allAccounts){
				callback([], allAccounts)
			}).catch(function(error){
				callback(['databaseError'], null)
			})		
		},

		/*
		Retrieves the account with the given username.
		Possible errors: databaseError
		Success value: The fetched account, or null if no account has that username.
		*/
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

		/*
		Creates a new account.
		account: {username: "The username", password: "The password"}
		Possible errors: databaseError, usernameTaken
		Success value: The id of the new account.
		*/
		createAccount: function(account, callback){

			Account.create({
				username: account.username,
				password: account.password
			}).then(function(createdAccount){
				callback([], createdAccount)
			}).catch(function(error){
				callback(['databaseError'], null)
			})
		}
	}
}