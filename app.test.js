const { initDatabase, sequelize} = require('./database/connection');
const { Product, Supplier, User, Profile } = require('./database/models/models');
const request = require('supertest');
const { app } = require('./app');
const { profileTests } = require('./routes/profile-tests/profile.test-suite');
const { userTests } = require('./routes/user-tests/user.test-suite');
const { productTests } = require('./routes/product-tests/product.test-suite');
const { supplierTests } = require('./routes/supplier-tests/supplier.test-suite');

describe('CORS', () => {
  it('deve permitir preflight do frontend para autenticação', async () => {
    const res = await request(app)
      .options('/users/login')
      .set('Origin', 'http://localhost:3000')
      .set('Access-Control-Request-Method', 'POST')
      .set('Access-Control-Request-Headers', 'content-type');

    expect(res.status).toBe(204);
    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:3000');
    expect(res.headers['access-control-allow-methods']).toContain('POST');
    expect(res.headers['access-control-allow-headers'].toLowerCase()).toContain('content-type');
  });

  it('deve incluir CORS nas respostas da API ao frontend', async () => {
    const res = await request(app)
      .post('/users/login')
      .set('Origin', 'http://localhost:3000')
      .send({ email: 'missing@example.com', password: 'invalid' });

    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:3000');
  });
});

beforeAll(async () => {
  await initDatabase();
});

beforeEach(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

profileTests(app, request, Profile, User);
userTests(app, request, User);
productTests(app, request, Product, User);
supplierTests(app, request);
