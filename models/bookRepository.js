const db = require('../db_connection')

bookRepository = {}

bookRepository.getBookById = async (id) => {
    return db.query('SELECT * FROM books WHERE id=?;', [id]);
}

bookRepository.getTagsById = async (id) => {
    return db.query('SELECT tags.* FROM book_has_tag bt, tags WHERE bt.bid=? AND tags.id=bt.tid;', [id]);
}

bookRepository.getIdByTagId = async (tagId) => {
    return db.query('SELECT books.id FROM book_has_tag bt, books WHERE bt.tid=? AND books.id=bt.bid;', [tagId])
}

bookRepository.getIdByTagName = async (tagName) => {
    return db.query('SELECT books.id FROM tags, book_has_tag bt, books WHERE tags.name=? AND bt.tid=tags.id AND books.id=bt.bid;', [tagName])
}

bookRepository.getBookByTagName = async (tagName) => {
    return db.query('SELECT books.* FROM tags, book_has_tag bt, books WHERE tags.name=? AND bt.tid=tags.id AND books.id=bt.bid;', [tagName])
}

bookRepository.bookAddTag = async (bookId, tagId) => {
    return db.query('INSERT INTO book_has_tag (bid, tid) VALUES (?, ?);', [bookId, tagId])
}

bookRepository.bookRemoveTag = async (bookId, tagId) => {
    return db.query('DELETE FROM book_has_tag WHERE bid=? AND tid=?;', [bookId, tagId]);
}

bookRepository.addBook = async (book) => {
    return db.query('INSERT INTO books (name, price, author, img, url, summary) VALUES (?, ?, ?, ?, ?, ?);',
        [book.name, book.price, book.author, book.img, book.url, book.summary])
}

bookRepository.updateBook = async (book) => {
    return db.query('UPDATE books SET name=?, price=?, author=?, img=?, url=?, summary=? WHERE id=?',
        [book.name, book.price, book.author, book.img, book.url, book.summary, book.id])
}

bookRepository.getBookRandomly = async (n) => {
    return db.query("SELECT DISTINCT * FROM books ORDER BY RAND() LIMIT ?;", [n])
}

bookRepository.getBookRandomlyByTagName = async (n, name) => {
    return db.query("SELECT DISTINCT books.* FROM tags, book_has_tag bt, books WHERE tags.name=? AND bt.tid=tags.id AND books.id=bt.bid ORDER BY RAND() LIMIT ?;", [name, n])
}

bookRepository.getBookRandomlyByTagNameAndUserId = async (n, name, userId) => {
    return db.query("SELECT DISTINCT books.*, ub.* FROM tags, book_has_tag bt, books, user_and_book ub WHERE tags.name=? AND bt.tid=tags.id AND books.id=bt.bid AND ub.uid=? AND ub.bid=books.id ORDER BY RAND() LIMIT ?;", [name, userId, n])
}

bookRepository.getBookRandomlyByTagId = async (n, id) => {
    return db.query("SELECT DISTINCT books.* FROM tags, book_has_tag bt, books WHERE bt.tid=? AND books.id=bt.bid ORDER BY RAND() LIMIT ?;", [id, n])
}

bookRepository.getBookRandomlyByTagIdAndUserId = async (n, id, userId) => {
    return db.query("SELECT DISTINCT books.*, ub.* FROM tags, book_has_tag bt, books, user_and_book ub WHERE bt.tid=? AND books.id=bt.bid AND ub.uid=? AND ub.bid=books.id ORDER BY RAND() LIMIT ?;", [id, userId, n])
}

bookRepository.getBookIdRandomly = async (n) => {
    return db.query("SELECT DISTINCT id FROM books ORDER BY RAND() LIMIT ?;", [n])
}

bookRepository.searchBooks = async (keyword) => {
    const like = `'%${keyword}%'`
    return db.query(`SELECT * FROM books WHERE books.name LIKE ${like} OR books.author LIKE ${like} OR books.summary LIKE ${like};`)
}

bookRepository.useRecommend = (u) => {
    let like = `'%${5}%'`
    return u
}


module.exports = bookRepository