const { Product } = require("../database/models/product");
const { User } = require('../database/models/models');
const { Supplier } = require('../database/models/models');

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
    const { userId } = req.params;
    const { name, description } = req.body;

    if (!name || !description || !userId === undefined) {
      return res.status(400).json({ error: 'Nome, Descrição e UserId são obrigatórios.' });
    }

    const user = await User.findByPk(userId);

    const novoProduto = await user.createProduct({
      name: name,
      description: description,
    });

    return res.status(201).json(novoProduto);
  } catch (error) {
      console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
 const { productId } = req.params;
 const { userId, name, description, barCode, stockQuantity, category, expirationDate, image } = req.body;

  try {
    const user = await User.findByPk(userId,
      {include: [Product]}
    );

    if (!user) {
      return res.status(409).json({ error: "Usuário não cadastrado." });
    }
    
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(409).json({ error: "Produto não cadastrado." });
    }

    const updatedProduct = await product.update({
      name: name,
      description: description,
      barCode: barCode,
      stockQuantity: stockQuantity,
      category: category,
      expirationDate: expirationDate,
      image: image
    });

    res.status(201).json({
      message: "Produto atualizado com sucesso!",
      product: {
        id: updatedProduct.id,
        userId: updatedProduct.userId,
        name: name,
        description: description,
        barCode: barCode,
        stockQuantity: stockQuantity,
        category: category,
        expirationDate: expirationDate,
        image: image,
        created_at: updatedProduct.created_at
      }
    });

  } catch (error) {
    console.error("Erro no processo de atualização do produto:", error);
    
    res.status(500).json({
      error: "Erro interno no servidor ao tentar atualizar o produto.",
      details: error.message || error
    });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    await product.destroy();
    return res.status(200).json({ message: 'Produto excluído com sucesso!' });
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getSuppliersByProductId = async (req, res) => {
    return res.status(400).json({
        error: 'not implemented yet'
    });
};

const linkSupplier = async (req, res) => {
  try {
    const { productId, supplierId } = req.params;

    const product = await Product.findByPk(productId);
    const supplier = await Supplier.findByPk(supplierId);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }else if(!supplier) {
      return res.status(404).json({ error: 'Fornecedor não encontrado.' });
    }

    await product.addSupplier(supplier);

    return res.status(201).json({ message: 'Fornecedor associado com sucesso.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao realizar a associação.' });
  }
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
