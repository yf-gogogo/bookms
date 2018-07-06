var DataTypes = require('sequelize');
var db_seq = require('../db/mysqldb').mysql_seq;
var f_user = require('../models/user');
var s_user = f_user(db_seq,DataTypes);
var https = require('https');
var conf = require('../configure');
var crypto = require('crypto');

function getUserBywxid(req,res) {
    var user_id = req.query.user_id;
    s_user.findOne({
        where:{
            user_id:user_id
        }
    }).then(result =>{
        res.json({errorcode: '0', msg: result.dataValues});
    })

}
async function getUseridByOpenid(req,res) {
    let openid = req.query.openid;
    let result = await s_user.findOne({
        attribute:['user_id'],
        where:{
            openid:openid
        }
    });
    console.log(result.dataValues)
    res.json({errorcode: '0', msg: result});
}
function updateUserInfo(req,res){
    // console.log(req.body);
    var user_id = req.body.user_id;
    var user_name = req.body.user_name;
    var user_cardid = req.body.user_cardid;
    var user_email = req.body.user_email;
    var user_phone = req.body.user_phone;
    var is_admin = '0';
    if(req.body.switch){
        is_admin = '1';
    }
    s_user.update({
        user_name:user_name,
        user_cardid:user_cardid,
        user_phone:user_phone,
        user_email:user_email,
        is_admin:is_admin
    },{
        where:{
            user_id:user_id
        }
    }).then(result =>{
        if(result == null){
            res.json({errorcode: '0', msg: 'error'});
        }else{
            res.json({errorcode: '0', msg: result});
        }
    })
}
function getOpenid(req,res){
    var code = req.query.code;
    var content ='';
    console.log(code);
    const option = {
        hostname: 'api.weixin.qq.com',
        path: '/sns/jscode2session?appid='+conf.wxkey.appid+'&secret='+conf.wxkey.secret
        +'&js_code='+code+'&grant_type=authorization_code',
        method: 'GET'
    };
    https.request(option,response =>{
        response.setEncoding('utf8');
        response.on('data',body =>{
            content += body;
        }).on("end", function () {
            content = JSON.parse(content)
            console.log(content);

            s_user.findOrCreate({
                where:{
                    openid:content.openid
                },
                defaults:{
                    session_key:content.session_key
                }
            }).spread((user, created) => {

                res.json({errorcode: '0', msg: user.get({plain: true})});

            })
        });
    }).on('error', function (e) {
        console.log(" error: " + e.message);
    }).end();
}
/*****管理员登陆*****/
async function manageLoginForPC(req,res){
    let password = req.query.password;
    if(password == 'nercel2018'){
        let md5 = crypto.createHash('md5').update(password).digest('hex');
        res.cookie('login', md5.toString(), { maxAge: 24*60*60*1000,httpOnly: true });
        res.json({'errcode':0});
    } else {
        res.json({'errcode':1});
    }
}
/*****登录状态*****/
async function isloginForPC(req,res){
    let cookie = req.cookies.login;
    console.log('cookie',cookie);
    if(cookie != null && cookie == crypto.createHash('md5').update('nercel2018').digest('hex')){
        res.json({'errcode':0});
    }else{
        res.json({'errcode':1});
    }
}
module.exports = {
    getUserBywxid,
    updateUserInfo,
    getOpenid,
    getUseridByOpenid,
    manageLoginForPC,
    isloginForPC,
};