module.exports = {
    compra(data, callback) {
        var sql = "INSERT INTO webitclo_A15610.bilhete (`idparticipante`, `tipobilhete`, `estado`, `preco`)\n" +
            "select (select idUser FROM users where username=?), (select idTipoBilhete FROM tipobilhete where tipoBilhetes like ?) as idtipo, '3', ? from users limit 1;";
        global.connection.query(
            sql, [data.user,  data.bilhete, data.preco], function(error, rows, fields) {
                if (error) throw error;
                callback(rows[0])
            });
    }


};