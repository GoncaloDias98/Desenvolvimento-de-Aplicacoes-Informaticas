const express = require('express');
const router = express.Router();
const model = require('../models/register.model');
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;

router.get('/', function(request, response) {
	//If is already authenticated don't show again the login form
	if (request.isAuthenticated()) {
		response.redirect('index');
		return;
	}
	response.set("Content-Type", "text/html");
	response.render('registar', { errors: [] });
});



router.post('/', function (request, response) {

console.log("nabo");

    model.usernameExists(request.body.username, function (areValid) {
        if (areValid) {


            response.json({
                error: "Updated Successfully",
                status: 400
            });
        } else {


            model.emailExists(request.body.email, function (areValid) {
                if (areValid) {


                    response.json({
                        error: "erro na base de dados",
                        status: 450
                    });

                } else {
					
					
					var data = {
						'Nome': request.body.Nome,
						'Email': request.body.Email,
						'NIF': request.body.NIF,
						'Contacto': request.body.Contacto,
						'Morada': request.body.Morada
//						'Nacionalidade': request.body.Nacionalidade,
                        
				
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