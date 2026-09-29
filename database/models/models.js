const { User } = require('./User');
const { Profile } = require('./Profile');
const { Product } = require('./Product');
const { Supplier } = require('./Supplier');

User.hasOne(Profile, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Profile.belongsTo(User, {
  foreignKey: 'userId'
});

User.hasMany(Product, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Product.belongsTo(User, {
  foreignKey: 'userId'
});

User.hasMany(Supplier, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Supplier.belongsTo(User, {
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
