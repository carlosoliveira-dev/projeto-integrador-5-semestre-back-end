require('dotenv').config({ quiet: true });
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const express = require('express');
const userRoutes = require('./routes/user.routes');
const profileRoutes = require('./routes/profile.routes');
const productRoutes = require('./routes/product.routes');
const supplierRoutes = require('./routes/supplier.routes');

// Inicializa o Express
const app = express()
app.use(express.json());

// configura o Swagger
const swaggerDocument = yaml.load(fs.readFileSync('swagger.yaml', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// redireciona para o painel do Swagger
app.get('/', async (req, res) => {
  res.redirect('/api-docs');
});

// Associa o prefixo de URL ao arquivo de rotas correspondente
app.use('/users', userRoutes);
app.use('/profile', profileRoutes);
app.use('/products', productRoutes);
app.use('/suppliers', supplierRoutes);

module.exports = {
  app
};
