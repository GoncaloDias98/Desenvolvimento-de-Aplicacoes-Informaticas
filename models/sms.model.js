module.exports = {
	readUsers(email, callback) {
		var sql = "SELECT * from User where Email=?";
		global.connection.query(sql, [email], function(error, rows) {
			if (error) throw error;
			callback(rows[0]);
		});
	},

	subscribeTempMax(data, callback){
		var sql = 'INSERT INTO Regras_User (temperaturaMax_user, localidade_user, UserID_Regras) VALUES (?,?,?)';
		global.connection.query(
			sql, [data.temperaturaMax_user, data.localidade, data.UserID], function(error, rows){
				if(error) throw error;
				callback(rows[0]);
				console.log(sql);
			});
		},
	
	subscribeTempMin(data, callback){
		var sql = 'INSERT INTO Regras_User (temperaturaMin_user, localidade_user, UserID_Regras VALUES (?,?,?)';
		global.connection.query(
			sql, [data.temperaturaMin_user, data.localidade, UserID_Regras], function(error, rows){
				if(error) throw error;
				callback(rows[0]);
				console.log(sql);
			})
	},

	listSubsMax(callback){
		var sql = 'SELECT Email, UserID, UserID_Regras, Contacto, temperaturaMax_user, localidade, localidade_user from User, Regras_User, Historico WHERE UserID_Regras = UserID and localidade = localidade_user';
		global.connection.query(sql, function(error, rows){
			if (error) throw error;
			callback(rows);
		});
	},

	listSubsMin(callback){
		var sql = 'SELECT Email, UserID, Contacto, temperaturaMin_user, localidade_user FROM User, Regras_User where UserID = UserID_Regras';
		global.connection.query(sql, function(error, rows){
			if (error) throw error;
			callback(rows);
		});
	},

	listTempCidades(UserID_Regras, callback){
		var sql= 'SELECT localidade, idLocalidade,  UserID, UserID_Regras, temperatura, temperaturaMax_user, temperaturaMin_user, localidade_user FROM Historico, Regras_User, User WHERE UserID_Regras = ? and localidade = localidade_user order by idLocalidade DESC';
		global.connection.query(sql, [UserID_Regras], function(error, rows){
			if (error) throw error;
			callback(rows[0]);
		})
	},
    
};