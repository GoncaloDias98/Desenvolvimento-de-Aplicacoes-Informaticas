const bcrypt = require('bcrypt');
module.exports = {

	list(callback) {
		var sql = 'SELECT * from User';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},

	listempresa(empresa, callback) {
		var sql = 'SELECT * from User where Empresa=? ';
		global.connection.query(sql, [empresa], function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},


	read(email, callback) {
		var sql = "SELECT * from User where Email=?";
		global.connection.query(sql, [email], function (error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},

	readEmpresas(UserID, callback) {
		var sql = "SELECT * from User where UserID=?";
		global.connection.query(sql, [UserID], function (error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},

	create(data, callback) {
		var sql = "INSERT INTO User (Nome, Password, Email, NIF, Contacto, Morada, TipoUser, Empresa, UI, Pagamento) VALUES (?,?,?,?,?,?,?,?,?,?)";
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(data.password, salt);
		global.connection.query(
			sql, [data.Nome, hash, data.Email, data.NIF, data.Contacto, data.Morada, data.tipo, data.empresa, data.UI, data.Pagamento],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
				console.log(sql);
			});
	},
	
	createfree(data, callback) {
		var sql = "INSERT INTO User (Nome, Password, Email, NIF, Contacto, Morada, TipoUser, Empresa, UI) VALUES (?,?,?,?,?,?,?,?,?)";
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(data.password, salt);
		global.connection.query(
			sql, [data.Nome, hash, data.Email, data.NIF, data.Contacto, data.Morada, data.tipo, data.empresa, data.ui],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
				console.log(sql);
			});
	},



	update(email, data, callback) {
		var sql = "UPDATE `mydb`.`User` SET `Nome`=?, `Password`=?, `NIF`=?, `Contacto`=?, `Morada`=?, `TipoUser`=?, `Empresa`=?,`UI`=?  WHERE `Email`=?";
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(data.password, salt);
		global.connection.query(
			sql, [data.Nome, hash, data.NIF, data.Contacto, data.Morada, data.tipo, data.empresa, data.UI, email],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},

	updateFuncionario(UserID, data, callback) {
		var sql = 'UPDATE User SET Nome=?, Contacto=?, UI=? WHERE UserID=?';
		global.connection.query(sql, [data.Nome, data.Contacto, data.UI, UserID], function (error, rows) {
			if (error) throw error;
			callback(rows[0]);
		});
	},

	remove(email, callback) {
		var sql = "DELETE from `mydb`.`User` WHERE Email=?";
		global.connection.query(sql, [email], function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},

	/*--------------------PREFERENCIAS----------------------*/

	listpreferencias(UserID, callback) {
		var sql = "SELECT localidade_user from Regras_User where UserID_Regras=?";
		global.connection.query(sql, [UserID], function (error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},

	createpreferencias(email, data, callback) {
		var sql = "INSERT INTO Associacao (Localidade, Email_User, tipoAssociacao) VALUES (?,?,?)";

		global.connection.query(
			sql, [data.Localidade, email, data.tipoAssociacao],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
				console.log(sql);
			});
	},

	/*--------------------FIM PREFERENCIAS-------------------*/

	areValidCredentials(email, password, callback) {
		var sql = "SELECT Password FROM User WHERE Email=?";
		global.connection.query(sql, [email], function (error, rows) {
			if (error) throw error;
			if (rows.length == 0) callback(false);
			bcrypt.compare(rows[0].Password, password, function (err, res) {
				callback(true); // res === true
			});
		});
	}

};

/* return bcrypt.compareSync(password, this.password)
	//New
areValidCredentials(email, password, callback) {
		var sql = "SELECT Password FROM User WHERE Email=?";
		global.connection.query(sql, [email], function(error, rows){
			if (error) throw error;
			console.log(password + rows[0].Password);
			if (bcrypt.compareSync( password, rows[0].Password, function(err, res) {
				return true;
			console.log("true");})){callback(true);
			
			}else{
				callback(false); // res === true
				console.log("false");
				
			

}
		
	})
}

}

	areValidCredentials(username, password, callback) {
		var sql = "SELECT password, hashedpassword FROM users WHERE username=?";
		global.connection.query(sql, [username], function(error, rows, fields){
			if (error) throw error;
			if (rows.length == 1 && bcrypt.compareSync( password, rows[0].hashedpassword)) {
				callback(true);
			}else{
				callback(false);
			}
		});
	}
*/