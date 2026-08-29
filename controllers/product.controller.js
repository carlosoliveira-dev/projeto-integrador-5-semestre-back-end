const { Product } = require("../database/models/product");

const getProducts = async (req, res) => {
    try {
        const users = await Product.findAll();
        return res.status(200).json(users);
        } catch (error) {
        return res.status(500).json({ error: "Erro interno no servidor." });
        }
};

const getProduct = async (req, res) => {
    try {
       const { productId } = req.params;
        const product = await Product.findByPk(productId);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error: "Erro interno no servidor." });
    }
};

const addProduct = async (req, res) => {
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
};

const updateProduct = async (req, res) => {
    return res.status(400).json({
        error: 'not implemented yet'
    });
};

const deleteProduct = async (req, res) => {
    return res.status(400).json({
        error: 'not implemented yet'
    });
};

const getSuppliersByProductId = async (req, res) => {
    return res.status(400).json({
        error: 'not implemented yet'
    });
};

const linkSupplier = async (req, res) => {
    return res.status(400).json({
        error: 'not implemented yet'
    });
};

const unlinkSupplier = async (req, res) => {
    return res.status(400).json({
        error: 'not implemented yet'
    });
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getSuppliersByProductId,
  linkSupplier,
  unlinkSupplier,
};
