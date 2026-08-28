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
   const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Todos os campos (name, email, password) são obrigatórios." });
  }

  try {
    const userExists = await User.findOne({ where: { Email: email } });
    
    if (userExists) {
      return res.status(409).json({ error: "Este e-mail já está cadastrado." }); // 409 = Conflito
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = await db.one(
      'INSERT INTO users(name, email, password_hash) VALUES($1, $2, $3) RETURNING id, name, email, created_at',
      [name, email, passwordHash]
    );

    const token = jwt.sign(
      { user_id: newUser.id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        created_at: newUser.created_at
      },
      token: token
    });

  } catch (error) {
    console.error("Erro no processo de cadastro de usuário:", error);
    
    res.status(500).json({
      error: "Erro interno no servidor ao tentar criar a conta.",
      details: error.message || error
    });
  }
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
    const { name, description } = req.body;

    if (!name || description === undefined) {
      return res.status(400).json({ error: 'Nome e Descrição são obrigatórios.' });
    }

    const novoProduto = await Product.create({
      name: name,
      description: description,
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
