module.exports = {
	list(callback) {
		var sql = 'SELECT * from dados';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	read(idDados, callback) {
		var sql = "SELECT * from dados where idDados=?";	
		global.connection.query(sql, [idDados], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	

	create(data, callback) {
		var sql = "INSERT INTO dados (idDados, Temperatura, Humidade, Precipitação, Vento, Neblusidade, Pressao) VALUES (?,?,?,?,?,?,?)"; 
		global.connection.query(
			sql, [data.nome, data.temp, data.humid, data.precip, data.vento, data.neblus, data.pressao], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
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