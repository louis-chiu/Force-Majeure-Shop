const { pool } = require('../db/connect');
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
const findProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await pool.connect();

    // 執行 SQL 查詢取得特定 products 資料
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
	  SELECT ps.Size FROM ProductSize ps 
	  INNER JOIN ProductSizeMapping psm ON ps.SizeID = psm.SizeID
	  WHERE psm.ProductID = p.ProductID
	) AS size,
	ARRAY(
	  SELECT pc.Color FROM ProductColor pc
	  INNER JOIN ProductColorMapping pcm ON pc.ColorID = pcm.ColorID
	  WHERE pcm.ProductID = p.ProductID
	) AS color,
	p.Description AS description,
	ROUND(
		   (SELECT AVG(rating) FROM Comment c 
		   INNER JOIN OrderItem oi ON c.orderitemid = oi.orderitemid
		   WHERE oi.ProductID = p.ProductID),
		   1
	   ) AS average_rating,
  	(
		SELECT json_object_agg(CONCAT(pc.color, ', ', ps.size), psk.stock) AS stock 
		FROM productstock  psk
		INNER JOIN productsize ps ON ps.sizeid = psk.sizeid
		INNER JOIN productcolor pc ON pc.colorid = psk.colorid
    WHERE psk.productid = p.productid)
  FROM
	Product p
  WHERE
	p.ProductID = $1;
    `,
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    const product = result.rows[0];

    const colors = product.color.map((colorName) => {
      const color = colorMap.find((c) => c.name === colorName);
      return {
        name: colorName,
        hex: color ? color.hex : '', // 根據需要填入顏色的 HEX 色碼，如果找不到對應的顏色，則為空字串
      };
    });

    const productDetails = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.size,
      color: colors,
      description: product.description,
      stock: product.stock,
      rating: product.average_rating,
    };

    const commentQuery = await client.query(
      `
      SELECT
        c.commentId,
        c.content,
        c.rating,
        u.firstName,
        u.lastName,
        oi.orderItemId,
        ps.size,
        pc.color,
        oi.quantity
      FROM
        Comment c
      INNER JOIN OrderItem oi ON c.orderItemId = oi.orderItemId
      INNER JOIN ProductColor pc ON pc.colorId = oi.colorId
      INNER JOIN ProductSize ps ON ps.sizeId = oi.sizeId
      INNER JOIN "User" u ON u.userId = c.userId
      WHERE
        oi.productId = $1;
    `,
      [id]
    );

    client.release();

    const comments = commentQuery.rows.map((comment) => ({
      commentId: comment.commentid,
      name: `${comment.firstname} ${comment.lastname}`,
      content: comment.content,
      rating: comment.rating,
      orderItem: {
        orderItemId: comment.orderitemid,
        size: comment.size,
        color: colorMap.find((color) => color.name === comment.color),
        amount: comment.quantity,
      },
    }));

    productDetails.comments = comments;
    res.json(productDetails);
  } catch (error) {
    console.error('Error executing SQL query', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

const findAllProduct = async (req, res) => {
  try {
    const client = await pool.connect();

    const { keyword, sortBy, ascOrDesc } = req.query; // 從 Query String 取得關鍵字
    // console.log(req.url);
    let query = `
    SELECT
      p.ProductID AS id,
      p.Name AS name,
      p.Price AS price,
      ARRAY(
        SELECT pp.PhotoURL FROM ProductPhoto pp WHERE pp.ProductID = p.ProductID
      ) AS image,
      ARRAY(
        SELECT ps.Size FROM ProductSize ps 
        INNER JOIN ProductSizeMapping psm ON ps.SizeID = psm.SizeID
        WHERE psm.ProductID = p.ProductID
      ) AS size,
      ARRAY(
        SELECT pc.Color FROM ProductColor pc
        INNER JOIN ProductColorMapping pcm ON pc.ColorID = pcm.ColorID
        WHERE pcm.ProductID = p.ProductID
      ) AS color,
      p.Description AS description,
      -- p.Stock AS stock,
      (
        SELECT ROUND(AVG(rating), 1)
        FROM Comment c 
        INNER JOIN OrderItem oi ON c.orderitemid = oi.orderitemid
        WHERE oi.ProductID = p.ProductID
    ) AS average_rating
    FROM
      Product p
    `;
    const params = [];
    if (keyword) {
      query += `WHERE p.Name ILIKE $1`; // 使用參數化查詢
      params.push(`%${keyword}%`); // 將參數值加入參數數組
    }
    // console.log(sortBy);
    if (sortBy) {
      query += `ORDER BY p.${sortBy}`;
      query += ` ${ascOrDesc}`;
    }
    // console.log(query);

    const result = await client.query(query, params);
    client.release();
    const products = result.rows.map((product) => {
      const colors = product.color.map((colorName) => {
        const color = colorMap.find((c) => c.name === colorName);
        return {
          name: colorName,
          hex: color ? color.hex : '', // 根據需要填入顏色的 HEX 色碼，如果找不到對應的顏色，則為空字串
        };
      });

      return {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: product.size,
        color: colors,
        description: product.description,
        stock: product.stock,
        rating: product.average_rating,
      };
    });

    res.json(products);
  } catch (error) {
    console.error('Error executing SQL query', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = { findProductById, findAllProduct };
