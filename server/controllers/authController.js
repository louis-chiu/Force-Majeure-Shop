const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../db/connect');
require('dotenv').config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 檢查使用者是否存在於資料庫
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 比對輸入的密碼是否正確
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = createJwtToken(user.id);
    res.cookie('jwt', token, {
      // httpOnly: true,
      // secure: true, // 只在 HTTPS 下使用
      maxAge: 60 * 60 * 1000, // 過期時間為 1 小時
      path: '/',
    });

    // 返回 JWT
    res.json({ ...user });
  } catch (error) {
    console.error('Error logging in', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, address } = req.body;

    const isEmailDuplicate = await checkEmailDuplicate(email);
    if (isEmailDuplicate) {
      return res.status(409).json({ error: 'Email is already registered' });
    }

    // 將密碼加密
    const hashedPassword = await bcrypt.hash(password, 10);

    // 儲存使用者資料到資料庫
    const client = await pool.connect();
    await client.query(
      'INSERT INTO "User" (firstName, lastName, email, password, address) VALUES ($1, $2, $3, $4, $5)',
      [firstName, lastName, email, hashedPassword, address]
    );
    client.release();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = { login, register };

// 建立 JWT
function createJwtToken(userId) {
  const secretKey = process.env.JWT_SECRET_KEY;
  const payload = { userId };
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
}

// 檢查電子郵件是否重複
async function checkEmailDuplicate(email) {
  const client = await pool.connect();

  try {
    // 執行 SQL 查詢以檢查電子郵件是否已存在
    const result = await client.query(
      'SELECT COUNT(*) FROM "User" WHERE email = $1',
      [email]
    );

    // 檢查查詢結果是否有重複電子郵件
    const count = result.rows[0].count;
    return count > 0;
  } catch (error) {
    console.error('Error checking email duplicate', error);
    throw error;
  } finally {
    client.release();
  }
}
async function findUserByEmail(email) {
  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM "User" WHERE email = $1';
    const values = [email];
    const result = await client.query(query, values);
    client.release();

    if (result.rows.length > 0) {
      const user = result.rows[0];
      return user;
    }
    return null;
  } catch (error) {
    console.error('Error finding user by email', error);
    throw error;
  }
}
