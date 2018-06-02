const bcrypt = require('bcrypt');
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
	var sql = "INSERT INTO User (Nome, Password, Email, NIF, Contacto, Morada, TipoUser, Empresa, UI) VALUES (?,?,?,?,?,?,?,?,?)";
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(data.password, salt);	
	global.connection.query(
		sql, [data.Nome, hash, data.Email, data.NIF, data.Contacto, data.Morada, data.tipo, data.empresa, data.ui], function(error, rows, fields) {
		if (error) throw error;
		callback(rows[0]);
		console.log(sql);
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
	
	
areValidCredentials(email, password, callback) {
		var sql = "SELECT Password FROM User WHERE Email=?";
		global.connection.query(sql, [email], function(error, rows){
			if (error) throw error;
			if (rows.length == 0 ) callback(false);
			bcrypt.compare(rows[0].password, password, function(err, res) {
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