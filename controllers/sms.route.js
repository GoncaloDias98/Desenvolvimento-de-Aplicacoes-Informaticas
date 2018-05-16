const express = require('express');
const router = express.Router();
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: 'API_KEY',
  apiSecret: 'API_SECRET'
});

const from = 'WFDAI';
const to = '351912493365';
const text = 'Temperatura superior ' + Temperatura + 'em' + Localidade ;

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