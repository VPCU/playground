const db = require('../db_connection')
const userRepository = require('../models/userRepository')
var express = require('express');
var router = express.Router();
const userController = require('../controllers/usersController')


router.get('/playground', async (req, res, next) => {
    let r = await userController.getTagsStatus(1);
    // let r = await tagRepository.getAll()
    res.json(r)
})


module.exports = router;

