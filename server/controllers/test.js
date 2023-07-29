const { pool } = require('../db/connect');

const test = async (req, res) => {
  try {
    const client = await pool.connect();

    // 執行 SQL 查詢以檢查電子郵件是否已存在
    const result = await client.query(
      `select p.productid, psm.sizeid, pcm.colorid
      from product p
      inner join productcolormapping pcm 
      on pcm.productid = p.productid
      inner join productsizemapping psm
      on psm.productid = p.productid
      `
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error logging in', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = { test };
