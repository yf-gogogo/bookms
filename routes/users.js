var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let x = "1,2,";
    let regex = new RegExp(x+"[0-9].$");

    console.log(regex.test("1,2,3,4,"))
    console.log(regex.test("1,2,3,"))
    res.send('respond with a resource');
});

module.exports = router;
