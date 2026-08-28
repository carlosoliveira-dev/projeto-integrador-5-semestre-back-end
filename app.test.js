const request = require('supertest');
const { app, initDatabase, sequelize, Product, Supplier, User, Profile} = require('./app');

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

describe('POST /signup', () => {
  it('deve cadastrar um novo usuário e devolver token jwt', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456'
      });
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('token');
  });
});

describe('GET /profile/products', () => {
  it('deve retornar uma lista vazia de produtos', async () => {
    const res = await request(app)
      .get('/profile/products')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);
    expect(res.body).toEqual([]);
  });

  it('deve retornar uma lista com 3 produtos', async () => {
    const p1 = await request(app)
    .post('/profile/products')
    .send({
      name: 'smartphone',
      description: 'baixa performance'
    });

    const p2 = await request(app)
    .post('/profile/products')
    .send({
      name: 'Notebook',
      description: 'media performance'
    });

    const p3 = await request(app)
    .post('/profile/products')
    .send({
      name: 'Computador',
      description: 'alta performance'
    });

    const res = await request(app)
      .get('/profile/products')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(3);

    // Acessando diretamente o banco de dados para validar se foi salvo de verdade
    const produtos = await Product.findAll();
    expect(Array.isArray(produtos)).toBe(true);
    expect(produtos).toHaveLength(3);
  });

});

describe('POST /profile/products', () => {
  it('deve cadastrar um novo produto', async () => {
    const res = await request(app)
      .post('/profile/products')
      .send({
        name: 'Notebook',
        description: 'baixa performance'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Notebook');
    expect(res.body.description).toBe('baixa performance');

    // Acessando diretamente o banco de dados para validar se foi salvo de verdade
    const produtoNoBanco = await Product.findByPk(1);
    expect(produtoNoBanco).not.toBeNull();
    expect(produtoNoBanco.name).toBe('Notebook');
    expect(produtoNoBanco.description).toBe('baixa performance');
  });
});


describe('GET /profile/suppliers', () => {
  it('deve retornar uma lista vazia de fornecedores', async () => {
    const res = await request(app)
    .get('/profile/suppliers')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200);
    expect(res.body).toEqual([]);
  });
});

