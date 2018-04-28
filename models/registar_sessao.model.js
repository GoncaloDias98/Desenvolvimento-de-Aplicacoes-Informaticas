module.exports = {
	list(callback) {
		var sql = 'SELECT distinct idSessao, s.nome, u.name, dia, inicio, fim, sala from sessoes s, users u where s.keyspeaker=u.iduser';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

    pspeakers(callback) {
        var sql = "SELECT * FROM webitclo_A15610.pspeakers";
        global.connection.query(sql, function(error, rows, fields) {
            if (error) throw error;
            console.log(rows)
            callback(rows);
        });
    },

    dadosworkshop(callback) {
        var sql = "SELECT * from  dadosworkshop";
        global.connection.query(sql, function(error, rows, fields) {
            if (error) throw error;
            callback(rows[0]);
        });
    },

	tsalas(callback) {
        var sql = "SELECT * FROM webitclo_A15610.tsalas";
        global.connection.query(sql, function(error, rows, fields) {
			if (error) throw error;
			console.log(rows)
            callback(rows);
        });
    },

    read(idSessao, callback) {
		var sql = "SELECT * from sessoes where idSessao=?";
		global.connection.query(sql, [idSessao], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	

	create(data, callback) {
		var sql = "INSERT INTO sessoes (nome, dia, inicio, fim, sala, keyspeaker ) VALUES (?,?,?,?,?,?)";
		global.connection.query(
			sql, [data.nome, data.dia, data.inicio, data.fim, data.sala, data.keyspeaker ], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	update(idSessao, data, callback) {
		console.log(data);
		var sql = "UPDATE sessoes SET nome=?, dia=?, inicio=?, fim=?, sala=?, keyspeaker=? WHERE idSessao=?";
		global.connection.query(
			sql, [data.nome, data.dia, data.inicio, data.fim, data.sala, data.keyspeaker, idSessao], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	remove(nome, callback) {
		var sql = "DELETE from sessoes WHERE idSessao=?";
		global.connection.query(sql, [idSessao], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	} 
};