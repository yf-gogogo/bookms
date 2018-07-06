const Sequelize = require('sequelize');
const conf = require('../configure')
const mysql_seq = new Sequelize(
    conf.db.database,
    conf.db.username,
    conf.db.password, {
    host: conf.db.host,
    dialect: conf.db.dialect,
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    timezone: '+08:00' //东八时区
});

module.exports = {
    mysql_seq
}