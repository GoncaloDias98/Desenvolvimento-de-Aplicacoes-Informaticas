module.exports = {
	listEmpresa(callback) {
		var sql = 'SELECT * from user_empresa';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},

	readEmpresa(username, callback) {
		var sql = "SELECT * from user_empresa where Username_Empresa=?";
		global.connection.query(sql, [username], function (error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},

	createEmpresa(data, callback) {
		var sql = "INSERT INTO user_empresa (Username_Empresa, Nome, Contacto, Morada, NIF, Email, Password) VALUES (?,?,?,?,?,?,?)";
		global.connection.query(
			sql, [data.username, data.name, data.numero, data.morada, data.nif, data.email, data.password],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},

	removeEmpresa(username, callback) {
		var sql = "DELETE from user_empresa WHERE Username_Empresa=?";
		global.connection.query(sql, [username], function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},

	areValidCredentialsEmpresa(username, password, callback) {
		var sql = "SELECT Password FROM user_empresa WHERE Username_Empresa=?";
		global.connection.query(sql, [username], function (error, rows, fields) {
			if (error) throw error;
			if (rows.length == 1 && rows[0].password === password) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},


};