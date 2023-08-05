const axios = require('axios');
require('dotenv').config();
const { pool } = require('../db/connect');

const createOrder = async (req, res) => {
  try {
    const order = req.body;
    const { userId, orderDate, paymentStatus, orderItems } = order;
    const client = await pool.connect();

    const orderInsertSql = `
      INSERT INTO "Order" (userId, orderDate, paymentStatus)
      VALUES ($1, $2, $3)
      RETURNING orderId;
    `;
    const orderInsertValues = [userId, orderDate, paymentStatus];
    const orderInsertResult = await client.query(
      orderInsertSql,
      orderInsertValues
    );
    const orderId = orderInsertResult.rows[0].orderid;

    for (const orderItem of orderItems) {
      const { productId, quantity, color, size } = orderItem;

      // 獲取 colorId 和 sizeId
      const colorIdSql = `SELECT colorId FROM ProductColor WHERE color = $1`;
      const sizeIdSql = `SELECT sizeId FROM ProductSize WHERE size = $1`;
      const colorIdResult = await client.query(colorIdSql, [color]);
      const sizeIdResult = await client.query(sizeIdSql, [size]);
      const colorId = colorIdResult.rows[0].colorid;
      const sizeId = sizeIdResult.rows[0].sizeid;

      // 插入 OrderItem
      const orderItemInsertSql = `
        INSERT INTO OrderItem (orderId, productId, quantity, colorId, sizeId)
        VALUES ($1, $2, $3, $4, $5);
      `;
      const orderItemInsertValues = [
        orderId,
        productId,
        quantity,
        colorId,
        sizeId,
      ];
      await client.query(orderItemInsertSql, orderItemInsertValues);
    }

    client.release();

    res.status(201).json({ message: 'Order created successfully', orderId });

    /*
{
  "amount": 5990,
  "currency": "TWD",
  "orderId": "2",
  "packages": [
                {
                  "id": "1",
                  "amount": 5990,
                  "products": [
                    {
                      "id": "1",
                      "name": "Big Logo T-shirt",
                      "imageUrl": "https://force-majeure.s3.ap-northeast-1.amazonaws.com/clothes/Big-logo-T-shirts.jpg",
                      "quantity": 10,
                      "price": 599
                    }
                  ]
                }
              ] 
} */
  } catch (error) {
    console.error('Error creating order', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

const findOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await pool.connect();
    const sql = `
    SELECT oi.*, p.* ,
    ARRAY(SELECT photoUrl FROM productPhoto pp WHERE pp.productId = p.productId)AS image
    FROM "Order" o 
    INNER JOIN OrderItem oi ON oi.orderId = o.orderId
    INNER JOIN Product p ON p.productId = oi.productId
    
    WHERE o.orderId = $1
    `;
    const result = await client.query(sql, [id]);
    res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error...');
  }
};
module.exports = { createOrder, findOrderById };
