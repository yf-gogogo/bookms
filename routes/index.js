var express = require('express');
var router = express.Router();
var api_user = require('../controllers/user')
var api_book = require('../controllers/book')
var api_manage = require('../controllers/manage')
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(new Date().toLocaleString())
    res.render('index', { title: 'Express' });
});
router.get('/userauth',api_user.getOpenid);
router.get('/userinfo',api_user.getUserBywxid);
router.get('/getuserid',api_user.getUseridByOpenid);
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
router.get('/borrowingbook',api_book.getBorrowingByUserid);
router.get('/getorderbook',api_book.getOrderRecordByid);
//通过书名模糊查找
router.get('/searchbook',api_book.getBookByName);
//删除借阅记录
router.delete('/cancelborrow',api_book.removeBorrowRecordByBorrowid);
//删除预定记录
router.delete('/cancelorder',api_book.removeOrderByOrderId)
//同意借书
router.put('/agreeborrow',api_manage.agreeBorrow);
//借书完成
router.put('/borrowcomplete',api_manage.borrowComplete);
//申请还书
router.put('/returnapply',api_book.returnApply);
//同意还书
router.put('/agreereturn',api_manage.agreeReturn);
//还书完成
router.put('/returncomplete',api_manage.returnComplete);
//管理员申请管理
router.get('/allborrowbook',api_book.listBorrowed);
router.get('/allreturnbook',api_book.listReturned);

module.exports = router;
