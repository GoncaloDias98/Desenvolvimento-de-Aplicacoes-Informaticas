module.exports = {

    list(callback) {
        var sql = 'SELECT * from workshop';
        global.connection.query(sql, function(error, rows, fields){
            if (error) throw error;
            callback(rows);
        });
    },

    read(idWorkshop, callback) {
        var sql = 'SELECT nome, datainicio, datafim , local from workshop where idWorkshop=?;';
        global.connection.query(sql, [idWorkshop], function(error, rows, fields) {
            if (error) throw error;
            callback(rows[0]);
        });
    },


    update(idWorkshop, data, callback) {
        var sql = "UPDATE workshop SET nome=?, datainicio=?, datafim=?, local=? WHERE idWorkshop=?";

        global.connection.query(
            sql, [data.nome, data.datainicio, data.datafim, data.local, idWorkshop ], function(error, rows, fields) {
                if (error) throw error;
                callback(rows[0]);
            });
    },


};