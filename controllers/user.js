var DataTypes = require('sequelize');
var db_seq = require('../db/mysqldb').mysql_seq;
var f_user = require('../models/user');
var s_user = f_user(db_seq,DataTypes);
var https = require('https');
var conf = require('../configure');

function getUserBywxid(req,res) {
    s_user.findOne().then(result =>{
        res.send(result.dataValues);
    })

}
function updateUserInfo(req,res){

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
            }).then(function (){
                res.json(content);
            })
        });
    }).on('error', function (e) {
        console.log(" error: " + e.message);
    }).end();
}
module.exports = {
    getUserBywxid,
    updateUserInfo,
    getOpenid,
};