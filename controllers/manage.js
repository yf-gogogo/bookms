var DataTypes = require('sequelize');
var Op = DataTypes.Op;
var db_seq = require('../db/mysqldb').mysql_seq;
var f_book_borrow = require('../models/borrow_record');
var s_book_borrow = f_book_borrow(db_seq,DataTypes);
var template = require('./template');

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
//还书
async function argeeReturn(req,res){
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
        borrow_status:'3'
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
module.exports={
    agreeBorrow,
    argeeReturn,
}