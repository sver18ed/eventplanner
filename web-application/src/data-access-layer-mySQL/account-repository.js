const db = require('./db')

module.exports = function({}){

	return {

		getAllAccounts: function(callback){
			
			const query = `SELECT * FROM accounts ORDER BY username`
			const values = []
			
			db.query(query, values, function(error, accounts){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], accounts)
				}
			})
		},

		getAccountByUsername: function(username, callback){
			
			const query = `SELECT * FROM accounts WHERE username = ? LIMIT 1`
			const values = [username]
			
			db.query(query, values, function(error, accounts){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], accounts[0])
				}
			})
			
		},

		createAccount: function(account, callback){
		
			const query = `INSERT INTO accounts (username, password) VALUES (?, ?)`
			const values = [account.username, account.password]
			
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