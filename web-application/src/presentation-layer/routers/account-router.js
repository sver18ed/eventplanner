const express = require('express')

module.exports = function({accountManager}) {

	const router = express.Router()

	// GET /sign-up
	router.get("/sign-up", function(request, response) {
		if (request.session.key) {
			response.redirect('/')
		} else {
			response.render("accounts-sign-up.hbs")
		}
	})
	
	// POST /sign-up
	router.post("/sign-up", function(request, response) {
		const account = {username: request.body.username, password: request.body.password}
	
		if (request.session.key) {
			response.redirect('/')
		} else {
			accountManager.createAccount(account, function(errors, id){
				response.redirect("/accounts/sign-in")
			})
		}
	})
	
	// GET /sign-in
	router.get("/sign-in", function(request, response) {
		if (request.session.key) {
			response.redirect('/')
		} else {
			response.render("accounts-sign-in.hbs")
		}
	})
	
	// POST /sign-in
	router.post("/sign-in", function(request, response) {
	
		const username = request.body.username
		const password = request.body.password
	
		accountManager.getAccountByUsername(username, function(errors, account) {
			if(username == account.username && password == account.password) {
				request.session.isLoggedIn = true
				request.session.key = account.username
				// request.session.cookie.expires = 1000 * 1000
				response.redirect('/')
			} else {
				response.render("accounts-sign-in.hbs")
			}
		})
	})
	
	router.get("/sign-out", function(request, response) {
	
		if(request.session.key) {
	
			request.session.destroy(function(error) {
	
				if(error) {
					console.log(error)
				} else {
					response.redirect("/")
				}
			})
		} else {
			response.redirect("/accounts/sign-in")
		}
	})
	
	router.get("/", function(request, response) {
	
		accountManager.getAllAccounts(function(errors, accounts) {
	
			console.log(errors, accounts)
			const model = {
				errors: errors,
				accounts: accounts
			}
			response.render("accounts-list-all.hbs", model)
		})
	})
	
	router.get('/:username', function(request, response) {
		
		const username = request.params.username
		
		accountManager.getAccountByUsername(username, function(errors, account) {
			const model = {
				errors: errors,
				account: account
			}
			response.render("accounts-show-one.hbs", model)
		})
		
	})

	return router
}