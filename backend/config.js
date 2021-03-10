import dotenv from 'dotenv';

dotenv.config();
//biar bisa baca  dotenv
//dgn function ini kit aakan panggil file env
//dan kita export ke file server.js

export default {
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  PAYPAL_CLIENT_ID:process.env.PAYPAL_CLIENT_ID,
};
