const express = require('express');
const router = express.Router();
const { check, oneOf, validationResult } = require('express-validator');
const needToLogin = require('../middlewares/needToLogin')
const bookController = require('../controllers/bookController')
const userController = require('../controllers/usersController')

/* GET home page. */
router.get('/', [needToLogin], async (req, res, next) => {
  const uid = req.session.user.id
  const tagsLike = await userController.getTags(uid)
  const contents = []
  const ot = ['言情', '外国小说', '中国古典小说', '文学理论']
  const otherTags = {}
  ot.forEach(e => otherTags[e] = true)
  for(const i in tagsLike) {
    delete otherTags[tagsLike[i].name]
    contents.push({head: tagsLike[i].name, books: await bookController.getRecommendsByTagId(uid, tagsLike[i].id, 8)})
  }
  contents.push({head: '推荐', books: await bookController.getRecommends(uid)})
  for(const t in otherTags) {
    contents.push({head: t, books: await bookController.getRecommendsByTagName(uid, t)})
  }
  res.render('index', {title: '书店', user: req.session.user, contents: contents})
});

router.get('/books/random', async (req, res, next) => {
  const id = await bookController.getABookIdRandomly()
  res.redirect(`/books/${id.id}`)
})

router.get('/books/:id', async (req, res, next) => {
  const book = await bookController.getBookById(req.params.id)
  const reviews = await bookController.getReviewsById(req.params.id)
  const comments = await bookController.getCommendsById(req.params.id)
  const recommends = await bookController.getRecommendsByBookId(req.params.id)
  res.render('books', {title: '书籍详情', user: req.session.user, book: book, reviews: reviews, comments: comments, recommends: recommends})
  if(req.session.user) userController.userClickBook(req.session.user.id, book.id).then()
})

router.post('/books/:id/newreview', [needToLogin], async (req, res, next) => {
  await bookController.addComment(req.params.id, req.session.user.id, req.body.content)
  res.redirect('back')
})

router.get('/category/:category', async (req, res, next) => {
  const category = req.params.category
  const books = await bookController.getBooksByTagName(category)
  res.render('category', {title: `书籍浏览-${category}`,user:req.session.user, category: category, books: books})
})

router.get('/search', async (req, res, next) => {
  const r = await bookController.search(req.query.keyword)
  res.render('search', {title: '搜索结果', user:req.session.user, books: r})
})

router.get('/likebook/:id', [needToLogin], async (req, res, next) => {
  await userController.userLikeBook(req.session.user.id, req.params.id)
  res.redirect('back')
})

router.get('/dislikebook/:id', [needToLogin], async (req, res, next) => {
  await userController.userDislikeBook(req.session.user.id, req.params.id)
  res.redirect('back')
})

module.exports = router;
