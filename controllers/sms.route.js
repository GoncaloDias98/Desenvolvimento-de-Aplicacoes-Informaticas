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


router.get('/', function(request, response){
  model.list(function(dados){
    response.set('Content-Type', 'text/html');
    response.render('index', {
      dados: dados
    })
  })
});



const from = 'WFDAI';
const to = '351912493365';



  




router.post('/sendSMS', function(request, response) {
  nexmo.message.sendSms(from, to, text, (error, response) => {
    if(error) {
      throw error;
    } else if(response.messages[0].status != '0') {
      console.error(response);
      throw 'Nexmo returned back a non-zero status';
    } else {
      console.log(response);
    }
  });
});


module.exports = router;