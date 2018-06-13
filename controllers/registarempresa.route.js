const model = require('../models/user.model');
const express = require('express');
const router = express.Router();


router.get('/', function (request, response) {
	response.set("Content-Type", "text/html");
	response.render('empresa_registar', {
		isNew: true,
		user: {},
		errors: []
	});
});

router.post('/', function (request, response) {

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
	request.checkBody('NIF', 'O NIF pode apenas ter 9 caracteres').isLength({
		min: 9,
		max: 9
	});
	request.checkBody('Contacto', 'O Contacto deve ter apenas 9 numeros').isLength({
		min: 9,
		max: 9
	});
	request.checkBody('Morada', 'A Morada deve ter entre 3 e 100 caracteres').isLength({
		min: 3,
		max: 100
	});
	request.checkBody('empresa', 'Empresa should have between 2 and 20 chars').isLength({
		min: 2,
		max: 20
	});
	var errors = request.validationErrors();
	if (errors) {
		response.render('empresa_registar', {
			isNew: true,
			user: {},
			errors: errors
		});
	} else {
		var data = {
			'Nome': request.body.Nome,
			'Email': request.body.Email,
			'NIF': request.body.NIF,
			'Contacto': request.body.Contacto,
			'Morada': request.body.Morada,
			'tipo': 'empresa',
			'password': request.body.password,
			'empresa': request.body.empresa,
		};

		model.create(data, function () {
			response.redirect('/');
		});


	}
});



module.exports = router;