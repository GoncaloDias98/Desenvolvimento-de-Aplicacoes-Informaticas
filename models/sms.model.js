module.exports = {
	readUsers(email, callback) {
		var sql = "SELECT * from User where Email=?";
		global.connection.query(sql, [email], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},

	subscribeTempMax(data, callback){
		var sql = 'INSERT INTO Regras_User (temperaturaMax_user, localidade, UserID_Regras) VALUES (?,?,?)';
		global.connection.query(
			sql, [data.temperaturaMax_user, data.localidade, data.UserID], function(error, rows, fields){
				if(error) throw error;
				callback(rows[0]);
				console.log(sql);
			});
		},
	
	subscribeTempMin(data, callback){
		var sql = 'INSERT INTO Regras_User (temperaturaMin_user, localidade, UserID_Regras VALUES (?,?,?)';
		global.connection.query(
			sql, [data.temperaturaMin_user, localidade, UserID_Regras], function(error, rows, fields){
				if(error) throw error;
				callback(rows[0]);
				console.log(sql);
			}
		)
	},

	listSubsMax(callback){
		var sql = 'SELECT Email, UserID, Contacto, temperaturaMax_user, localidade from User, Regras_User where UserID = UserID_Regras';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	listSubsMin(callback){
		var sql = 'SELECT Email, UserID, Contacto, temperaturaMin_user, localidade from User, Regras_User where UserID = UserID_Regras';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},
    
};