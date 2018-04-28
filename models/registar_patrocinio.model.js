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
	}
};
