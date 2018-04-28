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

create(data, callback) {
	var sql = "INSERT INTO `mydb`.`User` ( `Nome`, `Password`, `Email`, `NIF`, `Contacto`, `Morada`, `TipoUser`, `Empresa`, `UI`) VALUES (?,?,?,?,?,?,?,?,?)";
	var hash = bcrypt.hashSync(data.password);
	global.connection.query(
		sql, [data.name, hash, data.email, data.nif, data.telemovel, data.morada, data.tipo, data.empresa, data.ui], function(error, rows, fields) {
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
	areValidCredentials(email, password, callback) {
		var sql = "SELECT Password FROM `mydb`.`User` WHERE Email=?";
		global.connection.query(sql, [email], function(error, rows, fields){
			if (error) throw error;
			if (rows.length == 1 && bcrypt.compareSync( password, rows[0].hashedpassword)) {
				callback(true);
			}else{
				callback(false);
			}
		});
	}
};
