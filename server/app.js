const express = require('express');
const cors = require('cors');
const app = express();

const { test } = require('./controllers/test');

const corsOptions = {
  origin: ['http://localhost:5173', 'http://chiu.hopto.org:5173'],
};

const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');
const linePayRouter = require('./routes/linepayRoutes');
const orderRouter = require('./routes/orderRoutes');
const userRouter = require('./routes/userRoutes');
const { pool } = require('./db/connect');

app.use(express.json());
app.use(cors(corsOptions));

// 使用者註冊 API

app.use('/api/', authRouter);
app.use('/api/product', productRouter);
app.use('/api/line-pay', linePayRouter);
app.use('/api/order', orderRouter);
app.use('/api/user', userRouter);
app.get('/test', test);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
