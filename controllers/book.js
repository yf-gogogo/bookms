var DataTypes = require('sequelize');
var Op = DataTypes.Op;
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
    //查询书的数量
    s_book.findOne({
        attributes:['current_num'],
        where:{
            book_id:book_id
        }
    }).then(result =>{
        if(result == null){
            res.json({ errorcode: '1', msg: 'failure' });
        }else if(result.dataValues.current_num > 0){
            //创建借书记录
            s_book_borrow.create({
                user_id:user_id,
                book_id:book_id,
                borrow_date:new Date()
            }).then(result1 =>{
                if (result1 == null) {
                    res.json({ errorcode: '1', msg: 'failure' });
                } else {
                    //更新剩余书数量
                    s_book.update({
                        current_num:result.dataValues.current_num-1
                    },{
                        where:{
                            book_id:book_id
                        }
                    }).then(result2 =>{
                        if(result2 == null){
                            res.json({ errorcode: '1', msg: 'failure' });
                        }else {
                            res.json({ errorcode: '0', msg: result1.dataValues });
                        }
                    })
                }
            })
        }else {
            res.json({ errorcode: '0', msg: 'no book' })
        }
    })
}
//添加预定记录
function addOrderRecord(req,res){
    var user_id = req.body.user_id;
    var book_id = req.body.book_id;
    console.log(user_id,book_id)
    s_book_order.findOrCreate({
        where:{
            user_id:user_id,
            book_id:book_id,
        },
        defaults:{
            user_id:user_id,
            book_id:book_id,
            order_date:new Date()
        }

    }).spread((user, created) => {
        if(created){
            res.json({ errorcode: '0', r_id: user.get({plain: true}) });
        }else {
            res.json({ errorcode: '1', msg: 'existed' });
        }
        /*.then(result =>{
                if (result == null) {
                    res.json({ errorcode: '1', msg: 'failure' });
                } else {
                    res.json({ errorcode: '0', r_id: result.dataValues });
                }
            })*/
    })
}
//根据bookid和userid查询借阅记录
function getBorrowRecordByid(req,res){
    var user_id = req.query.user_id;
    var book_id = req.query.book_id;
    s_book_borrow.findOne({
        attributes:['book_id'],
        where:{
            user_id:user_id,
            book_id:book_id
        }

    }).then(result =>{

        if (result != null) {
            res.json({ errorcode: '0', msg: result.dataValues });
        } else {
            res.json({ errorcode: '1', msg: 'no record' });
        }
    })
}
//根据bookid和userid查询预定记录
function getOrderRecordByid(req,res){
    var user_id = req.query.user_id;
    var book_id = req.query.book_id;
    s_book_order.findOne({
        attributes:['book_id'],
        where:{
            user_id:user_id,
            book_id:book_id
        }

    }).then(result =>{

        if (result != null) {
            res.json({ errorcode: '0', msg: result.dataValues });
        } else {
            res.json({ errorcode: '1', msg: 'no record' });
        }
    })
}
//根据书名搜索
function getBookByName(req,res){
    var book_name = req.query.book_name;
    s_book.findAll({
        where:{
            book_name:{
                [Op.like]:'%'+book_name+'%'
            }
        }
    }).then(result =>{
        if(result.length>0){
            res.json({ errorcode: '0', msg: result });
        }else {
            res.json({ errorcode: '1', msg: 'not find' });
        }
    })
}
module.exports = {
    getBookList,
    addBorrowRecord,
    addOrderRecord,
    getBorrowListByUserid,
    getOrderListByUserid,
    getBorrowRecordByid,
    getOrderRecordByid,
    getBookByName,
};