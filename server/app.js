const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const corsOptions = {
  origin: 'http://chiu.hopto.org',
};

app.use(cors(corsOptions));

// 色彩與 HEX 色碼對照表
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

app.get('/api/clothes', async (req, res) => {
  try {
    const client = await pool.connect();

    const { keyword } = req.query; // 從 Query String 取得關鍵字

    let query = `
    SELECT
      p.ProductID AS id,
      p.Name AS name,
      p.Price AS price,
      ARRAY(
        SELECT pp.PhotoURL FROM ProductPhoto pp WHERE pp.ProductID = p.ProductID
      ) AS image,
      ARRAY(
        SELECT ps.Size FROM ProductSize ps WHERE ps.ProductID = p.ProductID
      ) AS size,
      ARRAY(
        SELECT pc.Color FROM ProductColor pc
        INNER JOIN ProductColorMapping pcm ON pc.ColorID = pcm.ColorID
        WHERE pcm.ProductID = p.ProductID
      ) AS color,
      p.Description AS description,
      p.Stock AS stock
    FROM
      Product p
    `;
    const params = [];
    if (keyword) {
      query += `WHERE p.Name ILIKE $1`; // 使用參數化查詢
      params.push(`%${keyword}%`); // 將參數值加入參數數組
    }

    const result = await client.query(query, params);
    client.release();
    const clothes = result.rows.map((cloth) => {
      const colors = cloth.color.map((colorName) => {
        const color = colorMap.find((c) => c.name === colorName);
        return {
          name: colorName,
          hex: color ? color.hex : '', // 根據需要填入顏色的 HEX 色碼，如果找不到對應的顏色，則為空字串
        };
      });

      return {
        id: cloth.id,
        name: cloth.name,
        price: cloth.price,
        image: cloth.image,
        size: cloth.size,
        color: colors,
        description: cloth.description,
        stock: cloth.stock,
      };
    });

    res.json(clothes);
  } catch (error) {
    console.error('Error executing SQL query', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/api/clothes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const client = await pool.connect();

    // 執行 SQL 查詢取得特定 clothes 資料
    const result = await client.query(
      `
      SELECT
        p.ProductID AS id,
        p.Name AS name,
        p.Price AS price,
        ARRAY(
          SELECT pp.PhotoURL FROM ProductPhoto pp WHERE pp.ProductID = p.ProductID
        ) AS image,
        ARRAY(
          SELECT ps.Size FROM ProductSize ps WHERE ps.ProductID = p.ProductID
        ) AS size,
        ARRAY(
          SELECT pc.Color FROM ProductColor pc
          INNER JOIN ProductColorMapping pcm ON pc.ColorID = pcm.ColorID
          WHERE pcm.ProductID = p.ProductID
        ) AS color,
        p.Description AS description,
        p.Stock AS stock
      FROM
        Product p
      WHERE
        p.ProductID = $1;
    `,
      [id]
    );

    client.release();

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Cloth not found' });
      return;
    }

    const cloth = result.rows[0];
    const colors = cloth.color.map((colorName) => {
      const color = colorMap.find((c) => c.name === colorName);
      return {
        name: colorName,
        hex: color ? color.hex : '', // 根據需要填入顏色的 HEX 色碼，如果找不到對應的顏色，則為空字串
      };
    });

    const clothDetails = {
      id: cloth.id,
      name: cloth.name,
      price: cloth.price,
      image: cloth.image,
      size: cloth.size,
      color: colors,
      description: cloth.description,
      stock: cloth.stock,
    };

    res.json(clothDetails);
  } catch (error) {
    console.error('Error executing SQL query', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
