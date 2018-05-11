const express = require('express');
const router = express.Router();
const model = require('../models/kpi.model');

router.get('/', function(request, response){
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	model.listKPI(function(kpiDados){

	
	response.set("Content-Type", "text/html");
	response.render('admin', {
		kpiDados : kpiDados
	})
});
});



module.exports = router;