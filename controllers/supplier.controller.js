const { Supplier } = require('../database/models/models');

const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll();
        return res.status(200).json(suppliers);
    } catch (error) {
        return res.status(500).json({ error: "Erro interno no servidor." });
    }
};

const getSupplier = async (req, res) => {
    try {
        const { supplierId } = req.params;
        const supplier = await Supplier.findByPk(supplierId);
        return res.status(200).json(supplier);
    } catch (error) {
        return res.status(500).json({ error: "Erro interno no servidor." });
    }
};

const addSupplier = async (req, res) => {
    return res.status(400).json({
        error: 'not implemented yet'
    });
};

const updateSupplier = async (req, res) => {
    return res.status(400).json({
        error: 'not implemented yet'
    });
};

const deleteSupplier = async (req, res) => {
    return res.status(400).json({
        error: 'not implemented yet'
    });
}

const getProductsBySupplierId = async (req, res) => {
    return res.status(400).json({
        error: 'not implemented yet'
    });
};

const linkProduct = async (req, res) => {
    return res.status(400).json({
        error: 'not implemented yet'
    });
}

const unlinkProduct = async (req, res) => {
    return res.status(400).json({
        error: 'not implemented yet'
    });
}

module.exports = {
  getSuppliers,
  getSupplier,
  addSupplier,
  updateSupplier,
  deleteSupplier,
  getProductsBySupplierId,
  linkProduct,
  unlinkProduct
};
