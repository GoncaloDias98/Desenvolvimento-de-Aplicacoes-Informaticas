module.exports = {
	list(callback) {
		var sql = 'SELECT * from users';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},
	

	read(speaker, callback) {
		var sql = "SELECT * from users where type=speaker";	
		global.connection.query(sql, [speaker], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	


};
