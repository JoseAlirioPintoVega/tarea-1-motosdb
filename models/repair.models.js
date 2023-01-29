const { DataTypes } = require('sequelize');
const { db } = require('../dababase/db');

const Repair = db.define('repair', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
    enum: ['pending', 'complete', 'cancelled'],
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Repair;
