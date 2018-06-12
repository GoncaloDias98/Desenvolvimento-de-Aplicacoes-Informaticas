const model = require('../models/user.model');
const express = require('express');
const router = express.Router();


router.get('/', function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('empresa_registar', {
		isNew: true,
		user: {},
		errors: []
	});
});

router.post('/', function(request, response) {

	request.checkBody('Nome', 'Nome should have between 5 and 10 chars').isLength({min: 5, max: 10});
	request.checkBody('password', 'Password should have between 8 and 15 chars').isLength({min: 8, max: 15});
	request.checkBody('Email', 'Email should have between 6 and 150 chars').isLength({min: 6, max: 150});
	request.checkBody('NIF', 'NIF should have 9 chars').isLength({min: 9, max: 9});
	request.checkBody('Contacto', 'Contacto should have between 0 and 150 chars').isLength({min: 0, max: 150});
	request.checkBody('Morada', 'Morada should have between 0 and 20 chars').isLength({min: 0, max: 20});
	var errors = request.validationErrors();	
	if (errors) {
		response.render('empresa_registar', {
			isNew: true,
			user: {},
			errors: errors
		});
	}else{
		var data = {
			'Nome': request.body.Nome,
			'Email': request.body.Email,
			'NIF': request.body.NIF,
			'Contacto': request.body.Contacto,
			'Morada': request.body.Morada,
			'tipo': 'empresa',
			'password': request.body.password,
			};

		model.create(data, function(){
			response.redirect('/');
		});
	

	}
});



module.exports = router;