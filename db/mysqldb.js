const Sequelize = require('sequelize');
const mysql_seq = new Sequelize('bookms', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

});

module.exports = {
    mysql_seq
}