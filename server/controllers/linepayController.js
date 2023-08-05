const { HmacSHA256 } = require('crypto-js');
const Base64 = require('crypto-js/enc-base64');
const { pool } = require('../db/connect');

const axios = require('axios');
const {
  LINEPAY_CHANNEL_ID,
  LINEPAY_RETURN_HOST,
  LINEPAY_SITE,
  LINEPAY_VERSION,
  LINEPAY_CHANNEL_SECRET_KEY,
  LINEPAY_RETURN_CONFIRM_URL,
  LINEPAY_RETURN_CANCEL_URL,
} = process.env;

const checkout = async (req, res) => {
  const order = req.body;

  try {
    const linePayBody = createLinePayBody(order);
    // console.log(linePayBody);

    const uri = '/payments/request';
    const headers = createSignature(uri, linePayBody);

    // 準備送給 line pay => linePayBody, signature
    const url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`;
    // console.log(url);
    const linePayRes = await axios.post(url, linePayBody, { headers });

    if (linePayRes?.data?.returnCode === '0000') {
      // console.log(linePayRes?.data?.returnMessage);

      res.status(200).send({ url: linePayRes?.data?.info.paymentUrl.web });
    } else {
      res.status(400).send({ ...linePayRes?.data });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal server error.' });
  }
};

const confirm = async (req, res) => {
  const { transactionId, orderId } = req.query;
  // console.log(transactionId, orderId);
  const { data: order } = await axios.get(
    `http://localhost:3000/api/order/${orderId}`
  );
  const totalPrice = order?.reduce(
    (acc, current) =>
      (acc += parseInt(current.price) * parseInt(current.quantity)),
    0
  );

  // console.log(order);
  try {
    const uri = `/payments/${transactionId}/confirm`;
    const linePayBody = {
      amount: totalPrice,
      currency: 'TWD',
    };

    // CreateSignature 建立加密內容
    const headers = createSignature(uri, linePayBody);

    // API 位址
    const url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`;
    const linePayRes = await axios.post(url, linePayBody, { headers });

    // 請求成功...
    if (linePayRes?.data?.returnCode === '0000') {
      try {
        const client = await pool.connect();
        await client.query(
          `UPDATE "Order" SET paymentStatus = 'Paid' WHERE orderId = $1`,
          [orderId]
        );
        res.redirect(`http://localhost:5173/payment-success`);
        client.release();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const client = await pool.connect();
        await client.query(
          `UPDATE "Order"  SET paymentStatus = 'Failed' WHERE orderId = $1`,
          [orderId]
        );
        res.status(400).send({
          message: linePayRes,
        });
        client.release();
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
    // 各種運行錯誤的狀態：可進行任何的錯誤處理
    res.end();
  }
};
module.exports = { checkout, confirm };

function createLinePayBody(order) {
  return {
    ...order,
    currency: 'TWD',
    redirectUrls: {
      confirmUrl: `${LINEPAY_RETURN_HOST}${LINEPAY_RETURN_CONFIRM_URL}`,
      cancelUrl: `${LINEPAY_RETURN_HOST}${LINEPAY_RETURN_CANCEL_URL}`,
    },
  };
}

function createSignature(uri, linePayBody) {
  const nonce = new Date().getTime();
  const encrypt = HmacSHA256(
    `${LINEPAY_CHANNEL_SECRET_KEY}/${LINEPAY_VERSION}${uri}${JSON.stringify(
      linePayBody
    )}${nonce}`,
    LINEPAY_CHANNEL_SECRET_KEY
  );
  const signature = Base64.stringify(encrypt);

  const headers = {
    'X-LINE-ChannelId': LINEPAY_CHANNEL_ID,
    'Content-Type': 'application/json',
    'X-LINE-Authorization-Nonce': nonce,
    'X-LINE-Authorization': signature,
  };
  return headers;
}
