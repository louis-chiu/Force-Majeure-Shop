const axios = require('axios');
require('dotenv').config();
const { pool } = require('../db/connect');

const findOrderByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `SELECT 
    o.orderId,
    o.orderDate,
    o.paymentStatus,
    oi.orderItemId,
    oi.quantity,
    p.productId,
    p.name,
    p.price,
    pc.color,
    ps.size,
    ARRAY(
      SELECT pp.PhotoURL FROM ProductPhoto pp WHERE pp.ProductID = p.ProductID
    ) AS image
  FROM "Order" o
  INNER JOIN "User" u ON u.userId = o.userId
  INNER JOIN OrderItem oi ON oi.orderId = o.orderId
  INNER JOIN Product p ON p.productId = oi.productId
  INNER JOIN ProductColor pc ON pc.colorId = oi.colorId
  INNER JOIN ProductSize ps ON ps.sizeId = oi.sizeId
  INNER JOIN ProductColorMapping pcm ON pcm.productId = p.productId AND pcm.colorId = pc.colorId
  INNER JOIN ProductSizeMapping psm ON psm.productId = p.productId AND psm.sizeId = ps.sizeId
  WHERE u.userId = $1
  `;
    const client = await pool.connect();

    // 執行 SQL 查詢取得特定 products 資料
    if (!id) res.status(400).json({ error: 'Bad request' });
    const result = await client.query(sql, [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    const orders = {};
    result.rows.forEach(
      ({
        orderid,
        orderdate,
        orderitemid,
        paymentstatus,
        quantity,
        productid,
        image,
        name,
        price,
        color,
        size,
      }) => {
        const orderDate = new Date(orderdate).toLocaleDateString();
        if (!orders[orderid]) {
          orders[orderid] = {
            orderId: orderid,
            orderDate,
            orderStatus: paymentstatus,
            orderItems: [],
            totalPrice: 0,
          };
        }
        const totalPrice = quantity * price; // 計算 totalPrice
        orders[orderid].totalPrice += totalPrice;
        orders[orderid].orderItems.push({
          orderItemId: orderitemid,
          productId: productid,
          image: image[0],
          name,
          color: mappingToHex(color),
          size,
          quantity,
          price,
        });
      }
    );

    const formattedOrders = Object.values(orders);
    const totalPrice = formattedOrders.reduce(
      (accumulator, current) => (accumulator += current.totalPrice),
      0
    );
    res.send({ orders: formattedOrders, totalPrice });
  } catch (error) {
    console.error('Error executing SQL query', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
module.exports = { findOrderByUserId };

function mappingToHex(colorName) {
  const colorMap = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Gray', hex: '#808080' },
    { name: 'Red', hex: '#FF0000' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Green', hex: '#008000' },
    { name: 'Pink', hex: '#FFC0CB' },
    { name: 'Orange', hex: '#FFA500' },
    { name: 'Purple', hex: '#800080' },
    { name: 'Brown', hex: '#A52A2A' },
    { name: 'Light Blue', hex: '#ADD8E6' },
  ];

  return colorMap.find((color) => {
    return color.name === colorName;
  }).hex;
}
