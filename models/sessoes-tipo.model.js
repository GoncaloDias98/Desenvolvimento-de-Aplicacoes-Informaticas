module.exports = {
	list(callback) {
		var sql = "SELECT tipoBilhetes, descrissao, nome FROM webitclo_A15610.sessoestipobilhete a join tipobilhete b on b.idTipoBilhete = a.idTipoBilhetes join sessoes c on c.idSessao = a.idsessaos ; ";
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	create(data, callback) {
		var sql = "INSERT INTO webitclo_A15610.sessoestipobilhete (idTipoBilhetes, idsessaos) select (select idTipoBilhete FROM tipobilhete where tipoBilhetes like ?) as idTipoBilhetes, (select idSessao FROM sessoes where nome like ?) as idsessaos;";
		global.connection.query(
			sql, [data.tipobilhete, data.sessao], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
    delete(data, callback) {
        var sql = "\n" +
            "DELETE FROM webitclo_A15610.sessoestipobilhete WHERE idTipoBilhetes=(select idTipoBilhete FROM tipobilhete where tipobilhete.tipoBilhetes like ?) and idsessaos= (select idSessao FROM sessoes where sessoes.nome like ?);";
        global.connection.query(
            sql, [data.tipobilhete, data.sessao], function(error, rows, fields) {
                if (error) throw error;
                callback(rows[0]);
            });
    }
};
