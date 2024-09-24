const mysql = require('mysql2');


// create th coonection to dtabases
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'awadepavan8805@',
    database:'expense'
});


// test connection

pool.getConnection((err,connection) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database');
    connection.release(); //
});

module.exports = pool;