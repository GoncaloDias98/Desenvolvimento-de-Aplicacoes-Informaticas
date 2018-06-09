module.exports = {
	list(callback) {
		var sql = 'SELECT Temperatura, localidade from Regras_User WHERE UserID=2';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},


	readUsers(email, callback) {
		var sql = "SELECT * from User where Email=?";
		global.connection.query(sql, [email], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},
    
};