var DataTypes = require('sequelize');
var Op = DataTypes.Op;
var db_seq = require('../db/mysqldb').mysql_seq;
var f_book_borrow = require('../models/borrow_record');
var s_book_borrow = f_book_borrow(db_seq,DataTypes);
var f_book = require('../models/book');
var s_book = f_book(db_seq,DataTypes);
var template = require('./template');
//同意借书
async function agreeBorrow(req,res) {
    let book_name = req.body.book_name;
    let openid = req.body.openid;
    let borrow_id = req.body.borrow_id;
    // let form_id = req.body.form_id;
    //获取formid
    let result = await s_book_borrow.findOne({
        attributes:['form_id'],
        where:{
            borrow_id:borrow_id
        }
    })
    // console.log(req.body.openid)
    let result1 = await s_book_borrow.update({
        borrow_status:'1'
    },{
        where:{
            borrow_id:borrow_id
        }
    })
    console.log(result.form_id)
    let msg = await template.sendTemplate1(result.form_id,book_name,openid);
    console.log(msg)
    res.json({'errcode':msg.errcode})
}
//借书完成
async function borrowComplete(req,res) {
    let borrow_id = req.body.borrow_id;
    let result = await s_book_borrow.update({
        borrow_status:'2',
    },{
        where:{
            borrow_id:borrow_id
        }
    })
    console.log('借书完成',result)
    res.send(result)
}
//同意还书
async function agreeReturn(req,res){
    let book_name = req.body.book_name;
    let openid = req.body.openid;
    let borrow_id = req.body.borrow_id;
    // let form_id = req.body.form_id;
    //获取formid
    let result = await s_book_borrow.findOne({
        attributes:['form_id'],
        where:{
            borrow_id:borrow_id
        }
    })
    // console.log(req.body.openid)
    let result1 = await s_book_borrow.update({
        borrow_status:'4'
    },{
        where:{
            borrow_id:borrow_id
        }
    })
    console.log(result.form_id)
    let msg = await template.sendTemplate2(result.form_id,book_name,openid);
    console.log(msg)
    res.json({'errcode':msg.errcode})
}
//还书完成
async function returnComplete(req,res){
    let borrow_id = req.body.borrow_id;
    let book_id = req.body.book_id;
    let result = await s_book_borrow.update({
        borrow_status:'5',
    },{
        where:{
            borrow_id:borrow_id
        }
    })
    //获取当前书的剩余数量
    let result1 = await s_book.findOne({
        attributes:['current_num'],
        where:{
            book_id:book_id
        }
    })
    //更新剩余书数量
    await s_book.update({
        current_num:result1.dataValues.current_num+1
    },{
        where:{
            book_id:book_id
        }
    })
    console.log('还书完成',result)
    res.send(result)
}
module.exports={
    agreeBorrow,
    agreeReturn,
    borrowComplete,
    returnComplete,
}