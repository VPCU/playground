const db = require('../db_connection')

const userRepository = {}

userRepository.existsByUsername = function (username) {
    return false
}

userRepository.getByUsernameAndPassword = async (username, password) => {
    const r = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password])
    r[0].isAdmin = r[0].is_admin === 1
    delete r[0].is_admin
    return r
}

userRepository.addUser = async function (user) {
    return db.query('INSERT INTO users (username, password) VALUES (?, ?);', [user.username, user.password])
}

userRepository.updatePasswordById = async function(id, password) {
    const r = await db.query('UPDATE users SET password = ? WHERE id = ?;', [password, id])
    if(!r.affectedRows) throw "update failed"
}

userRepository.userAddTag = async function(userId, tagId) {
    return db.query('INSERT INTO user_like_tag (uid, tid) VALUES (?, ?);', [userId, tagId])
}

userRepository.userHasTag = async function(userId, tagId) {
    const r = await db.query('SELECT * from user_like_tag where uid = ? and tid = ?', [userId, tagId])
    return r.length !== 0
}

userRepository.userRemoveTag = async function(userId, tagId) {
    return db.query('DELETE FROM user_like_tag WHERE uid=? AND tid=?;', [userId, tagId]);
}

userRepository.userLikeBook = async function(userId, bookId) {
    return db.query('INSERT INTO user_and_book (uid, bid, like) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE like=1;', [userId, bookId])
}

userRepository.userDislikeBook = async function(userId, bookId) {
    return db.query('INSERT INTO user_and_book (uid, bid, like) VALUES (?, ?, 0) ON DUPLICATE KEY UPDATE like=0;', [userId, bookId])
}

userRepository.getTagsById = async (id) => {
    return db.query('SELECT tags.* FROM user_like_tag ut, tags WHERE ut.uid=? AND tags.id=ut.tid;', [id]);
}

userRepository.userClickBook = async (userId, bookId) => {
    return db.query('INSERT INTO user_and_book (uid, bid, click) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE click=click+1;', [userId, bookId])
}

userRepository.userRecommendedBook = async (userId, bookId) => {
    return db.query('INSERT INTO user_and_book (uid, bid, recommend) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE recommend=recommend+1;', [userId, bookId])
}

module.exports = userRepository