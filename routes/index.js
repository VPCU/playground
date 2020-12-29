const express = require('express');
const router = express.Router();
const db = require('../db_connection')
const { check, oneOf, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.query("SELECT * FROM names", function (err, result, fields) {
    if (err) throw err;
    if (!(req.session.success === false))
      req.session.success = true
    res.render('index', {
      title: 'Express',
      query_result: result,
      success: req.session.success,
      errors: req.session.errors
    });
  });
  //res.render('index', { title: 'Express', query_result: {id:"123",name:"John"}});
});

router.post('/insert', [
    check('name', 'name is too long').isLength({max: 128}),
    check('name', 'name is empty').isLength({min: 1})
], function(req, res, next) {
  const errors = validationResult(req)
  console.log(errors)
  if(!errors.isEmpty()) {
    req.session.errors = errors.array()
    req.session.success = false
    res.redirect('/')
  } else {
    req.session.success = true
    var sql = `INSERT INTO names (name) VALUES ("${req.body.name}");`;
    db.query(sql, function (err, result) {
      if (err) throw err;
      res.redirect('/')
    });
  }
});

router.post('/delete', function (req, res, next) {
  const sql =  `DELETE FROM names WHERE id="${req.body.id}";`
  db.query(sql, function (err, result) {
    if (err) {
      req.session.success = false
      req.session.errors = [{ msg: 'DELETE ERROR' }]
    }
    res.redirect('/')
  })
});

router.post('/update', function (req, res, next) {
  const sql = `UPDATE names SET name = '${req.body.name}' WHERE id = '${req.body.id}'`;
  db.query(sql, function (err, result) {
    if (err) {
      req.session.success = false
      req.session.errors = [{ msg: 'UPDATE ERROR' }]
    }
    res.redirect('/')
  })
});

module.exports = router;
