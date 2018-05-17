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


//发送图书可取申请
async function sendTemplate1(req,res) {
    let openid;
    let formid;
    let bookname;
    let a = new Date().getTime();
    console.log( a,conf.template.starttime)
    console.log((a-conf.template.starttime)/1000)
    if(new Date().getTime() - conf.template.starttime > conf.template.expires_in*1000){
        await utils.getAccess_token()

        // console.log('hahha'+result.then())
        console.log('access_token',conf.template.access_token);
    }
    let reqData = {
        "touser": "ofn2t4ilorJDG2X4xelxF_U1VyDQ",
        "template_id": conf.template.template_id1,
        "page": "pages/index",
        "form_id": "1526200635345",
        "data": {
            "keyword1": {
                "value": "339208499",
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
            resolve("象征意义的发一个")
            // res.send({errorcode: '0', msg: '1'});
        })
    })
    res.send({errorcode: '0', msg: result});

}
async function sendTemplate2(form_id){
    let a = new Date().getTime();
    console.log( a,conf.template.starttime)
    console.log((a-conf.template.starttime)/1000)
    if(new Date().getTime() - conf.template.starttime > conf.template.expires_in*1000){
        await utils.getAccess_token()

        // console.log('hahha'+result.then())
        console.log('access_token',conf.template.access_token);
    }
    let reqData = {
        "touser": "ofn2t4ilorJDG2X4xelxF_U1VyDQ",
        "template_id": conf.template.template_id2,
        "page": "pages/index",
        "form_id": form_id,
        "data": {
            "keyword1": {
                "value": "浪潮之巅",
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
module.exports ={
    sendTemplate1,
    sendTemplate2,
}