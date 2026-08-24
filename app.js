const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');

// Inicializa o Express
const app = express()
app.use(express.json());

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

app.get('/', async (req, res) => {
  res.send('Projeto Integrador 5º semestre(Gran Faculdade)!');
});

// rotas de produtos
app.get('/produto', async (req, res) => {
  const produtos = await Product.findAll();
  res.send(produtos);
});

app.get('/produto/:id', async (req, res) => {
  const { id } = req.params;
  res.send(`get produto by id: ${id}`);
});

app.get('/produto/:id/fornecedores', async (req, res) => {
  res.send('lista de fornecedores desse produto');
});

app.post('/produto', async (req, res) => {
  try {
    const { nomeProduto, descricao } = req.body;

    if (!nomeProduto || descricao === undefined) {
      return res.status(400).json({ error: 'Nome e Descrição são obrigatórios.' });
    }

    const novoProduto = await Product.create({
      NomeProduto: nomeProduto,
      Descricao: descricao,
    });

    // Retorna o status 201 (Created) e o produto recém-criado em JSON
    return res.status(201).json(novoProduto);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.delete('/produto/:id/fornecedor/:id', async (req, res) => {
  const { productId, supplierId } = req.params;
  res.send(`desvinculando produto: ${productId} do fornecedor: ${supplierId}`)
});

// rotas de fornecedores
app.get('/fornecedor', async (req, res) => {
  const fornecedores = await Product.findAll();
  res.send(fornecedores);
});

app.get('/fornecedor/:id', async (req, res) => {
  const { id } = req.params;
  res.send(`get fornecedor by id: ${id}`);
});

app.get('/fornecedor/:id/produtos', async (req, res) => {
  res.send('lista de produtos que esse fornecedor tem');
});

// app.post('/fornecedor', async (req, res) => {

// });

app.delete('/fornecedor/:id/produto/:id', async (req, res) => {
  const { supplierId, productId } = req.params;
  res.send(`desvinculando fornecedor: ${supplierId} do produto: ${productId}`)
});

module.exports = {
  app,
  initDatabase,
  sequelize,
  get Product() { return Product; },
  get Supplier() { return Supplier; }
};
