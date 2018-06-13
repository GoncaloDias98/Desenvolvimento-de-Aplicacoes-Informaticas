module.exports = {

	usernameExists(username, callback) {

		var sql = "SELECT * FROM user WHERE username=?";
		global.connection.query(sql, [username], function (error, rows, fields) {
			if (error) throw error;
			if (rows.length == 1 && rows[0].username === username) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},

	emailExists(email, callback) {

		var sql = "SELECT * FROM user WHERE email=?";
		global.connection.query(sql, [email], function (error, rows, fields) {
			if (error) throw error;
			if (rows.length == 1 && rows[0].email === email) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},

	create(hash, data, callback) {
		var sql = "INSERT INTO User(Username, Nome, Contacto, Morada, NIF, Email, Password) VALUES (?,?,?,?,?,?,?)";
		global.connection.query(
			sql, [data.username, data.nome, data.contacto, data.morada, data.NIF, data.email, hash],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},



	//------------------------------------------------EMPRESA--------------------------------------------------	

	createEmpresa(data, callback) {
		var sql = "INSERT INTO user_empresa(Username_Empresa, Nome, Contacto, Morada, NIF, Email, Password) VALUES (?,?,?,?,?,?,?)";
		global.connection.query(
			sql, [data.username, data.name, data.numero, data.morada, data.nif, data.email, data.password],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},

	emailExistsEmpresa(email, callback) {

		var sql = "SELECT * FROM user_empresa WHERE email=?";
		global.connection.query(sql, [email], function (error, rows, fields) {
			if (error) throw error;
			if (rows.length == 1 && rows[0].email === email) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},

	usernameExistsEmpresa(username, callback) {

		var sql = "SELECT * FROM user_empresa WHERE username=?";
		global.connection.query(sql, [username], function (error, rows, fields) {
			if (error) throw error;
			if (rows.length == 1 && rows[0].username === username) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},

};