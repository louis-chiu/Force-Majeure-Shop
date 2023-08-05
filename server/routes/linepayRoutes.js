const express = require('express');
const { checkout, confirm } = require('../controllers/linepayController');
const router = express.Router();

router.post('/checkout', checkout);

router.get('/confirm', confirm);

module.exports = router;
