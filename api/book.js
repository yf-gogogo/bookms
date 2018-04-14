var DataTypes = require('sequelize');
var db_seq = require('../db/mysqldb').mysql_seq;
var f_book = require('../models/book');
var s_book = f_book(db_seq,DataTypes);

function getBookList(req,res) {
    s_book.findAll().then(result =>{
        console.log(result);
        res.send(result);
    })
}

module.exports = {
    getBookList,
};