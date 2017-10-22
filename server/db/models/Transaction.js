const db = require('../');
const { Sequelize } = db;

const Transaction = db.define('transaction', {
    description: Sequelize.TEXT,
    amount: Sequelize.INTEGER,
    year: Sequelize.INTEGER,
    month: Sequelize.STRING
});

module.exports = Transaction;
