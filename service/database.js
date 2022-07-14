const mysql = require("mysql");

//Datos de conexion
const connection = mysql.createConnection({
    host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    user: 'bsale_test',
    password: 'bsale_test',
    database: 'bsale_test'
});
//Conexion a la base de datos
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});
//Funcion para evitar desconexion de la DB
setInterval(function () {
    connection.query('SELECT 1');
}, 4000);

module.exports = connection;