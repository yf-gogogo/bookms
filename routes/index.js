var express = require('express');
var router = express.Router();
var api_user = require('../api/user')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/userinfo',api_user.getUserBywxid);
module.exports = router;
