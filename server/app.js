const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { login, register } = require('./controllers/auth');
const { test } = require('./controllers/test');
const { findAllProduct, findProductById } = require('./controllers/product');
require('dotenv').config();

const corsOptions = {
  origin: ['http://localhost:5173', 'http://chiu.hopto.org:5173'],
};

const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');

app.use(express.json());
app.use(cors(corsOptions));

// 使用者註冊 API

app.use('/api/', authRouter);
app.use('/api/products', productRouter);

app.get('/test', test);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
