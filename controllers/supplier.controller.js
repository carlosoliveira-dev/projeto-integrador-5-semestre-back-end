const { Supplier, User } = require('../database/models/models');

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
 try {
    const { userId } = req.params;
    const { companyName, cnpj, primaryContactName, address, phone, email } = req.body;

    if (!companyName || !cnpj || !primaryContactName === undefined) {
      return res.status(400).json({ error: 'companyName, cnpj e primaryContactName são obrigatórios.' });
    }

    const user = await User.findByPk(userId);

    const newSupplier = await user.createSupplier({
        companyName: companyName,
        cnpj: cnpj,
        primaryContactName: primaryContactName,
        address: address,
        phone: phone,
        email: email
    });

    return res.status(201).json(newSupplier);
  } catch (error) {
      console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
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
