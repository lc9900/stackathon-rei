const db = require('../');
const { Sequelize } = db;

const Investment = db.define('investment', {
    invested: Sequelize.INTEGER
})

module.exports = Investment
