const express = require('express');
const router = express.Router();


router.get('/', function (request, response) {
	model.list(function (users) {
		response.set("Content-Type", "text/html");
		response.render('user_index', {
			data: users,
			errors: []
		})
	})
});

router.get('/:username', function (request, response) {
	model.read(request.params.username, function (user) {
		if (user != undefined) {
			response.set("Content-Type", "text/html");
			response.render('/', {
				isNew: false,
				user: user,
				errors: []
			})
		} else {
			response.status(404).end();
		}
	})
});

router.post('/:username', function (request, response) {
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
		min: 0,
		max: 100
	});
	var errors = request.validationErrors();
	if (errors) {
		response.render('user_registar', {
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
			'tipo': "subscritor individual",
			'password': request.body.password,
		};
		model.create(data, function () {
			response.redirect('/');
		});


	}
});

router.get('/:username/delete', global.secure('admin'), function (request, response) {
	model.remove(request.params.username, function () {
		response.redirect('/users');
	})
});

module.exports = router;