const express = require('express');
const router = express.Router();
const usersModel = require('../models/user.model');

router.get('/', function(request, response) {
	//If is already authenticated don't show again the login form
	if (request.isAuthenticated()) {
		response.redirect('/');
		return;
	}
	response.set("Content-Type", "text/html");
	response.render('login', { errors: [] });
});

router.post('/', function(request, response) {
	request.checkBody('username', 'Username should have between 5 and 10 chars').isLength({min: 5, max: 10});
	request.checkBody('password', 'Password should have between 8 and 15 chars').isLength({min: 8, max: 15});
	var errors = request.validationErrors();
	
	if (errors) {
		response.render('login', { errors: errors });
		return;
	}

	usersModel.areValidCredentials(request.body.username, request.body.password, function(areValid) {
		if (areValid) {
			//Create the login session
			request.login(request.body.username, function(err) {
				response.redirect('/');
			});		
		}else{
			response.render('login', { errors: [
				{ msg: 'Invalid credentials provided' }
			]});
		}
	});
});

module.exports = router;