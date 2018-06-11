const express = require('express');
const model = require('../models/sms.model');
const router = express.Router();
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
	apiKey: '04f7c2df',
	apiSecret: 'dYMDLLInSB6jt3Lm'
}, {
	debug: true
});


router.get('/', function(request, response){
  var user = request.user;
  if (request.isAuthenticated()) {
    console.log('ui');
      model.readUsers(user.Email, function(users){
        console.log('leu');
        response.set("Content-Type", "text/html");
				response.render('index', {
          users : users
      })
    })
  }else{
    response.set("Content-Type", "text/html");
		response.render('index', {
  })
}
});

router.post('/sendSMS', function(response){
  model.listSubs(function(users){ 
    const to = '351' + JSON.stringify(users.Contacto);
    const from = 'WFDAI';
    const text = 'Teste 1';
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
  
})
});

router.post('/subscreverTempMax', function(request, response){
  var user = request.user;
  model.readUsers(user.Email, function(){
    const to = '351' + user.Contacto;
    const from = 'WFDAI';
    var data = {
      'temperaturaMax_user': request.body.temperaturaMax,
      'localidade': request.body.localidade,
      'UserID': user.UserID,
    };
    const text = 'Obrigado por subscrever os nossos serviços.' + data.temperaturaMax_user;
    model.subscribeTempMax(data, function(){
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
    })
  })
  response.redirect('/');
  });

  router.post('/subscreverTempMin', function(request, response){
    var user = request.user;
  model.readUsers(user.Email, function(){
    const to = '351' + user.Contacto;
    const from = 'WFDAI';
    var data = {
      'temperaturaMin_user': request.body.temperaturaMin,
      'localidade': request.body.localidade,
      'UserID': user.UserID,
    };
    const text = 'Obrigado por subscrever os nossos serviços. \n Acabou de subscrever o serviço de notificacao por temperatura minima no valor de: ' + data.temperaturaMin_user + ' na cidade de:' + data.localidade;
    model.subscribeTempMax(data, function(){
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
    })
  })
  response.redirect('/');
  });

module.exports = router;