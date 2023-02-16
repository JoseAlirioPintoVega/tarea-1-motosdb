const Repair = require('./repair.models');
const { User } = require('./user.model');

const initModel = () => {
  // relations
  // User.hasMany(Product, { Source: 'id', foreignKey: 'userId' });
  // Product.belongsTo(User, { source: 'id', foreignKey: 'userId' });

  /* 1User <--------> M product */
  User.hasMany(Repair);
  Repair.belongsTo(User);
};

module.exports = initModel;
