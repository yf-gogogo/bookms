var DataTypes = require('sequelize');
var Op = DataTypes.Op;
var db_seq = require('../db/mysqldb').mysql_seq;
var f_book = require('../models/book');
var s_book = f_book(db_seq,DataTypes);
var f_book_borrow = require('../models/borrow_record');
var s_book_borrow = f_book_borrow(db_seq,DataTypes);
var f_book_order = require('../models/order_record');
var s_book_order = f_book_order(db_seq,DataTypes);
var template = require('./template')
//返回图书列表
function getBookList(req,res) {
    s_book.findAll().then(result =>{
        console.log(result);
        res.send(result);
    })
}
//根据bookid查book信息
async function getBookInfoByBookid(req,res){
    let book_id = req.query.book_id;
    let result = await s_book.findOne({
        where:{
            book_id:book_id
        }
    })
    if(result == null){
        res.json({ errorcode: '1', msg: "no info" });
    }else {
        res.json({ errorcode: '0', msg: result });
    }
}
//根据user_id查借阅记录
s_book_borrow.belongsTo(s_book,{foreignKey:'book_id'})
function getBorrowListByUserid(req,res) {
    var user_id = req.query.user_id;
    s_book_borrow.findAll({
        attributes:['borrow_id','book_id','borrow_status','borrow_date'],
        where:{
            user_id:user_id,
        },
        include:{
            model:s_book,
            attributes:['book_name','book_cover'],
            where:{book_id:DataTypes.col('borrow_record.book_id')}
        }

    }).then(result =>{
        console.log(result)
        var list = []
        if (result.length > 0) {
            // for(let i=0;i<result.length;i++){
            //     list.push(result[i].book)
            // }
            res.json({ errorcode: '0', msg: result });
        } else {
            res.json({ errorcode: '1', msg: result });
        }
    })
}
//根据user_id查预定记录
s_book_order.belongsTo(s_book,{foreignKey:'book_id'})
function getOrderListByUserid(req,res) {
    var user_id = req.query.user_id;
    s_book_order.findAll({
        attributes:['book_id','order_date'],
        where:{
            user_id:user_id,
        },
        include:{
            model:s_book,
            attributes:['book_name','book_cover'],
            where:{book_id:DataTypes.col('order_record.book_id')}
        }
    }).then(result =>{
        if (result.length > 0) {
            res.json({ errorcode: '0', msg: result });
        } else {
            res.json({ errorcode: '1', msg: result });
        }
    })
}
//添加借阅记录并发送模版消息
async function addBorrowRecord(req,res){
    var user_id = req.body.user_id;
    var book_id = req.body.book_id;
    let form_id = req.body.form_id;
    //查询书的数量
    let result = await s_book.findOne({
        attributes:['current_num'],
        where:{
            book_id:book_id
        }
    })
    if(result.dataValues.current_num > 0) {
        //创建借书记录
        let result1 = await s_book_borrow.create({
            user_id: user_id,
            book_id: book_id,
            borrow_date: new Date()
        })

        //更新剩余书数量
        let result2 = await s_book.update({
            current_num: result.dataValues.current_num - 1
        }, {
            where: {
                book_id: book_id
            }
        })
        await template.sendTemplate2(form_id)
        if (result2 == null) {
            res.json({errorcode: '1', msg: 'failure'});
        } else {
            res.json({errorcode: '0', msg: result1.dataValues});
        }
    }
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
//获取书借阅，预约详情
async function getAllInfo(req,res) {
    let book_id = req.query.book_id;
    let user_id = req.query.user_id;
    let result1 = await s_book.findOne({
        where:{
            book_id:book_id
        }
    })
    let result2 = await s_book_borrow.findOne({
        attributes:['borrow_date'],
        where:{
            user_id:user_id,
            book_id:book_id
        }

    })
    let result3 = await s_book_order.findOne({
        attributes:['order_date'],
        where:{
            user_id:user_id,
            book_id:book_id
        }

    })
    let result4 = await s_book_borrow.findAll({
        attributes:['user_id','borrow_date'],
        where:{
            book_id:book_id
        }
    })
    let result5 = await s_book_order.findAll({
        attributes:['user_id','order_date'],
        where:{
            book_id:book_id
        }
    })
    res.json({
        info:result1,
        borrow:result2,
        order:result3,
        otherborrow:result4,
        otherorder:result5
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
//根据借阅id删除借阅记录
async function removeBorrowRecordByBorrowid(req,res){
    let borrow_id = req.query.borrow_id;
    let book_id = req.query.book_id;
    //删除借书记录
    let result = await s_book_borrow.destroy({
        where:{
            borrow_id:borrow_id
        }
    })
    //获取当前书的剩余数量
    let result1= await s_book.findOne({
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
    res.json({ errorcode: '0', msg: result })
}
module.exports = {
    getBookList,
    getBookInfoByBookid,
    addBorrowRecord,
    addOrderRecord,
    getBorrowListByUserid,
    getOrderListByUserid,
    getBorrowRecordByid,
    getOrderRecordByid,
    getBookByName,
    getAllInfo,
    removeBorrowRecordByBorrowid,
};