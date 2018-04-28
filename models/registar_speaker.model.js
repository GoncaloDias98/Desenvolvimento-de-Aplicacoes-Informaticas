module.exports = {
	list(callback) {
		var sql = "select idUser, name, email, telefone, nif, salario from users where type = 'Speaker'";
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	read(idUser, callback) {
		var sql = "SELECT * FROM users WHERE idUser = ?";
		global.connection.query(sql, [idUser], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	

	create(data, callback) {
		var sql = "INSERT INTO users (name, email, nif, telefone, salario, photo, type ) VALUES (?,?,?,?,?,?, 'Speaker')";
		global.connection.query(
			sql, [data.name, data.email, data.nif, data.telefone, data.salario, data.photo, data.type], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	update(idUser, data, callback) {
		var sql = "UPDATE users SET name=?, email=?, telefone=?, nif=?, salario=?, photo=? WHERE idUser=?";
		global.connection.query(
			sql, [data.name, data.email, data.telefone, data.nif, data.salario, data.photo, idUser], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	/*remove(name, callback) {
		var sql = "DELETE from users WHERE name=?";
		global.connection.query(sql, [name], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	}*/
};
