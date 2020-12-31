const express = require('express');
const router = express.Router();
const db = require('../db_connection')
const { check, oneOf, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', async (req, res, next) => {
  let result = await db.query("SELECT * FROM names")
  if (!(req.session.success === false))
    req.session.success = true
  res.render('index', {
      title: 'Express',
      query_result: result,
      success: req.session.success,
      errors: req.session.errors
    });

  //res.render('index', { title: 'Express', query_result: {id:"123",name:"John"}});
});

router.post('/insert', [
    check('name', 'name is too long').isLength({max: 128}),
    check('name', 'name is empty').isLength({min: 1})
], async (req, res, next) => {
  const errors = validationResult(req)
  console.log(errors)
  if(!errors.isEmpty()) {
    req.session.errors = errors.array()
    req.session.success = false
    res.redirect('/')
  } else {
    req.session.success = true
    await db.query(`INSERT INTO names (name) VALUES (?);`, [req.body.name])
    res.redirect('/')
  }
});

router.post('/delete', async (req, res, next) => {
  await db.query(`DELETE FROM names WHERE id=?;`, [req.body.id])
  res.redirect('/')
});

router.post('/update', async (req, res, next) => {
  await db.query(`UPDATE names SET name = ? WHERE id = ?;`, [req.body.name, req.body.id])
  res.redirect('/')
});

module.exports = router;
