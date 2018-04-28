module.exports = {




bilhetescomprados(username, callback) {
    var sql = "SELECT idbilhete, datacompra, tipoBilhetes FROM webitclo_A15610.bilhete b join tipobilhete c on b.tipobilhete = c.idTipoBilhete and estado = 3 join users d on b.idparticipante = d.idUser and username = ?;";
    global.connection.query(sql, [username], function(error, rows) {
        if (error) throw error;
        callback(rows);
    });
},





};