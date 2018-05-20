const express = require('express');
const model = require('../models/sms.model');
const router = express.Router();
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
	apiKey: '57bc054e',
	apiSecret: 'dmluGy8VJAra7hie'
}, {
	debug: true
});
const mysql = require('mysql');



router.get('/', function(request, response){
    response.set('Content-Type', 'text/html');
    response.render('index', {
    })
});



router.post('/sendSMS', function(request, response) {
  var sql = 'SELECT * from Regras_User WHERE UserID=2';
		global.connection.query(sql, function(error, dados, fields){
			if (error) throw error;
      for (var i of dados){
        const from = 'WFDAI';
        const to = '351912493365';
        const text = 'Temperatura superior a ' + i.Temperatura_user + 'graus em ' + i.localidade;
        if(i.Temperatura_user > i.Temperatura){   
        nexmo.message.sendSms(from, to, text, (error, response) => {
          if(error) {
            throw error;
          } else if(response.messages[0].status != '0') {
            console.error(response);
            throw 'Nexmo returned back a non-zero status';
          } else {
            console.log(response);
          }
          response.re('/', {
          })
        });
        
      }else{
        const from = 'WFDAI';
        const to = '351912493365';
        const text = 'Temperatura nao vai superar o valor dado pelo utilizador';
        nexmo.message.sendSms(from, to, text, (error, response) => {
          if(error) {
            throw error;
          } else if(response.messages[0].status != '0') {
            console.error(response);
            throw 'Nexmo returned back a non-zero status';
          } else {
            console.log(response);
          }
          
          response.redirect('/', {
          })
        });
        
      }
      }
      
    });
   
});


module.exports = router;