const express = require('express');
const {
  createOrder,
  findOrderById,
} = require('../controllers/orderController');

const router = express.Router();

router.post('/', createOrder);
router.get('/:id', findOrderById);
module.exports = router;
