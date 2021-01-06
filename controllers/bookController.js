const db = require('../db_connection')
const userRepository = require("../models/userRepository")
const booksController = {}
const tagRepository  = require("../models/tagRepository")
const bookRepository = require("../models/bookRepository")
const reviewRepository = require("../models/reviewRepository")
const commentRepository = require("../models/commentRepository")
const textToHTML = require("../utils/textToHTML")

booksController.getRecommends = async (userId, limit=8) => {
    const r = await booksController.getBooksRandomly(limit);
    r.forEach(book => {
        userRepository.userRecommendedBook(userId, book.id).then()
    })
    return r;
}

booksController.getRecommendsByBookId = async (bookId, limit=4) => {
    return booksController.getBooksRandomly(limit)
}

booksController.getRecommendsByTagId = async (userId, tagId, limit=10) => {
    const r = await bookRepository.getBookRandomlyByTagIdAndUserId(limit, tagId, userId)
    r.use = await bookRepository.useRecommend
    r.forEach(book => {
        userRepository.userRecommendedBook(userId, book.id).then()
    })
    r.forEach(book => {
        const v = book.click+book.recommend+5*book.like
        r.use(v)
    })

    return r;
}

booksController.getRecommendsByTagName = async (userId, tagName, limit=10) => {
    const r = await bookRepository.getBookRandomlyByTagNameAndUserId(limit, tagName, userId)
    r.use = await bookRepository.useRecommend
    r.forEach(book => {
        userRepository.userRecommendedBook(userId, book.id).then()
    })
    r.forEach(book => {
        const v = book.click+book.recommend+5*book.like
        r.use(v)
    })
    return r;
}

booksController.getBookById = async (id) => {
    const book = (await bookRepository.getBookById(id))[0]
    if(book) {
        book.tags = await bookRepository.getTagsById(id)
        return Object.assign({}, book)

    }
    return undefined
}

booksController.getBooksRandomly = async (n) => {
    return bookRepository.getBookRandomly(n)
}

booksController.getABookIdRandomly = async () => {
    return (await bookRepository.getBookRandomly(1))[0]
}

booksController.getCommendsById = async (id) => {
    return commentRepository.getCommentsByBookId(id)
}

booksController.getReviewsById = async (id) => {
    const r = await reviewRepository.getReviewsByBookId(id)
    r.forEach(review => review.content = textToHTML.all(review.content))
    return r
}

booksController.addReview = async (bookId, author, content) => {
    return reviewRepository.addReview({bid: bookId, author: author, content: content});
}

booksController.addComment = async (bookId, userId, content) => {
    return commentRepository.addComment({bid: bookId, uid: userId, content: content})
}

booksController.getBooksByTagName = async (tagName) => {
    return bookRepository.getBookByTagName(tagName)
}

booksController.addTag = async (bookId, tagId) => {
    return bookRepository.bookAddTag(bookId, tagId)
}

booksController.removeTag = async (bookId, tagId) => {
    return bookRepository.bookRemoveTag(bookId, tagId)
}

booksController.getTagsStatus = async (id) => {
    const tags = await tagRepository.getAll()
    const tagsHad = await bookRepository.getTagsById(id)
    const t = {}
    tagsHad.forEach( tag => {
        t[tag.id] = true
    })
    tags.forEach(tag => {
        tag.has = tag.id in t
    });
    return tags
}

booksController.addBook = (name, price, author, img, url, summary) => {
    price = parseFloat(price)
    return bookRepository.addBook({name: name, price: price, author: author, img: img, url: url, summary: summary})
}

booksController.updateBook = (id, name, price, author, img, url, summary) => {
    price = parseFloat(price)
    return bookRepository.updateBook({id: id, name: name, price: price, author: author, img: img, url: url, summary: summary})
}

booksController.search = (keyword) => {
    return bookRepository.searchBooks(keyword)
}

module.exports = booksController