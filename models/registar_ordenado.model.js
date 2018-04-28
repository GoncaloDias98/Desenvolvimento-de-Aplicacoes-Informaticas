module.exports = {
	list(callback) {
		var sql = "SELECT Patrocinador,  urllogo, SUM(montante) as montante FROM patrocinios GROUP BY  Patrocinador order by montante desc ";
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	create(data, callback) {
		var sql = "INSERT INTO patrocinios (Patrocinador, montante, urllogo) VALUES (?,?,?)";
		global.connection.query(
			sql, [data.Patrocinador, data.montante, data.urllogo], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

    update(salario, data, callback) {
        var sql = "UPDATE users SET salario=? where type NOT IN (select type from users where type like 'speakers' or type like 'utilizador' or type like 'voluntario') ";
        global.connection.query(
            sql, [data.salario], function(error, rows, fields) {
                if (error) throw error;
                callback(rows[0]);
            });
    },
};
