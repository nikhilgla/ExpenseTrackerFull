const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Users = sequelize.define('userstable', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ispremium: Sequelize.BOOLEAN,
  totalAmount:Sequelize.DOUBLE
});

module.exports = Users;
