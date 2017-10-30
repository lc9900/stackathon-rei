const db = require('../');
const Sequelize = db.Sequelize;
const User = require('./User');
const Property = require('./Property');
const Transaction = require('./Transaction');
const Investment = require('./Investment');

// Association
Transaction.belongsTo(Property);
Transaction.belongsTo(User);

User.hasMany(Transaction);
User.hasMany(Property);

Property.belongsTo(User);
Property.hasMany(Transaction);

Investment.belongsTo(Property);
Property.hasMany(Investment);

Investment.belongsTo(User);
User.hasMany(Investment);

// Wrapper


module.exports = {
    User, Property, Transaction, Investment
}
