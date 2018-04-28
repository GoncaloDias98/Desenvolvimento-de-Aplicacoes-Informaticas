module.exports = {
	list(callback) {
		var sql = 'SELECT count(preco) as nrBilhetes FROM webitclo_a156.bilhete INNER JOIN tipobilhete ON bilhete.tipobilhete = tipobilhete.idTipoBilhete';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},



    listabilhetes(callback) {
        var sql = 'SELECT idbilhete,name, tipoBilhetes as tipo, b.preco, datacompra FROM webitclo_A15610.bilhete b\n' +
            '            join tipobilhete c on b.tipobilhete = c.idTipoBilhete and estado = 3\n' +
            '            join users d on b.idparticipante = d.idUser';
        global.connection.query(sql, function(error, rows, fields){
            if (error) throw error;
            callback(rows);
        });
    },

    listatipo(callback) {
        var sql = 'SELECT * FROM webitclo_A15610.tipobilhete';
        global.connection.query(sql, function(error, rows, fields){
            if (error) throw error;
            callback(rows);
        });
    },


    update(idtipobilhete, data, callback) {
        var sql = "UPDATE tipobilhete SET preco=? where idtipobilhete=?";
        global.connection.query(
            sql, [ data.preco, idtipobilhete], function(error, rows, fields) {
                if (error) throw error;
                callback(rows[0]);
            });
    },




    dados(callback) {
        var sql = 'SELECT * from dadosworkshop';
        global.connection.query(sql, function(error, rows, fields) {
            if (error) throw error;
            console.log(rows);
            callback(rows);
        });
    },

    sessoes(callback) {
        var sql = 'SELECT * from sessoes';
        global.connection.query(sql, function(error, rows, fields){
            if (error) throw error;
            callback(rows);
        });
    },

	read(nome, callback) {
		var sql = "SELECT * from tipoBilhete where tipoBilhetes=?";
		global.connection.query(sql, [nome], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	

	create(data, callback) {
		var sql = "INSERT INTO bilheteira (userid, idsessao, tipo, qnt, soma, datacompra ) VALUES (?,?,?,?,?,?)";
		global.connection.query(
			sql, [data.userid, data.idsessao, data.tipo, data.qnt, data.soma, data.datacompra ], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	}
};
