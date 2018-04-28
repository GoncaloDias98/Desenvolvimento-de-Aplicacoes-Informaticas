module.exports = {

	nspeakers(callback) {
		var sql = "SELECT tspeakers from webitclo_A15610.nspeakers";
			global.connection.query(sql, function(error, rows, fields) {
				if (error) throw error;
				console.log(rows);
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

    sessoes(callback) {
        var sql = 'SELECT * from webitclo_A15610.view_sessoes';
        global.connection.query(sql, function(error, rows, fields){
            if (error) throw error;
            callback(rows);
        });
    },


    bilhetes(callback) {
        var sql = 'SELECT * FROM webitclo_A15610.blilhetesfront';
        global.connection.query(sql, function(error, rows, fields){
            if (error) throw error;
            callback(rows);
        });
    },



    dadosspeakers(callback) {
		var sql = "SELECT * from webitclo_A15610.dadosspeakers";
		global.connection.query(sql, function(error, rows, fields) {
			if (error) throw error;
			console.log(rows);
			callback(rows);			
		});
	},


    sponsor(callback) {
        var sql = "SELECT Patrocinador,  urllogo, SUM(montante) as montante FROM patrocinios GROUP BY  Patrocinador order by montante desc limit 4";
        global.connection.query(sql, function(error, rows, fields) {
            if (error) throw error;
            console.log(rows);
            callback(rows);
        });
    },

    workshop(callback) {
        var sql = "SELECT * from dadosworkshop";
        global.connection.query(sql, function(error, rows, fields) {
            if (error) throw error;
            console.log(rows);
            callback(rows);
        });
    },

/*

	totalBilhetes(callback) {
		var sql = 'select tbilhetes, tvalor, tspeaker,  Tcachet,  tpatrocinios, ((tpatrocinios + tvalor)-Tcachet) ttotal from ((SELECT COUNT(numero) tbilhetes FROM webitclo_A1510.bilhetes) t, 
		(SELECT SUM(valorTotal) tvalor FROM webitclo_A1510.bilhetes) t2 , (SELECT count(id_speaker)  tspeaker FROM webitclo_A1510.speakers) t3, (SELECT SUM(cachet) Tcachet FROM webitclo_A1510.speakers) t4, (SELECT SUM(valor) tpatrocinios FROM webitclo_A1510.patrocinios) t5 )';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			console.log(rows)
			callback(rows);
		});
	},

	vendaBilhetes(callback) {
		var sql = "SELECT SUM(valorTotal) FROM webitclo_A1510.bilhetes";	
		global.connection.query(sql, function(error, rows, fields) {
			if (error) throw error;
			console.log(rows)
			callback(rows);			
		});
	},	

	numeroSpeakers(callback) {
		var sql = "SELECT count(id_speaker) FROM webitclo_A1510.speakers";	
		global.connection.query(sql, function(error, rows, fields) {
			if (error) throw error;
			console.log(rows)
			callback(rows);			
		});
	},


	custoSpeakers(callback) {
		var sql = "SELECT SUM(cachet) FROM webitclo_A1510.speakers";	
		global.connection.query(sql, function(error, rows, fields) {
			if (error) throw error;
			console.log(rows)
			callback(rows);			
		});
	},

	totalPatrocinios(callback) {
		var sql = "SELECT SUM(valor) FROM webitclo_A1510.patrocinios";	
		global.connection.query(sql, function(error, rows, fields) {
			if (error) throw error;
			console.log(rows)
			callback(rows);			
		});
	},

};






____________________________________________________________
    ValorPatrocinios(callback) {
        var sql = 'SELECT sum(montante) as total FROM webitclo_a156.patrocinios;';
        global.connection.query(sql, function(error, rows, fields){
            if (error) throw error;
            callback(rows[0]);
        });
    },
 

    ValorBilhetes(callback) {
        var sql = "SELECT sum(preco) as ValorBilhetes FROM webitclo_a156.bilhete INNER JOIN tipobilhete ON bilhete.tipobilhete = tipobilhete.idTipoBilhete ;";
        global.connection.query(sql, function(error, rows, fields){
            if (error) throw error;
            callback(rows[0]);
        });
    },


    ValorColaboradores(callback) {
		var sql = "SELECT sum(salario) as ValorColaboradores FROM webitclo_a156.users;";
        global.connection.query(sql, function(error, rows, fields){
            if (error) throw error;
            callback(rows[0]);
        });
	},


    ValorSpeakers(callback) {
        var sql = "SELECT sum(salario) as ValorSpeakers FROM webitclo_a156.speakers;";
        global.connection.query(sql, function(error, rows, fields){
            if (error) throw error;
            callback(rows[0]);
        });
    },

*/
};
