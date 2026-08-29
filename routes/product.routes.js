const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getSuppliersByProductId,
  linkSupplier,
  unlinkSupplier
} = require('../controllers/product.controller')

router.get('/', getProducts);
router.post('/', addProduct);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);
router.get('/:productId', getProduct);
router.get('/:productId/suppliers', getSuppliersByProductId);
router.post('/:productId/suppliers/:supplierId', linkSupplier);
router.delete('/:productId/suppliers/:supplierId', unlinkSupplier);

module.exports = router;
