const express = require('express');
const model = require('../models/sms.model');
const router = express.Router();
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
	apiKey: '4d34f4fd',
	apiSecret: 'sQXi83kXCIH8mcGW'
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

  function notificarTempMax(){
    model.listSubsMax(function (users){
      for (var i = 0; i < users.length; i++) {
      const to = '351' + users[i].Contacto;
      const from = 'WFDAI';
      if(users[i].temperaturaMax > 24){
      const text = 'Teste 1 ' + users[i].temperaturaMax_user;
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
      }else{
        const text = 'Teste 2 ' + users[i].temperaturaMax_user;
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
    }
  }
    })
  }

  //setInterval(notificarTempMax, 10000);


module.exports = router;