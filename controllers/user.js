var DataTypes = require('sequelize');
var db_seq = require('../db/mysqldb').mysql_seq;
var f_user = require('../models/user');
var s_user = f_user(db_seq,DataTypes);
var https = require('https');
var conf = require('../configure');

function getUserBywxid(req,res) {
    var user_id = req.query.user_id;
    s_user.findOne({
        where:{
            user_id:user_id
        }
    }).then(result =>{
        res.send({errorcode: '0', msg: result.dataValues});
    })

}
function updateUserInfo(req,res){
    var user_id = req.body.user_id;
    var user_name = req.body.user_name;
    var user_cardid = req.body.user_cardid;
    var user_email = req.body.user_email;
    var user_phone = req.body.user_phone;
    s_user.update({
        user_name:user_name,
        user_cardid:user_cardid,
        user_phone:user_phone,
        user_email:user_email
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
module.exports = {
    getUserBywxid,
    updateUserInfo,
    getOpenid,
};