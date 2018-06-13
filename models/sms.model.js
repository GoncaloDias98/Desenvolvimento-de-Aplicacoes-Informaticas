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
		var sql = 'select i1.* from Historico as i1 left join Historico as i2 ON ( i1.localidade = i2.localidade and i1.dataDados < i2.dataDados) where i2.dataDados is NULL; select idLocalidade,localidade, localidade_user,  temperatura, temperaturaMax_user, UserID, UserID_Regras from Historico, User, Regras_User where localidade = localidade_user and UserId = UserID_Regras and temperatura > temperaturaMax_user order by idLocalidade DESC';
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

	listTempCidades(callback){
		var sql= 'SELECT localidade, idLocalidade,  UserID, UserID_Regras, temperatura, temperaturaMax_user, temperaturaMin_user, localidade_user FROM Historico, Regras_User, User WHERE localidade = localidade_user and UserID = UserID_Regras order by idLocalidade DESC'
		global.connection.query(sql, function(error, rows){
			if (error) throw error;
			callback(rows);
		})
	},
    
};