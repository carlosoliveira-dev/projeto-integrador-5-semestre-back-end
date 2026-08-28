const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

const Supplier = sequelize.define('Supplier', {
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  primaryContactName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: DataTypes.STRING,
  phone: DataTypes.STRING,
  email: DataTypes.STRING,
});

module.exports = {
    get Supplier() { return Supplier; },
}