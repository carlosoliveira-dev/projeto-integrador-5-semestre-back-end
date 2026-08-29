const express = require('express');
const router = express.Router();
const { Supplier } = require('../database/models/models');

router.get('/', async (req, res) => {
  const fornecedores = await Supplier.findAll();
  res.json(fornecedores);
});

router.post('/', async (req, res) => {
  return res.status(400).json({
      error: 'not implemented yet'
    });
});

router.get('/:supplierId', async (req, res) => {
  const { supplierId } = req.params;
  res.json(`get fornecedor by id: ${supplierId}`);
});

router.put('/:supplierId', async (req, res) => {
  return res.status(400).json({
      error: 'not implemented yet'
    });
});

router.delete('/:supplierId', async (req, res) => {
  return res.status(400).json({
      error: 'not implemented yet'
    });
});

router.get('/:id/products', async (req, res) => {
  return res.status(400).json({
      error: 'not implemented yet'
    });
});

router.post('/:supplierId/products/:productId', async (req, res) => {
  return res.status(400).json({
      error: 'not implemented yet'
    });
});

router.delete('/:supplierId/products/:productId', async (req, res) => {
  return res.status(400).json({
      error: 'not implemented yet'
    });
});

module.exports = router;
