const { DataTypes } = require('sequelize');
const { sequelize } = require('./connection');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Profile = sequelize.define('Profile', {
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  avatarUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
  }
});

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

User.hasOne(Profile, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Profile.belongsTo(User, {
  foreignKey: 'userId'
});

Product.belongsToMany(Supplier, { 
  through: 'ProductSupplier',
  foreignKey: 'productId'
});

Supplier.belongsToMany(Product, { 
  through: 'ProductSupplier',
  foreignKey: 'supplierId'
});

module.exports = {
  get Product() { return Product; },
  get Supplier() { return Supplier; },
  get User() { return User; },
  get Profile() { return Profile; },
};
