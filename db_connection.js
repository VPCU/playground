const mysql = require('mysql')
const database = require('./configs/config').database
const pool = mysql.createPool({
    host     :  database.host,
    port     :  database.port,
    user     :  database.user,
    password :  database.password,
    database :  database.database,
})


const db = {}

// query(`select * from my_database where id = ?`, [1])
db.query = function( sql, values ) {
    // 返回一个 Promise
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql, values, ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
}


module.exports = db

