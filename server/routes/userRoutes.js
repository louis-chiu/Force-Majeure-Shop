const express = require('express');
const { findOrderByUserId } = require('../controllers/userController');
const router = express.Router();

router.get('/:id/order', findOrderByUserId);

module.exports = router;
