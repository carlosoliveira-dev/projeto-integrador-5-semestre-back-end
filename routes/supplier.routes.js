const express = require('express');
const router = express.Router();
const {
  getSuppliers,
  getSupplier,
  addSupplier,
  updateSupplier,
  deleteSupplier,
  getProductsBySupplierId,
  linkProduct,
  unlinkProduct
} = require('../controllers/supplier.controller')

router.get('/', getSuppliers);
router.post('/:userId', addSupplier);
router.get('/:supplierId', getSupplier);
router.put('/:supplierId', updateSupplier);
router.delete('/:supplierId', deleteSupplier);
router.get('/:id/products', getProductsBySupplierId);
router.post('/:supplierId/products/:productId', linkProduct);
router.delete('/:supplierId/products/:productId', unlinkProduct);

module.exports = router;
