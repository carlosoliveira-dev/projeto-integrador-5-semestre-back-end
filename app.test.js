const request = require('supertest');
const { app, initDatabase, sequelize, Product, Supplier } = require('./app');

beforeAll(async () => {
  // Inicializa o banco de dados (conecta e sincroniza as tabelas)
  await initDatabase();
});

// Limpa a tabela de produtos antes de cada teste para isolar os cenários
beforeEach(async () => {
  await Product.destroy({ truncate: true, cascade: true });
  await Supplier.destroy({ truncate: true, cascade: true });
});

// Roda após todos os testes terminarem para fechar a conexão com o banco
afterAll(async () => {
  await sequelize.close();
});

describe('API de Produtos', () => {

  describe('GET /produto', () => {
    it('deve retornar uma lista vazia de produtos', async () => {
      const res = await request(app)
        .get('/produto')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200);
      expect(res.body).toEqual([]);
    });

    it('deve retornar uma lista com 3 produtos', async () => {
      const p1 = await request(app)
      .post('/produto')
      .send({
        nomeProduto: 'smartphone',
        descricao: 'baixa performance'
      });

      const p2 = await request(app)
      .post('/produto')
      .send({
        nomeProduto: 'Notebook',
        descricao: 'media performance'
      });

      const p3 = await request(app)
      .post('/produto')
      .send({
        nomeProduto: 'Computador',
        descricao: 'alta performance'
      });

      const res = await request(app)
        .get('/produto')
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

  it('deve cadastrar um novo produto', async () => {
    const res = await request(app)
      .post('/produto')
      .send({
        nomeProduto: 'Notebook',
        descricao: 'baixa performance'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.NomeProduto).toBe('Notebook');
    expect(res.body.Descricao).toBe('baixa performance');

    // Acessando diretamente o banco de dados para validar se foi salvo de verdade
    const produtoNoBanco = await Product.findByPk(1);
    expect(produtoNoBanco).not.toBeNull();
    expect(produtoNoBanco.NomeProduto).toBe('Notebook');
    expect(produtoNoBanco.Descricao).toBe('baixa performance');
  });

});

describe('API de Fornecedores', () => {
  describe('GET /fornecedor', () => {
    it('deve retornar uma lista vazia de fornecedores', async () => {
      const res = await request(app)
      .get('/fornecedor')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);
      expect(res.body).toEqual([]);
    });
  });
});
