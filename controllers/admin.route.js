const express = require('express');
const router = express.Router();
const model = require('../models/kpi.model');

router.get('/', function(request, response){
	if(request.isAuthenticated() ){
		model.listKPI(function(kpiDados){
			response.set("Content-Type", "text/html");
			response.render('admin', {
				kpiDados : kpiDados
			})
		});
	}else{
		response.redirect('/');
	}
});

module.exports = router;