const accountValidator = require('./account-validator')

module.exports = function({accountRepository}){
	return {
		getAllAccounts: function(callback){
			accountRepository.getAllAccounts(function(errors, accounts){
				callback(errors, accounts)
			})
		},

		createAccount: function(account, callback){
	
			// Validate the account.
			const errors = accountValidator.getErrorsNewAccount(account)
			
			if(0 < errors.length){
				callback(errors, null)
				return
			}
			accountRepository.createAccount(account, callback)		
		},
		
		getAccountByUsername: function(username, callback){
			accountRepository.getAccountByUsername(username, callback)
		}
	}
}