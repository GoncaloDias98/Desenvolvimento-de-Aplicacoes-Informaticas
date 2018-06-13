const express = require('express');
const router = express.Router();
const model = require('../models/user.model');

router.get('/', global.secure(), function (request, response) {
	if (request.isAuthenticated()) {
		response.set("Content-Type", "text/html");
		response.render('profile', {})
	} else {
		response.redirect('/');
	}
});

router.post('/', global.secure(), function (request, response) {
	request.checkBody('Nome', 'O Nome deve ter entre 3 e 20 caracteres').isLength({
		min: 3,
		max: 20
	});
	request.checkBody('password', 'A Password deve ter entre 8 e 20 caracteres').isLength({
		min: 8,
		max: 20
	});
	request.checkBody('Email', 'Email inválido').isLength({
		min: 5,
		max: 150
	});
	var data = {
		'name': request.body.name,
		'email': request.body.email,
		'password': request.body.password
	};
	var errors = request.validationErrors();
	if (errors) {
		data.username = request.user.username;
		response.render('profile', {
			user: data,
			errors: errors
		})
	} else {
		model.update(request.user.username, data, function () {
			response.redirect('/profile');
		});
	}
});

module.exports = router;