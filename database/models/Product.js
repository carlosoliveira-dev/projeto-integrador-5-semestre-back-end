const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  barCode: DataTypes.STRING,
  stockQuantity: DataTypes.STRING,
  category: DataTypes.STRING,
  expirationDate: DataTypes.DATEONLY,
  image: DataTypes.STRING
});

module.exports = {
    get Product() { return Product; },
}