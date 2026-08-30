const { initDatabase, sequelize} = require('./database/connection');
const { Product, Supplier, User, Profile } = require('./database/models/models');
const request = require('supertest');
const { app } = require('./app');
const { profileTests } = require('./routes/profile.test-suite')

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

profileTests(app, request, Profile);

describe('POST /users/signup', () => {
  it('deve cadastrar novo usuário e devolver token jwt', async () => {
    const res = await request(app)
      .post('/users/signup')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456'
      });
    
      expect(res.body).toHaveProperty('user');
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('message');
      
      expect(res.body.message).toBe('Usuário criado com sucesso!');
      expect(res.status).toBe(201);
    });
});

describe('POST users/login', () => {
  it('deve permitir o acesso com a senha correta', async () => {
    const resSignup = await request(app)
      .post('/users/signup')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456'
      });

    const res = await request(app)
      .post('/users/login')
      .send({
        email: 'carlos@gmail.com',
        password: '123456'
      });
    
      expect(res.body.message).toBe('Login realizado com sucesso!');
      expect(res.status).toBe(200);
  });

  it('deve negar o acesso com a senha errada', async () => {
    const resSignup = await request(app)
      .post('/users/signup')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456'
      });

    const res = await request(app)
      .post('/users/login')
      .send({
        email: 'carlos@gmail.com',
        password: '123'
      });

      expect(res.body.error).toBe('E-mail ou senha inválidos.');
      expect(res.status).toBe(401);
  });
});

describe('GET /users', () => {
  it('deve retornar uma lista vazia de usuários', async () => {
  const res = await request(app)
        .get('/users')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200);
      expect(res.body).toEqual([]);
  });

  it('deve retornar uma lista com 3 usuários', async () => {
    const user1 = await request(app)
      .post('/users/signup')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123'
      });

    const user2 = await request(app)
      .post('/users/signup')
      .send({
        name: 'Maria',
        email: 'maria@gmail.com',
        password: '1234'
      });

    const user3 = await request(app)
      .post('/users/signup')
      .send({
        name: 'Joana',
        email: 'Joana@gmail.com',
        password: '12345'
      });
    
    const res = await request(app)
      .get('/users')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(3);

    // Acessando diretamente o banco de dados para validar se foi salvo de verdade
    const users = await User.findAll();
    expect(users[0].dataValues.id).toBe(1);
    expect(users[1].dataValues.id).toBe(2);
    expect(users[2].dataValues.id).toBe(3);
    expect(Array.isArray(users)).toBe(true);
    expect(users).toHaveLength(3);
  });
});

describe('GET /products', () => {
  it('deve retornar uma lista vazia de produtos', async () => {
    const res = await request(app)
      .get('/products')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);
    expect(res.body).toEqual([]);
  });

  it('deve retornar uma lista com 3 produtos', async () => {
    const p1 = await request(app)
    .post('/products')
    .send({
      name: 'smartphone',
      description: 'baixa performance'
    });

    const p2 = await request(app)
    .post('/products')
    .send({
      name: 'Notebook',
      description: 'media performance'
    });

    const p3 = await request(app)
    .post('/products')
    .send({
      name: 'Computador',
      description: 'alta performance'
    });

    const res = await request(app)
      .get('/products')
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

describe('PUT /profile', () => {
  it('deve atualizar o perfil do usuário', async () => {
    const newUser = await User.create({
      name: 'Carlos',
      email: 'carlos@gmail.com',
      password: '123'
    });

    const newProfile = await newUser.createProfile({
        bio: 'something to say',
        avatarUrl: 'http://www.avatarUrl.com',
        birthDate: '2005-01-01',
        phone: '0099999999',
        location: 'city',
        website: 'website.com'
    });
    
    const res = await request(app)
      .put('/profile')
      .send({
        userId: newUser.id,
        bio: 'bio',
        avatarUrl: 'http://www.avatar.com.br',
        birthDate: '2010-05-15',
        phone: '1188887777',
        location: 'new city',
        website: 'mywebsite.com.br'
    });

    // Acessando diretamente o banco de dados para validar se foi salvo de verdade
    const user = await User.findOne({
      include: [Profile]
    });

    expect(user.Profile.id).toBe(1);
    expect(user.Profile.userId).toBe(1);
    expect(user.Profile.bio).toBe('bio');
    expect(user.Profile.avatarUrl).toBe('http://www.avatar.com.br');
    expect(user.Profile.birthDate).toBe('2010-05-15');
    expect(user.Profile.phone).toBe('1188887777');
    expect(user.Profile.location).toBe('new city');
    expect(user.Profile.website).toBe('mywebsite.com.br');
  });
});

describe('DELETE /profile', () => {
  it('deve apagar o perfil do usuário', async () => {
    const newUser = await User.create({
      name: 'Carlos',
      email: 'carlos@gmail.com',
      password: '123'
    });

    const newProfile = await newUser.createProfile({
        bio: 'something to say',
        avatarUrl: 'http://www.avatarUrl.com',
        birthDate: '2005-01-01',
        phone: '0099999999',
        location: 'city',
        website: 'website.com'
    });

    // Acessando diretamente o banco de dados para validar se foi salvo de verdade
    const user = await User.findOne({
      include: [Profile]
    });

    expect(user.Profile.bio).toBe('something to say');

    const res = await request(app)
      .delete(`/profile/${user.id}`);
    
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Perfil deletado com sucesso!');
  });
});

describe('POST /products', () => {
  it('deve cadastrar um novo produto', async () => {
    const res = await request(app)
      .post('/products')
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


describe('GET /suppliers', () => {
  it('deve retornar uma lista vazia de fornecedores', async () => {
    const res = await request(app)
    .get('/suppliers')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200);
    expect(res.body).toEqual([]);
  });
});

