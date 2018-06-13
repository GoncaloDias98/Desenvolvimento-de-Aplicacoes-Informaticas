module.exports = {
	listKPI(callback) {
		var sql = 'SELECT * from kpiView';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},


	readKPI(idKPI, callback) {
		var sql = "SELECT * from KPI where idKPI=?";
		global.connection.query(sql, [idKPI], function (error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},


};