const express = require('express');
const router = express.Router();
const userModel = require('../models/register.model');

const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;

router.get('/', function(request, response) {
	//If is already authenticated don't show again the login form
	if (request.isAuthenticated()) {
		response.redirect('index');
		return;
	}
	response.set("Content-Type", "text/html");
	response.render('register', { errors: [] });
});



router.post('/', function (request, response) {



    userModel.usernameExists(request.body.username, function (areValid) {
        if (areValid) {


            response.json({
                error: "Updated Successfully",
                status: 400
            });
        } else {


            userModel.emailExists(request.body.email, function (areValid) {
                if (areValid) {


                    response.json({
                        error: "erro na base de dados",
                        status: 450
                    });

                } else {
                   
                    var data = {
                        'username': request.body.username,
                        'nome': request.body.nome,
                        'contacto': request.body.contacto,
                        'numero': request.body.numero,
                        'morada': request.body.morada
                        
				
                    };
					
					global.bcrypt.hash(request.body.password, saltRounds).then(function (hash) {
					console.log("with hash:" + hash);
					userModel.create(hash, data, function(){
					response.redirect('/');
		});
					
						request.login(request.body.username, function (err) {
							
							response.json({
								success: "Updated Successfully",
								status: 200
                            });
                            

						});


					

                });
            }
        })
    };
})});
module.exports = router;