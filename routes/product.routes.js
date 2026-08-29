const express = require('express');
const router = express.Router();
const { Product } = require('../database/models/models');

router.get('/', async (req, res) => {
  const produtos = await Product.findAll();
  res.json(produtos);
});

router.post('/', async (req, res) => {
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

router.put('/:productId', async (req, res) => {
  return res.status(400).json({
    error: 'not implemented yet'
  });
});

router.delete('/:productId', async (req, res) => {
  return res.status(400).json({
      error: 'not implemented yet'
    });
});

router.get('/:productId', async (req, res) => {
  const { productId } = req.params;
  res.json(`get product by id: ${productId}`);
});

router.get('/:productId/suppliers', async (req, res) => {
  return res.status(400).json({
      error: 'not implemented yet'
    });
});

router.post('/:productId/suppliers/:supplierId', async (req, res) => {
  return res.status(400).json({
      error: 'not implemented yet'
    });
});

router.delete('/:productId/suppliers/:supplierId', async (req, res) => {
  return res.status(400).json({
      error: 'not implemented yet'
    });
});

module.exports = router;
