const express = require('express');
const model = require('../models/sms.model');
const router = express.Router();
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
	apiKey: '5144f6ab',
	apiSecret: '6US4EeIT9xW6CO2c'
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
      'UserID': user.UserID
    };
    const text = 'Acabou de subscrever o servico de notificacao por temperatura superior a: ' + data.temperaturaMax_user + ' na cidade de:' + data.localidade;
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
    const text = 'Acabou de subscrever o serviço de notificacao por temperatura inferior a: ' + data.temperaturaMin_user + ' na cidade de:' + data.localidade;
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
    var user = request.user;
    model.listSubsMax(function (users){
      model.listTempCidades(function (dados){
        model.readUsers(user.email, function(dadosUser){

        })
        for (var u = 0; u < dados.length; u++){
      const local = dados[u].temperatura;
      for (var i = 0; i < users.length; i++) {
      const to = '351' + users[i].Contacto;
      const from = 'WFDAI';
      if(users[i].temperaturaMax > local){
      const text = 'Teste 1' + users[i].temperaturaMax_user + ' ' + users[i].localidade_user;
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
}
    })
  })
}




// setInterval(notificarTempMax, 10000);


module.exports = router;