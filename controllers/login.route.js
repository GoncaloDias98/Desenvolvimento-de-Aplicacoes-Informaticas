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
	response.render('index', { errors: [] });
});

router.post('/', function(request, response) {
	request.checkBody('email', 'Username should have between 5 and 10 chars').isLength({min: 5, max: 10});
	request.checkBody('password', 'Password should have between 8 and 15 chars').isLength({min: 8, max: 15});
	var errors = request.validationErrors();
	
	if (errors) {
		response.render('index', { errors: errors });
		return;
	}

	usersModel.areValidCredentials(request.body.email, request.body.password, function(areValid) {
		if (areValid) {
			//Create the login session
			request.login(request.body.email, function(err) {
				response.redirect('index');
			});		
		}else{
			response.render('index', { errors: [
				{ msg: 'Invalid credentials provided' }
			]});
		}
	});
});

module.exports = router;