module.exports = {
	list(callback) {
		var sql = 'SELECT Temperatura, localidade from Regras_User where UserID=2';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
    },
    
};