const express = require('express');
const router = express.Router();
const needToLogin = require('../middlewares/needToLogin')
const bookController = require('../controllers/bookController')
const tagController = require('../controllers/tagController')
const needAdmin = require('../middlewares/needAdmin')

router.get("/addbooks", [needToLogin, needAdmin], async (req, res, next) => {
    res.render('addbooks', { title: '添加书籍', user: req.session.user })
})

router.post("/addbooks", [needToLogin, needAdmin], async (req, res, next) => {
    const p = req.body
    const r = await bookController.addBook(p.name, p.price, p.author, p.img, p.url, p.summary)
    res.redirect(`/admin/booksadded/${r.insertId}`)
})

router.get("/booksadded/:id", [needToLogin, needAdmin], async (req, res, next) => {
    const book = await bookController.getBookById(req.params.id)
    const reviews = await bookController.getReviewsById(req.params.id)
    const tags = await bookController.getTagsStatus(req.params.id)
    res.render('booksAdded', { title: '书籍详情', user: req.session.user, book: book, reviews: reviews, tags: tags})
})

router.get("/books/addtag/:id/:tag", [needToLogin, needAdmin], async (req, res, next) => {
    await bookController.addTag(req.params.id, req.params.tag)
    res.redirect('back')
})

router.get("/books/removetag/:id/:tag", [needToLogin, needAdmin], async (req, res, next) => {
    await bookController.removeTag(req.params.id, req.params.tag)
    res.redirect('back')
})

router.post("/books/addreview/:id", [needToLogin, needAdmin], async (req, res, next) => {
    await bookController.addReview(req.params.id, req.body.author, req.body.content)
    res.redirect('back')
})

router.get("/setting", [needToLogin, needAdmin], async (req, res, next) => {
    res.render("settings", { title: '设置', user: req.session.user})
})

router.post("/addtag", [needToLogin, needAdmin], async (req, res, next) => {
    await tagController.addTag(req.body.name)
    res.redirect('back')
})

router.get("/editbook/:id", [needToLogin, needAdmin], async (req, res, next) => {
    const book = await bookController.getBookById(req.params.id)
    if(book)
        res.render('editBook', { title: '编辑图书', book: book })
    else
        res.redirect('back')
})

router.post("/editbook/:id", [needToLogin, needAdmin], async (req, res, next) => {
    const p = req.body
    const r = await bookController.updateBook(req.params.id, p.name, p.price, p.author, p.img, p.url, p.summary)
    res.redirect(`/admin/booksadded/${req.params.id}`)
})

module.exports = router;
