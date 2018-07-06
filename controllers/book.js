var DataTypes = require('sequelize');
var Op = DataTypes.Op;
var db_seq = require('../db/mysqldb').mysql_seq;
var f_book = require('../models/book');
var s_book = f_book(db_seq,DataTypes);
var f_book_borrow = require('../models/borrow_record');
var s_book_borrow = f_book_borrow(db_seq,DataTypes);
var f_book_order = require('../models/order_record');
var s_book_order = f_book_order(db_seq,DataTypes);
var f_user = require('../models/user');
var s_user = f_user(db_seq,DataTypes);
var template = require('./template');
var request = require('request');
//返回图书列表
function getBookList(req,res) {

    s_book.findAll().then(result =>{
        // console.log(result);
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
//查所有借阅记录
s_book_borrow.belongsTo(s_user,{foreignKey:'user_id'})
s_book_borrow.belongsTo(s_book,{foreignKey:'book_id'})
async function listBorrowed(req,res){
    let result = await s_book_borrow.findAll({
        attributes:['borrow_id','borrow_status','borrow_date','form_id'],
        where:{
            //筛选申请借书和
            borrow_status:{
                [Op.in]: ['0','1']
            }
        },
        include:[{
            model:s_book,
            attributes:['book_name','book_cover'],
            where:{book_id:DataTypes.col('borrow_record.book_id')}
        },{
            model:s_user,
            attributes:['user_name','user_cardid','openid'],
            where:{user_id:DataTypes.col('borrow_record.user_id')}
        }]
    })
    if(result.length > 0){
        res.json({ errorcode: '0', msg: result });
    }else{
        res.json({ errorcode: '1', msg: '' });
    }
}
async function listReturned(req,res){
    let result = await s_book_borrow.findAll({
        attributes:['borrow_id','book_id','borrow_status','borrow_date','form_id'],
        where:{
            //筛选申请还书和
            borrow_status:{
                [Op.in]: ['3','4']
            }
        },
        include:[{
            model:s_book,
            attributes:['book_name','book_cover'],
            where:{book_id:DataTypes.col('borrow_record.book_id')}
        },{
            model:s_user,
            attributes:['user_name','user_cardid','openid'],
            where:{user_id:DataTypes.col('borrow_record.user_id')}
        }]
    })
    if(result.length > 0){
        res.json({ errorcode: '0', msg: result });
    }else{
        res.json({ errorcode: '1', msg: '' });
    }
}
//根据user_id查借阅记录
s_book_borrow.belongsTo(s_book,{foreignKey:'book_id'})
function getBorrowListByUserid(req,res) {
    var user_id = req.query.user_id;
    // let book_status = req.query.book_status;
    s_book_borrow.findAll({
        attributes:['borrow_id','book_id','borrow_status','borrow_date'],
        where:{
            user_id:user_id,
            // borrow_status:{
            //     [Op.in]: ['0','1','2','3','4']
            // }
        },
        order:[['borrow_status','DESC']],
        include:{
            model:s_book,
            attributes:['book_name','book_cover'],
            where:{book_id:DataTypes.col('borrow_record.book_id')}
        }

    }).then(result =>{
        console.log(new Date('2018-5-30 13:11:06').toLocaleString())
        // var list = []
        if (result.length > 0) {
            // for(let i=0;i<result.length;i++){
            //     list.push(result[i].dataValues)
            //     list[i].borrow_date = list[i].borrow_date.toLocaleString()
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
        attributes:['order_id','book_id','order_date'],
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
        attributes:['book_name','current_num'],
        where:{
            book_id:book_id
        }
    })
    if(result.dataValues.current_num > 0) {
        //创建借书记录
        let result1 = await s_book_borrow.create({
            user_id: user_id,
            book_id: book_id,
            borrow_date: new Date().toLocaleString(),
            form_id:form_id
        })

        //更新剩余书数量
        let result2 = await s_book.update({
            current_num: result.dataValues.current_num - 1
        }, {
            where: {
                book_id: book_id
            }
        })
        let email = await s_user.findAll({
            attributes:['user_email'],
            where:{
                is_admin:1
            }
        })
        let listemail = [];

        for(let i=0;i<email.length;i++){
            // console.log(email[i])
            listemail.push(email[i].dataValues.user_email);
        }
        console.log(listemail);
        template.sendApplyEmail('借阅申请',result.book_name,listemail);
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
            order_date:new Date().toLocaleString()
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
function getBorrowingByUserid(req,res){
    var user_id = req.query.user_id;
    // var book_id = req.query.book_id;
    s_book_borrow.findAll({
        attributes:['book_id','borrow_status'],
        where:{
            user_id:user_id,
            // book_id:book_id
            borrow_status:{
                [Op.notIn]: ['5']
            }
        }

    }).then(result =>{
        // console.log(result)
        if (result != null) {
            res.json({ errorcode: '0', msg: result });
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
        attributes:['order_id','book_id'],
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
            book_id:book_id,
            borrow_status:{
                [Op.notIn]: ['5']
            }
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
            book_id:book_id,
            borrow_status:{
                [Op.notIn]: ['5']
            }
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
    let borrow_id = req.body.borrow_id;
    let book_id = req.body.book_id;
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
//根据预约id删除预约记录
async function removeOrderByOrderId(req,res) {
    let order_id = req.body.order_id
    //删除借书记录
    let result = await s_book_order.destroy({
        where:{
            order_id:order_id
        }
    })
    res.json({ errorcode: '0', msg: result })
}
//根据借阅id记录申请还书
async function returnApply(req,res){
    let borrow_id = req.body.borrow_id;
    let book_name = req.body.book_name;
    let form_id = req.body.form_id;
    let result = await s_book_borrow.update({
        borrow_status:'3',
        form_id:form_id,
    },{
        where:{
            borrow_id:borrow_id
        }
    })
    let email = await s_user.findAll({
        attributes:['user_email'],
        where:{
            is_admin:1
        }
    })
    let listemail = [];

    for(let i=0;i<email.length;i++){
        listemail.push(email[i].dataValues.user_email);
    }
    console.log(listemail);
    template.sendApplyEmail('还书申请',book_name,listemail)

    res.send(result)
}
//添加图书
async function addBook(req,res){
    let book_name = req.body.book_name;
    let book_writer = req.body.book_writer;
    let pub_company = req.body.pub_company;
    let current_num = req.body.current_num;
    let book_des = req.body.book_des;
    let pub_date = req.body.pub_date;
    let book_cover = req.body.book_cover;

    let result = await s_book.create(req.body);
    res.json(result);
}
//获取所有人的借阅记录
async function listAllBorrowed(req,res){
    let limit = req.query.limit;
    let offset = req.query.offset;
    let result = await s_book_borrow.findAndCountAll({
        attributes:['borrow_id','borrow_status','borrow_date'],
        limit:limit*1,
        offset:offset*1,
        where:{
            //筛选申请借书
            borrow_status:{
                [Op.in]: ['0','1','2','3','4']
            },
        },
        include:[{
            model:s_book,
            attributes:['book_id','book_name','book_cover'],
            where:{book_id:DataTypes.col('borrow_record.book_id')}
        },{
            model:s_user,
            attributes:['user_name','user_cardid'],
            where:{user_id:DataTypes.col('borrow_record.user_id')}
        }]
    });
    let total = result.count;

    res.json({'total':total,'rows':result.rows});

}
//PC端返回图书列表
async function getBookListForPC(req,res) {
    let limit = req.query.limit;
    let offset = req.query.offset;
    let result = await s_book.findAndCountAll({
        limit:limit*1,
        offset:offset*1,
    });
    let total = result.count;

    res.json({'total':total,'rows':result.rows});
}
//PC端删除书籍
async function deleteBookForPC(req,res){
    let book_id = req.body.book_id;
    let result = s_book.destroy({
        where:{
            book_id:book_id
        }
    });
    res.json(result);
}
//根据ISBN查图书信息
async function getBookInfoByISBN(req,res){
    let isbn = req.query.isbn;
    let result = await new Promise(function (resolve,reject) {
        request({
            url:'https://api.douban.com/v2/book/isbn/'+isbn,
            json:true,
        },function (err,response,body) {
            // console.log(body)
            resolve(body)
            // res.send({errorcode: '0', msg: '1'});
        })
    });
    res.json(result);
}
module.exports = {
    getBookList,
    getBookInfoByBookid,
    addBorrowRecord,
    addOrderRecord,
    getBorrowListByUserid,
    getOrderListByUserid,
    getBorrowingByUserid,
    getOrderRecordByid,
    getBookByName,
    getAllInfo,
    removeBorrowRecordByBorrowid,
    removeOrderByOrderId,
    listBorrowed,
    listReturned,
    returnApply,
    addBook,
    listAllBorrowed,
    getBookListForPC,
    deleteBookForPC,
    getBookInfoByISBN
};