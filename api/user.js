var DataTypes = require('sequelize');
var db_seq = require('../db/mysqldb').mysql_seq;
var f_user = require('../models/user');
var s_user = f_user(db_seq,DataTypes);

function getUserBywxid(req,res) {
    s_user.findAll().then(result =>{
        res.send(result.dataValues);
    })

}

module.exports = {
    getUserBywxid,
};