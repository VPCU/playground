const db = require('../db_connection')

const userRepository = {}

userRepository.existsByUsername = function (username) {
    return false
}

userRepository.getByUsernameAndPassword = async (username, password) => {
    return await db.query(`SELECT * from users where username = ? and password = ?`, [username, password])
}

userRepository.addUser = async function (user) {
    await db.query(`INSERT INTO users (username, password) VALUES (?, ?);`, [user.username, user.password])
}

module.exports = userRepository