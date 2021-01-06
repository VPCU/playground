const db = require('../db_connection')

reviewRepository = {}

reviewRepository.addReview = async (review) => {
    return db.query('INSERT INTO reviews (bid, author, content) VALUES (?, ?, ?);', [review.bid, review.author, review.content]);
}

reviewRepository.getReviewById = async (id) => {
    return db.query('SELECT * FORM reviews WHERE id=?;', [id])
}

reviewRepository.getReviewsByBookId = async (bid) => {
    return db.query('SELECT * FROM reviews WHERE bid=?;', [bid])
}

module.exports = reviewRepository