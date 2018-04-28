module.exports = {


    dashboard(callback) {
        var sql = "SELECT t.tutilizador, t2.tcolaborador, t6.tvoluntario, t1.tspeaker, t3.spatrocinios, t4.sspeakers, t5.scolaboradores,  t7.sbilheteira, t8.tbilheteira, (t3.spatrocinios + t7.sbilheteira - (t5.scolaboradores + t4.sspeakers)) total from\n" +
            "            ((select count(iduser) tutilizador from users where type like 'utilizador') as t,\n" +
            "            (select count(iduser) tspeaker from users where type like 'speaker') as t1,\n" +
            "            (select count(iduser) tcolaborador from users where type not like 'utilizador') as t2,\n" +
            "            (select SUM(montante) spatrocinios from patrocinios) as  t3,\n" +
            "            (select SUM(salario) sspeakers from speakers)  as t4,\n" +
            "            (select SUM(salario) scolaboradores from users) as t5,\n" +
            "            (select count(iduser) tvoluntario from users where type like 'Voluntario') as t6,\n" +
            "            (select SUM(preco) sbilheteira from bilhete where estado like '3') as t7,\n" +
            "             (select count(preco) tbilheteira from bilhete where estado like '3') as t8);";
        global.connection.query(sql, function(error, rows, fields) {
            if (error) throw error;
            console.log(rows);
            callback(rows);
        });
    },
    graph(callback) {
        var sql = "SELECT week(datacompra) as week, count(idbilhete)as qnt, sum(b.preco) as money FROM  bilhete b \n" +
            "join tipobilhete c on b.tipobilhete = c.idTipoBilhete and estado = 3\n" +
            "Group by  week(datacompra)";
        global.connection.query(sql, function(error, rows, fields) {
            if (error) throw error;
            console.log(rows);
            callback(rows);
        });
    }



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
