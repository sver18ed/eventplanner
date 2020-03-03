const express = require('express')

module.exports = function({accountManager}){

	const router = express.Router()

	router.get("/sign-up", function(request, response){
		response.render("accounts-sign-up.hbs")
	})
	
	// POST /sign-up
	router.post("/sign-up", function(request, response){
	
		const account = {username: request.body.username, password: request.body.password}
	
		accountManager.createAccount(account, function(errors, id){
			response.redirect("/")
		})
	})
	
	router.get("/sign-in", function(request, response){
		response.render("accounts-sign-in.hbs")
	})
	
	// POST /sign-in
	router.post("/sign-in", function(request, response){
	
		const username = request.body.username
	
		accountManager.getAccountByUsername(username, function(errors, account){
			if(request.body.username == account.username && request.body.password == account.password){
				request.session.isLoggedIn = true
				request.session.key = account.username
				request.session.cookie.expires = 60000
				response.redirect("/")
			}else{
				response.render("accounts-sign-in.hbs")
			}
		})
	})
	
	router.get("/sign-out", function(request, response){
	
		if(request.session.isLoggedIn){
	
			request.session.destroy(function(error){
	
				if(error){
					console.log(error)
				}else{
					response.redirect("/")
				}
			})
		}
	})
	
	router.get("/", function(request, response){
	
		accountManager.getAllAccounts(function(errors, accounts){
	
			console.log(errors, accounts)
			const model = {
				errors: errors,
				accounts: accounts
			}
			response.render("accounts-list-all.hbs", model)
		})
	})
	
	router.get('/:username', function(request, response){
		
		const username = request.params.username
		
		accountManager.getAccountByUsername(username, function(errors, account){
			const model = {
				errors: errors,
				account: account
			}
			response.render("accounts-show-one.hbs", model)
		})
		
	})

	return router
}