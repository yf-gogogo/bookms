var DataTypes = require('sequelize');
var db_seq = require('../db/mysqldb').mysql_seq;
var f_book = require('../models/book');
var s_book = f_book(db_seq,DataTypes);
var f_book_borrow = require('../models/borrow_record');
var s_book_borrow = f_book_borrow(db_seq,DataTypes);
var f_book_order = require('../models/order_record');
var s_book_order = f_book_order(db_seq,DataTypes);
//返回图书列表
function getBookList(req,res) {
    s_book.findAll().then(result =>{
        console.log(result);
        res.send(result);
    })
}
//根据user_id查借阅记录
function getBorrowListByUserid(req,res) {
    var user_id = req.query.user_id;
    s_book_borrow.findAll({
        attributes:['book_id'],
        where:{
            user_id:user_id,
        }

    }).then(result =>{
        console.log(result.length)
        if (result.length > 0) {
            res.json({ errorcode: '0', msg: result });
        } else {
            res.json({ errorcode: '1', msg: 'no record' });
        }
    })
}
//根据user_id查预定记录
function getOrderListByUserid(req,res) {
    var user_id = req.query.user_id;
    s_book_order.findAll({
        attributes:['book_id'],
        where:{
            user_id:user_id,
        }
    }).then(result =>{
        if (result.length > 0) {
            res.json({ errorcode: '0', msg: result });
        } else {
            res.json({ errorcode: '1', msg: 'no record' });
        }
    })
}
//添加借阅记录
function addBorrowRecord(req,res){
    var user_id = req.body.user_id;
    var book_id = req.body.book_id;
    s_book_borrow.create({
        user_id:user_id,
        book_id:book_id,
        borrow_date:new Date()
    }).then(result =>{
        if (result == null) {
            res.json({ errorcode: '1', msg: 'failure' });
        } else {
            res.json({ errorcode: '0', r_id: result.dataValues });
        }
    })
}
//添加预定记录
function addOrderRecord(req,res){
    var user_id = req.body.user_id;
    var book_id = req.body.book_id;
    console.log(user_id,book_id)
    s_book_order.create({
        user_id:user_id,
        book_id:book_id,
        order_date:new Date()
    }).then(result =>{
        if (result == null) {
            res.json({ errorcode: '1', msg: 'failure' });
        } else {
            res.json({ errorcode: '0', r_id: result.dataValues });
        }
    })
}
module.exports = {
    getBookList,
    addBorrowRecord,
    addOrderRecord,
    getBorrowListByUserid,
    getOrderListByUserid,
};