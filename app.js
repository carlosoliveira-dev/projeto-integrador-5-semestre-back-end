require('dotenv').config({ quiet: true });
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const express = require('express');
const userRoutes = require('./routes/user.routes');
const profileRoutes = require('./routes/profile.routes');
const productRoutes = require('./routes/product.routes');
const supplierRoutes = require('./routes/supplier.routes');

const app = express()
app.use(express.json());

const swaggerDocument = yaml.load(fs.readFileSync('swagger.yaml', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', async (req, res) => {
  res.redirect('/api-docs');
});

app.use('/users', userRoutes);
app.use('/profile', profileRoutes);
app.use('/products', productRoutes);
app.use('/suppliers', supplierRoutes);

module.exports = {
  app
};
