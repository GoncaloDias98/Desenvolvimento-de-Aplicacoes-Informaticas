var bcrypt =  require('bcrypt-nodejs')

module.exports = {
	list(callback) {
		var sql = 'SELECT * from user';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	read(username, callback) {
		var sql = "SELECT * from user where username=?";	
		global.connection.query(sql, [username], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	

create(hash, data, callback) {
		var sql = "INSERT INTO User (Username, Nome, Password, Email, NIF, Contacto, Morada) VALUES (?,?,?,?,?,?,?)"; 
		global.connection.query(
			sql, [data.Username, data.Nome, hash, data.Email, data.NIF, data.Contacto, data.Morada], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
			console.log(sql);
		});
	},

	/*
	update(username, data, callback) {
		var sql = "UPDATE user SET name=?, email=?, password=? WHERE username=?"; 
		global.connection.query(
			sql, [data.name, data.email, data.password, username], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	}, 
	*/
	
	remove(username, callback) {
		var sql = "DELETE from user WHERE username=?"; 
		global.connection.query(sql, [username], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},
	
	areValidCredentialsEmpresa(username, password, callback) {
		var sql = "SELECT password FROM user_empresa WHERE Username_Empresa=?";
		global.connection.query(sql, [username], function(error, rows, fields){
			if (error) throw error;
			if (rows.length == 1 && rows[0].password === password) {
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	
	listMeteorologia(callback) {
		var sql = 'SELECT * from dados';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},

	//New
	areValidCredentials(username, password, callback) {
		var sql = "SELECT password FROM user WHERE username=?";
		global.connection.query(sql, [username], function(error, rows, fields){
			if (error) throw error;
			if (rows.length == 1 && rows[0].password === password) {
				callback(true);
			}else{
				callback(false);
			}
		});
	}
};