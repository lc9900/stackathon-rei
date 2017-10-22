const db = require('../');
const Sequelize = db.Sequelize;
const User = require('./User');
const Property = require('./Property');
const Transaction = require('./Transaction');

// Association
Transaction.belongsTo(Property);
Transaction.belongsTo(User);

User.hasMany(Transaction);
User.hasMany(Property);

Property.belongsTo(User);
Property.hasMany(Transaction);


// Wrapper


module.exports = {
    User, Property, Transaction
}
