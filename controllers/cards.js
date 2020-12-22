var express = require('express');
var router = express.Router();
var dbConn = require('../config/db');
const cards = require('../model/cards');

// display Cards list page
router.get('/', cards.getAll);

// add a new card
router.post('/add', cards.create);

// display edit card page
router.get('/edit/(:id)', cards.findOne)


module.exports = router;