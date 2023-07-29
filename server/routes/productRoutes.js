const express = require('express');
const {
  findAllProduct,
  findProductById,
} = require('../controllers/productController');

const router = express.Router();

router.get('/', findAllProduct);

router.get('/:id', findProductById);

module.exports = router;
