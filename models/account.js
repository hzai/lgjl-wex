var Sequelize = require('sequelize');
var sequelize = require('./sequelize');

var Account = sequelize.define('t_account', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        unique: true
    },
    mtime: {
        type: Sequelize.DATE
    },
    ctime: {
        type: Sequelize.DATE
    }
}, {
    tableName: 't_account'
});

module.exports = Account;