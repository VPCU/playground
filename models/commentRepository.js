const db = require('../db_connection')

commentRepository = {}

commentRepository.addComment = async (comment) => {
    return db.query('INSERT INTO comments (bid, uid, content) VALUES (?, ?, ?);', [comment.bid, comment.uid, comment.content]);
}

commentRepository.getCommentById = async (id) => {
    return db.query('SELECT * FORM comments WHERE id=?;', [id])
}

commentRepository.getCommentsByBookId = async (bid) => {
    return db.query('SELECT comments.*, users.username FROM comments, users WHERE bid=? AND users.id=comments.uid;', [bid])
}

module.exports = commentRepository