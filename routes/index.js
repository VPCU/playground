const express = require('express');
const router = express.Router();
const db = require('../db_connection')
const { check, oneOf, validationResult } = require('express-validator');
const needToLogin = require('../middlewares/needToLogin')

/* GET home page. */
router.get('/', [needToLogin], async (req, res, next) => {
  res.render('index', {title: '书店', user: req.session.user})
});


module.exports = router;
