var DataTypes = require('sequelize');
var Op = DataTypes.Op;
var db_seq = require('../db/mysqldb').mysql_seq;
var f_book = require('../models/book');
var s_book = f_book(db_seq,DataTypes);
var f_book_borrow = require('../models/borrow_record');
var s_book_borrow = f_book_borrow(db_seq,DataTypes);
var f_book_order = require('../models/order_record');
var s_book_order = f_book_order(db_seq,DataTypes);
var https = require('https');
var conf = require('../configure');
var querystring = require("querystring");
var request = require('request')
var utils = require('../utils')
var nodemailer = require('nodemailer')

//图书可取模版
async function sendTemplate1(form_id,bookname,openid){
    let a = new Date().getTime();
    // console.log( a,conf.template.starttime)
    // console.log((a-conf.template.starttime)/1000)
    //判断是否超过2小时
    if(new Date().getTime() - conf.template.starttime > conf.template.expires_in*1000){
        await utils.getAccess_token()
        // console.log('access_token',conf.template.access_token);
    }
    let reqData = {
        "touser": openid,
        "template_id": conf.template.template_id1,
        "page": "pages/index/index",
        "form_id": form_id,
        "data": {
            "keyword1": {
                "value": bookname,
                "color": "#173177"
            },
            "keyword2": {
                "value": "2015年01月05日 12:30",
                "color": "#173177"
            },
            "keyword3": {
                "value": "粤海喜来登酒店",
                "color": "#173177"
            },
            "keyword4": {
                "value": "广州市天河区天河路208号",
                "color": "#173177"
            }
        },
        "emphasis_keyword": "keyword1.DATA"
    }
    return await new Promise(function (resolve,reject) {
        request({
            url:'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='
            + conf.template.access_token,
            method:'POST',
            json:true,
            body:reqData,
        },function (err,response,body) {
            // console.log(body)
            resolve(body)
            // res.send({errorcode: '0', msg: '1'});
        })
    })
}
//借阅申请模版
async function sendTemplate2(form_id,bookname){
    let a = new Date().getTime();
    console.log( a,conf.template.starttime)
    console.log((a-conf.template.starttime)/1000)
    if(new Date().getTime() - conf.template.starttime > conf.template.expires_in*1000){
        await utils.getAccess_token()

        // console.log('hahha'+result.then())
        console.log('access_token',conf.template.access_token);
    }
    console.log("formid"+form_id)
    let reqData = {
        "touser": "ofn2t4pirVpilrzHK0qaQgT1-gYU",
        "template_id": conf.template.template_id2,
        "page": "pages/index",
        "form_id": form_id,
        "data": {
            "keyword1": {
                "value": bookname,
                "color": "#173177"
            },
            "keyword2": {
                "value": "2015年01月05日 12:30",
                "color": "#173177"
            },
            "keyword3": {
                "value": "粤海喜来登酒店",
                "color": "#173177"
            },
            "keyword4": {
                "value": "广州市天河区天河路208号",
                "color": "#173177"
            }
        },
        "emphasis_keyword": "keyword1.DATA"
    }
    await new Promise(function (resolve,reject) {
        request({
            url:'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='
            + conf.template.access_token,
            method:'POST',
            json:true,
            body:reqData,
        },function (err,response,body) {
            console.log(body)
            resolve(body)
            // res.send({errorcode: '0', msg: '1'});
        })
    })
}
//借阅申请邮箱通知
function sendApplyEmail(bookname){
    const params = {
        host: 'smtp.163.com', // 设置服务
        port: 465, // 端口
        sercure: true, // 是否使用TLS，true，端口为465，否则其他或者568
        auth: {
            user: '13477036346@163.com', // 邮箱和密码
            pass: 'wy13477036346'
        }
    }

// 邮件信息
    const mailOptions = {
        from: '"微信小程序"13477036346@163.com', // 发送邮箱
        to: 'lxtx2013@foxmail.com', // 接受邮箱
        subject: '借阅申请', // 标题
        text: bookname // 内容
    }

// 发送邮件
    const transporter = nodemailer.createTransport(params)
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    })
}
module.exports ={
    sendTemplate1,
    sendTemplate2,
    sendApplyEmail,
}