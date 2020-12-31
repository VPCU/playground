var express = require('express');
var router = express.Router();
var db = require('../db_connection')
const userController = require('../controllers/usersController')

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: '请注册' });
});

router.post('/signup', async (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  const ret = await userController.signup(username, password)
  res.render('signupResult', { title: '注册', result: ret });
});

router.get('/login', async (req, res, next) => {
  res.render('login', { title: '请登录'})
})

router.post('/login', async (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  const user = await userController.login(username, password)
  if(user) {
    req.session.user = user
  } else {
    delete req.session.user
    res.render('login', { title: '请登录', warning: "登陆失败。请检查用户名和密码是否正确。"})
  }
  res.redirect('/')
})

router.get('/logout', (req, res, next) => {
  delete req.session.user
  res.redirect('/')
})

module.exports = router;
