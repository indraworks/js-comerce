//ini dibawah ini es5 statement kit aganti dgn es6 mirip frontend
// const express = require('express');
// const cors = require('cors');
// const data = require('./data.js');
// const app = express();
import express from 'express';
import cors from 'cors';
import data from './data.js';
import mongoose from 'mongoose';
import config from './config'; //kita import supaya bisa baca isi .env
import userRouter from './routes/userRouter.js';
import bodyParser from 'body-parser';
import orderRouter from './routes/orderRouter.js';

const app = express();

const port = 5500;
app.use(cors());
app.use(bodyParser.json());
//kalau kit alangsung handel pakai app.get/post/put/delete tapi kalau kita taruh dilink
//dan didlm sbuah file dlm hal ini di dir sndir dan file pnenganan end point di taruh didirectori
//maka kit agunakan app.use(nama_endPointya,nama_function_handle endpoint tsb)

app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.get('/api/paypal/clientId', (req, res) => {
  res.send({ clientId: config.PAYPAL_CLIENT_ID });
});

app.get('/api/products', (req, res) => {
  res.send(data.products);
});
//buat route utk get url yg diminta api.js frontEnd
app.get('/api/products/:id', (req, res) => {
  // res.send(data.products.find(product=>product._id ===req.params.id))
  const product = data.products.find(
    (product) => product._id === req.params.id
  );
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({
      message: 'Product id not found! ',
    });
  }
});

//conect mongoose
mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch((err) => {
    console.log(err.reason);
  });
//chek utk eror validation yg nanganin ini dirouter adah expressAsyncHandler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status);
  res.send({ message: err.message });
});

app.listen(port, () => console.log(`we runing on server ${port}`));

//catatan :data.products adalah nama filenya  boleh nama lainnya
//ini nanti yg sbgai nama file yg diterima oleh frontend di api.js mllaui func getProduct
//dlm hal ini :return response.data;
//stlahnya di tangkap di productScreen

//// REQUEST PARAMS .ID  //////
/*
jadi req.params.id adalah nilai id yg diketikan oleh user dari browser
dari sisi kita server kita aau di fornt end kita :
/products/:id   
tanda ":" pada id ,adalah nilai id diinputkan user dari browser
nah dari sisi orang yg isi di browser utk kita tangkap nilai yg diinputkan 
oleh user
req.params.id ==>artinya user sedang request kekita parameter id yg nilainya= "...."



*/
