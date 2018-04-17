var DataTypes = require('sequelize');
var db_seq = require('../db/mysqldb').mysql_seq;
var f_user = require('../models/user');
var s_user = f_user(db_seq,DataTypes);

function getUserBywxid(req,res) {
    s_user.findOne().then(result =>{
        res.send(result.dataValues);
    })

}
function updateUserInfo(req,res){

}
function getOpenid(req,res){
    let code = req.query.code;

}
module.exports = {
    getUserBywxid,
    updateUserInfo,
};