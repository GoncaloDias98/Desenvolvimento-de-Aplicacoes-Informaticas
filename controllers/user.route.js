const model = require('../models/user.model');
const express = require('express');
const router = express.Router();
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
	apiKey: '5144f6ab',
	apiSecret: '6US4EeIT9xW6CO2c'
}, {
	debug: true
});




router.get('/', function(request, response) {
	var user = request.user;
	if(request.isAuthenticated()){
		model.list(function(users){
			response.set('Content-Type', 'text/html');
			if(user.Pagamento === 'Pago'){
				response.render('user_index', {
					users : users
				})
			}else{
				response.render('sub_index',{
					users : users
				})
			}
		})
	}else{
		response.redirect('/');
	}
	})


router.get('/listar',  function(request, response) {
	model.list(function(users) {
		response.set("Content-Type", "text/html");
		response.render('users_list', {
			users: users
		});
	});	
});

router.get('/empresa', function(request,response){
	var user = request.user;
	if(request.isAuthenticated()){
		model.listempresa(user.Empresa, function(users){
			response.set("Content-Type", "text/html");
			response.render('empresa_index', {
	  		users : users
  			})
		})
	}
});

router.get('/empresareg', function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('empresa_registar_users', {
		isNew: true,
		user: {},
		errors: []
	});
});

router.post('/empresareg', function(request, response) {
	var user = request.user;
	model.read(user.Email, function(users){
	request.checkBody('Nome', 'Nome should have between 5 and 10 chars').isLength({min: 5, max: 10});
	request.checkBody('password', 'Password should have between 8 and 15 chars').isLength({min: 8, max: 15});
	request.checkBody('Email', 'Email should have between 6 and 150 chars').isLength({min: 6, max: 150});
	request.checkBody('NIF', 'NIF should have 9 chars').isLength({min: 9, max: 9});
	request.checkBody('Contacto', 'Contacto should have between 0 and 150 chars').isLength({min: 0, max: 150});
	request.checkBody('Morada', 'Morada should have between 0 and 20 chars').isLength({min: 0, max: 20});
	var errors = request.validationErrors();	
	if (errors) {
		response.render('empresa_registar_users', {
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
			'tipo': "subscritor individual",
			'password': request.body.password,
			'empresa' : user.Empresa,
			'UI': request.body.UI,
			};
		model.create(data, function(){
			response.redirect('/users/empresa');
		});
	}	
})
});


router.get('/registar', function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('user_registar', {
		isNew: true,
		user: {},
		errors: []
	});
});
router.post('/registar', function(request, response) {

	request.checkBody('Nome', 'Nome should have between 5 and 10 chars').isLength({min: 5, max: 10});
	request.checkBody('password', 'Password should have between 8 and 15 chars').isLength({min: 8, max: 15});
	request.checkBody('Email', 'Email should have between 6 and 150 chars').isLength({min: 6, max: 150});
	request.checkBody('NIF', 'NIF should have 9 chars').isLength({min: 9, max: 9});
	request.checkBody('Contacto', 'Contacto should have between 0 and 150 chars').isLength({min: 0, max: 150});
	request.checkBody('Morada', 'Morada should have between 0 and 20 chars').isLength({min: 0, max: 20});
	var errors = request.validationErrors();	
	if (errors) {
		response.render('user_registar', {
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
			'tipo': "subscritor individual",
			'password': request.body.password,
			'UI': request.body.UI,
			'Pagamento': 'Pago',
			};
			const from = 'WFDAI ';
			const to = '351' + request.body.Contacto;
			const text = 'Efetue o pagamento no valor de 10€ para: PT50 XXXX XXXX XXXXXXXXXXX XX'
			nexmo.message.sendSms(from, to, text, (error, response) =>{
				if(error){
				  throw(error);
				}else if (response.messages[0].status != '0'){
				  console.error(response);
				  throw 'Nexmo returned back a non-zero status';
				} else{
				  console.log(response);
				}   
			}); 
		model.create(data, function(){
			response.redirect('/');
		});
	

	}
});

router.get('/:UserID',  function(request, response) {
	model.readEmpresas(request.params.UserID, function(user) {
			response.set("Content-Type", "text/html");
			response.render('empresa_edit_user', {
				isNew: false,
				user : user,
				errors: []
			})
		})
		});

router.post('/:UserID', function(request, response) {
	var data = {
		'Nome': request.body.Nome,
		'Email': request.body.Email,
		'Contacto': request.body.Contacto,
		'UI': request.body.UI,
	};
	var errors = request.validationErrors();
	if (errors) {
		data.Nome = request.user.Nome;
		response.render('empresa_edit_user', {
			user: data, errors: errors
		})
	}else{
		model.updateFuncionario(request.params.UserID, data, function(){
			response.redirect('/users/empresa');
		});
	}
});

router.get('/update_user', function(request, response) {
	model.read(request.params.Email, function(user) {
		if (user != undefined) {
			response.set("Content-Type", "text/html");
			response.render('user_index', {
				isNew: false,
				user: user,
				errors: []
			})		
		}else{
			response.status(404).end();
		}
	})	
});

router.post('/update_user', function(request, response) {	
	request.checkBody('Nome', 'Nome should have between 5 and 10 chars').isLength({min: 5, max: 10});
	request.checkBody('password', 'Password should have between 8 and 15 chars').isLength({min: 8, max: 15});
	request.checkBody('NIF', 'NIF should have 9 chars').isLength({min: 9, max: 9});
	request.checkBody('Contacto', 'Contacto should have between 0 and 150 chars').isLength({min: 0, max: 150});
	request.checkBody('Morada', 'Morada should have between 0 and 20 chars').isLength({min: 0, max: 20});
	var errors = request.validationErrors();	
	if (errors) {
		response.render('user_index', {
			isNew: true,
			user: {},
			errors: errors
		});
	}else{
		var data = {
			'Nome': request.body.Nome,
			'password': request.body.password,				
			'NIF': request.body.NIF,
			'Contacto': request.body.Contacto,
			'Morada': request.body.Morada,
			'tipo': "",
			'UI': request.body.UI,
			};
		model.update(request.body.Email, data, function(){
			response.redirect('/');
		}); 
	

	}
});

router.get('/email/delete', function(request, response){
	model.remove(request.params.email, function() {
		response.redirect('/');
	})	
});

/*Gravar Localizações Selecionadas */


router.get('/create_preferencia', function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('user_index', {
		isNew: true,
		user: {},
		errors: []
	});
});

router.post('/', function(request, response) {

	var errors = request.validationErrors();	
	if (errors) {
		response.render('user_index', {
			isNew: true,
			user: {},
			errors: errors
		});
	}else{
		var data = {
			};
		model.create(data, function(){
			response.redirect('/');
		});
	

	}
});






/* Ler Localizações Selecionadas */  

router.get('/preferencias', function(request, response) {
	model.readpreferencias(request.params.Email, function(user) {
		if (user != undefined) {
			response.set("Content-Type", "text/html");
			response.render('user_index', {
				isNew: false,
				user: user,
				errors: []
			})		
		}else{
			response.status(404).end();
		}
	})	
});

router.post('/preferencias', function(request, response) {	
	var errors = request.validationErrors();	
	if (errors) {
		response.render('user_index', {
			isNew: true,
			user: {},
			errors: errors
		});
	}else{

		model.readpreferencias(request.body.Email, function(){
			response.redirect('/');
		}); 
	

	}
});







module.exports = router;