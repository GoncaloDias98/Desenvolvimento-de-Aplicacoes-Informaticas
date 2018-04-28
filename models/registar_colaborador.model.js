module.exports = {
	list(callback) {
		var sql = 'SELECT * from users';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	read(idUser, callback) {
		var sql = "SELECT * from users where idUser=? ";
		global.connection.query(sql, [idUser], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	

	create(data, callback) {
		var sql = "INSERT INTO users ( name, email, morada, telefone, type, nif, salario, photo) VALUES (?,?,?,?,?,?,?,?)";
		global.connection.query(
			sql, [data.name, data.email, data.morada, data.telefone, data.type, data.nif, data.salario, data.photo ], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	update(idUser, data, callback) {
		var sql = "UPDATE users SET name=?, email=?, morada=?, telefone=?, type=?, nif=?, photo=?, salario=? WHERE idUser=?";
		global.connection.query(
			sql, [data.name, data.email, data.morada, data.telefone, data.type, data.nif, data.photo, data.salario, idUser], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	remove(idUser, callback) {
		var sql = "DELETE from users WHERE idUser=?";
		global.connection.query(sql, [idUser], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

};
