const db = require('../db_connection')
const userRepository = require("../models/userRepository")
const booksController = {}
const tagRepository  = require("../models/tagRepository")
const bookRepository = require("../models/bookRepository")
const reviewRepository = require("../models/reviewRepository")
const commentRepository = require("../models/commentRepository")
const textToHTML = require("../utils/textToHTML")

tagController = {}

tagController.addTag = async (name) => {
    return tagRepository.addTag({name: name})
}

module.exports = tagController