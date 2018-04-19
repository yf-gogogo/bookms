var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var x='1,2,';
    var y = '1,2,3,4,'
    var patt1=new RegExp(x+'[0-9]');
    if(patt1.exec(y))
      console.log('fjasf')
  res.send('respond with a resource');
});

module.exports = router;
