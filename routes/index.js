var express = require('express');
var router = express.Router();
var api_user = require('../api/user')
var api_book = require('../api/book')
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/userinfo',api_user.getUserBywxid);
router.get('/booklist',api_book.getBookList);
module.exports = router;
