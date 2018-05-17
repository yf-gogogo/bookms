var express = require('express');
var router = express.Router();
var api_user = require('../controllers/user')
var api_book = require('../controllers/book')
var api_manage = require('../controllers/template')
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/userauth',api_user.getOpenid);
router.get('/userinfo',api_user.getUserBywxid);
router.put('/userinfo',api_user.updateUserInfo);
router.get('/booklist',api_book.getBookList);
router.get('/bookinfo',api_book.getBookInfoByBookid);
router.get('/bookallinfo',api_book.getAllInfo);
//添加借阅或预定列表
router.post('/borrowbook',api_book.addBorrowRecord);
router.post('/orderbook',api_book.addOrderRecord);
//获取借阅或预定列表
router.get('/borrowbook',api_book.getBorrowListByUserid);
router.get('/orderbook',api_book.getOrderListByUserid);
//通过userid、bookid获取记录
router.get('/getborrowbook',api_book.getBorrowRecordByid);
router.get('/getorderbook',api_book.getOrderRecordByid);
//通过书名模糊查找
router.get('/searchbook',api_book.getBookByName);
//删除借阅记录
router.delete('/cancelborrow',api_book.removeBorrowRecordByBorrowid);
//发送模板消息
router.get('/sendtemplate1',api_manage.sendTemplate1);
module.exports = router;
