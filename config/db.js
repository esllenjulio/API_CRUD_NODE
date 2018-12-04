
var mysql = require('mysql');

const con = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ad709168',
        database: 'db_teste_api'
    }, { multipleStatements: true }
    );
}


module.exports = con;