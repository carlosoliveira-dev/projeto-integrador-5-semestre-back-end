const { initDatabase, sequelize} = require('./database/connection');
const { Product, Supplier, User, Profile } = require('./database/models/models');
const request = require('supertest');
const { app } = require('./app');
const { profileTests } = require('./routes/profile.test-suite');
const { userTests } = require('./routes/user.test-suite');
const { productTests } = require('./routes/product.test-suite');
const { supplierTests } = require('./routes/supplier.test-suite');

beforeAll(async () => {
  await initDatabase();
});

beforeEach(async () => {
  await Product.destroy({ truncate: true, cascade: true });
  await Supplier.destroy({ truncate: true, cascade: true });
  await User.destroy({ truncate: true, cascade: true });
  await Profile.destroy({ truncate: true, cascade: true });
});

afterAll(async () => {
  await sequelize.close();
});

profileTests(app, request, Profile, User);
userTests(app, request, User);
productTests(app, request, Product);
supplierTests(app, request);
