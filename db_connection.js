const mysql = require('mysql')
const pool = mysql.createPool({
    host     :  '192.168.91.128',
    user     :  'root',
    password :  '123456',
    database :  'test'
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

