var express = require('express');
var router = express.Router();
const userController = require('../controllers/usersController')
const needToLogin = require('../middlewares/needToLogin')

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
    res.redirect('/')
  } else {
    delete req.session.user
    res.render('login', { title: '请登录', warningAlert: "登陆失败。请检查用户名和密码是否正确。"})
  }
})

router.get('/logout', (req, res, next) => {
  delete req.session.user
  res.redirect('/')
})

router.get('/editinfo', [needToLogin], async (req, res, next) => {
  const tags = await userController.getTagsStatus(req.session.user.id)
  res.render('changeUserInfo', { title: '修改个人信息', user: req.session.user, tags: tags})
})

router.post('/changpassword', [needToLogin], async (req, res, next) => {
  await userController.changePassword(req.session.user.id, req.body.password)
  const tags = await userController.getTagsStatus(req.session.user.id)
  res.render('changeUserInfo', { title: '修改个人信息', user: req.session.user, tags: tags, successAlert: "密码修改成功"})
})

router.get('/unliketag/:id', [needToLogin], async (req, res, next) => {
  userController.dislikeTag(req.session.user.id, req.params.id)
  res.redirect('/editinfo');
})

router.get('/liketag/:id', [needToLogin], async (req, res, next) => {
  userController.likeTag(req.session.user.id, req.params.id)
  res.redirect('/editinfo');
})



module.exports = router;
