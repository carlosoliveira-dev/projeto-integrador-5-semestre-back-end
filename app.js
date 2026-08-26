const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');

// Inicializa o Express
const app = express()
app.use(express.json());

// configura o Swagger
const swaggerDocument = yaml.load(fs.readFileSync('swagger.yaml', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Configura a conexão do Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite',
  define: {
  freezeTableName: true
  },
  logging: false,
});

// Define os Modelos (Tabelas)
const Product = sequelize.define('Produto', {
  NomeProduto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CodigoBarras: DataTypes.STRING,
  QuantidadeEstoque: DataTypes.STRING,
  Categoria: DataTypes.STRING,
  DataValidade: DataTypes.DATEONLY,
  Imagem: DataTypes.STRING
});

const Supplier = sequelize.define('Fornecedor', {
  NomeEmpresa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  CNPJ: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  NomeContatoPrincipal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Endereco: DataTypes.STRING,
  Telefone: DataTypes.STRING,
  Email: DataTypes.STRING,
});

Product.belongsToMany(Supplier, { 
  through: 'ProdutoFornecedor',
  foreignKey: 'produtoId'
});

Supplier.belongsToMany(Product, { 
  through: 'ProdutoFornecedor',
  foreignKey: 'fornecedorId'
});

// Função para inicializar o banco e sincronizar as tabelas
async function initDatabase() {
  try {
    await sequelize.authenticate();
    // { alter: true } atualiza as tabelas se você mudar algo no código
    await sequelize.sync({ alter: true }); 
    console.log('Banco de dados conectado e tabelas sincronizadas!');
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    process.exit(1);
  }
}

// redireciona para o painel do Swagger
app.get('/', async (req, res) => {
  res.redirect('/api-docs');
});

// rotas de usuários
app.post('/signup', async (req, res) => {
  return res.status(400).json({
    error: 'not implemented yet'
  });
});

app.post('/login', async (req, res) => {
  return res.status(400).json({
    error: 'not implemented yet'
  });
});

app.get('/users', async (req, res) => {
  return res.status(400).json({
    error: 'not implemented yet'
  });
});

// rotas de perfil do usuário
app.get('/profile', async (req, res) => {
  return res.status(400).json({
    error: 'not implemented yet'
  });
});

app.put('/profile', async (req, res) => {
  return res.status(400).json({
    error: 'not implemented yet'
  });
});

app.delete('/profile', async (req, res) => {
  return res.status(400).json({
    error: 'not implemented yet'
  });
});

// rotas de produtos
app.get('/profile/products', async (req, res) => {
  const produtos = await Product.findAll();
  res.json(produtos);
});

app.post('/profile/products', async (req, res) => {
  try {
    const { nomeProduto, descricao } = req.body;

    if (!nomeProduto || descricao === undefined) {
      return res.status(400).json({ error: 'Nome e Descrição são obrigatórios.' });
    }

    const novoProduto = await Product.create({
      NomeProduto: nomeProduto,
      Descricao: descricao,
    });

    return res.status(201).json(novoProduto);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.put('/profile/products/:productId', async (req, res) => {
  return res.status(400).json({
    error: 'not implemented yet'
  });
});

app.delete('/profile/products/:productId', async (req, res) => {
  return res.status(400).json({
      error: 'not implemented yet'
    });
});

app.get('/profile/products/:productId', async (req, res) => {
  const { productId } = req.params;
  res.json(`get product by id: ${productId}`);
});

// rotas de fornecedores
app.get('/profile/suppliers', async (req, res) => {
  const fornecedores = await Product.findAll();
  res.json(fornecedores);
});

app.post('/profile/suppliers', async (req, res) => {
  return res.status(400).json({
      error: 'not implemented yet'
    });
});

app.get('/profile/suppliers/:supplierId', async (req, res) => {
  const { supplierId } = req.params;
  res.json(`get fornecedor by id: ${supplierId}`);
});

app.put('/profile/suppliers/:supplierId', async (req, res) => {
  return res.status(400).json({
      error: 'not implemented yet'
    });
});

app.delete('/profile/suppliers/:supplierId', async (req, res) => {
  return res.status(400).json({
      error: 'not implemented yet'
    });
});

// rotas de associação entre produtos e fornecedores
app.get('/profile/suppliers/:id/products', async (req, res) => {
  return res.status(400).json({
      error: 'not implemented yet'
    });
});

app.post('/profile/suppliers/:supplierId/products/:productId', async (req, res) => {
  return res.status(400).json({
      error: 'not implemented yet'
    });
});

app.get('/profile/products/:productId/suppliers', async (req, res) => {
  return res.status(400).json({
      error: 'not implemented yet'
    });
});

app.post('/profile/products/:productId/suppliers/:supplierId', async (req, res) => {
  return res.status(400).json({
      error: 'not implemented yet'
    });
});

app.delete('/profile/products/:productId/suppliers/:supplierId', async (req, res) => {
  return res.status(400).json({
      error: 'not implemented yet'
    });
});

app.delete('/profile/suppliers/:supplierId/products/:productId', async (req, res) => {
  return res.status(400).json({
      error: 'not implemented yet'
    });
});

module.exports = {
  app,
  initDatabase,
  sequelize,
  get Product() { return Product; },
  get Supplier() { return Supplier; }
};
