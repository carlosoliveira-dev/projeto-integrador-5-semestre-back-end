const { initDatabase, sequelize} = require('./database/connection');
const { Product, Supplier, User, Profile } = require('./database/models/models');
const request = require('supertest');
const { app } = require('./app');
const { profileTests } = require('./routes/profile.test-suite');
const { userTests } = require('./routes/user.test-suite');
const { productTests } = require('./routes/product.test-suite');
const { supplierTests } = require('./routes/supplier.test-suite');

beforeAll(async () => {
  // Inicializa o banco de dados (conecta e sincroniza as tabelas)
  await initDatabase();
});

// Limpa a tabela de produtos antes de cada teste para isolar os cenários
beforeEach(async () => {
  await Product.destroy({ truncate: true, cascade: true });
  await Supplier.destroy({ truncate: true, cascade: true });
  await User.destroy({ truncate: true, cascade: true });
  await Profile.destroy({ truncate: true, cascade: true });
});

// Roda após todos os testes terminarem para fechar a conexão com o banco
afterAll(async () => {
  await sequelize.close();
});

profileTests(app, request, Profile, User);
userTests(app, request, User);
productTests(app, request, Product);
supplierTests(app, request);
