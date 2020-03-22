const express = require('express')

module.exports = function({accountManager}) {

	const router = express.Router()

	// GET /register
	router.get("/register", function(request, response) {
		if (request.session.username) {
			response.redirect('/')
		} else {
			response.render("accounts-register.hbs")
		}
	})
	
	// POST /register
	router.post("/register", function(request, response) {
		const account = {username: request.body.username, firstname: "erik", lastname: "blabla", password: request.body.password
		}
	
		if (request.session.username) {
			response.redirect('/')
		} else {
			accountManager.createAccount(account, function(errors, id){
				response.redirect("/accounts/login")
			})
		}
	})
	
	// GET /login
	router.get("/login", function(request, response) {
		if (request.session.username) {
			response.redirect('/')
		} else {
			response.render("accounts-login.hbs")
		}
	})
	
	// POST /login
	router.post("/login", function(request, response) {
	
		const username = request.body.username
		const password = request.body.password

		if (!username && !password) {
			response.send('Please enter Username and Password!')
			response.end()
		}
	
		accountManager.getAccountByUsername(username, function(errors, account) {
			if(username == account.username && password == account.password) {
				request.session.isLoggedIn = true
				request.session.username = account.username
				response.redirect('/')
			} else {
				response.render("accounts-login.hbs")
			}
		})
	})

	// GET /logout
	router.get("/logout", function(request, response) {
		response.redirect('/accounts/login')
	})
	
	// POST /logout
	router.post("/logout", function(request, response) {
	
		if(request.session.username) {
	
			request.session.destroy(function(error) {
	
				if(error) {
					console.log(error)
				} else {
					response.redirect("/")
				}
			})
		} else {
			response.redirect("/accounts/login")
		}
	})
	
	// GET /
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