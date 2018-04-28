const model = require('../models/user.model');
const express = require('express');
const router = express.Router();


router.get('/', function(request, response) {
	model.list(function(users) {
		response.set("Content-Type", "text/html");
		response.render('/', {
			data: users
		})
	})	
});

router.get('/create', function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('index', {
		isNew: true,
		user: {},
		errors: []
	})
});

router.post('/create', function(request, response) {
	request.checkBody('username', 'username should have between 5 and 10 chars').isLength({min: 5, max: 10});
	request.checkBody('nome', 'Nome should have between 0 and 150 chars').isLength({min: 5, max: 150});
	request.checkBody('password', 'Password should have between 8 and 15 chars').isLength({min: 8, max: 15});
	request.checkBody('email', 'Email should have between 0 and 150 chars').isLength({min: 6, max: 150});
	request.checkBody('NIF', 'NIF should have 9 chars').isLength({min: 9, max: 9});
	request.checkBody('contacto', 'Telefone should have between 0 and 20 chars').isLength({min: 0, max: 20});
	request.checkBody('morada', 'Morada should have between 0 and 20 chars').isLength({min: 0, max: 20});
//	request.checkBody('Nacionalidade', 'Nacionalidade should have between 0 and 150 chars').isLength({min: 0, max: 150});
	
	var errors = request.validationErrors();	
	if (errors) {
		response.render('./partials/header', {
			isNew: true,
			user: {},
			errors: errors
		});
	}else{
		const saltRounds = 10;
		var data = {
			'Username': request.body.username,
			'Nome': request.body.Nome,
			'Email': request.body.Email,
			'NIF': request.body.NIF,
			'Contacto': request.body.contacto,
			'Morada': request.body.Morada
//			'Nacionalidade': request.body.Nacionalidade,
		};
	global.bcrypt.hash(request.body.password, saltRounds).then(function (hash) {
	console.log("with hash:" + hash);
	model.create(hash, data, function(){
			response.redirect('header');
		});
	
});
	}
});	
router.get('/:username', global.secure('admin'), function(request, response) {
	model.read(request.params.username, function(user) {
		if (user != undefined) {
			response.set("Content-Type", "text/html");
			response.render('/', {
				isNew: false,
				user: user,
				errors: []
			})		
		}else{
			response.status(404).end();
		}
	})	
});

router.post('/:username', global.secure('admin'), function(request, response) {	
	request.checkBody('password', 'Password should have between 8 and 15 chars').isLength({min: 8, max: 15});
	var data = {
		'name': request.body.name,
		'email': request.body.email,
		'password': request.body.password	
	};
	var errors = request.validationErrors();	
	if (errors) {
		data.username = request.params.username;
		response.render('users-item', {
			isNew: false,
			user: data,
			errors: errors
		});
	}else{	
		model.update(request.params.username, data, function(){
			response.redirect('/users/' + request.params.username);
		});
	}
});

router.get('/:username/delete', global.secure('admin'), function(request, response){
	model.remove(request.params.username, function() {
		response.redirect('/users');
	})	
});

module.exports = router;