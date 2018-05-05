var bcrypt =  require('bcrypt-nodejs')

module.exports = {
	list(callback) {
		var sql = 'SELECT * from User';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},


read(email, callback) {
		var sql = "SELECT * from User where Email=?";
		global.connection.query(sql, [email], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},

create(hash, data, callback) {
	var sql = "INSERT INTO User (Nome, Password, Email, NIF, Contacto, Morada, TipoUser, Empresa, UI) VALUES (?,?,?,?,?,?,?,?,?)";
	global.connection.query(
		sql, [data.Nome, hash, data.Email, data.NIF, data.Contacto, data.Morada, data.tipo, data.empresa, data.ui], function(error, rows, fields) {
		if (error) throw error;
		callback(rows[0]);
	});
},



update(email, data, callback) {
		var sql = "UPDATE `mydb`.`User` SET `Nome`=?, `Password`=?, `NIF`=?, `Contacto`=?, `Morada`=?, `TipoUser`=?, `Empresa`=?, `UI`=? WHERE `Email`=?";

		var hash = bcrypt.hashSync(data.password);
		global.connection.query(
			sql, [data.name, hash,  data.nif, data.telemovel, data.morada, data.tipo, data.empresa, data.ui, email], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},

remove(email, callback) {
		var sql = "DELETE from `mydb`.`User` WHERE Email=?";
		global.connection.query(sql, [email], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	//New
areValidCredentials(email, password, hash, callback) {
		var sql = "SELECT Password FROM User WHERE Email=?";
		global.connection.query(sql, [email], function(error, rows){
			if (error) throw error;
			if (rows.length == 0 ) callback(false);
			global.bcrypt.compare(rows[0].password, hash, function(err, res) {
				callback(true); // res === true
});
		});
	}
};
