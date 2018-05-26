module.exports = {
	list(callback) {
		var sql = 'SELECT Temperatura, localidade from Regras_User WHERE UserID=2';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},
	
	envioNotificacao(callback){
		var sql1 = 'SELECT * from User Where UserID = 22';
		var sql2 = 'SELECT * from Regras_User Where UserID = 2';
		global.connection.query(sql1, function(error, users, fields){
			if(error) throw error;
		});
		global.connection.query(sql2, function(error, dados, fields){
			if(error) throw error;
		})
	}
    
};