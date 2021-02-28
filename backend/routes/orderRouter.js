import express from 'express';
import Order from '../models/orderModel';
import { isAuth } from '../utils';
import user from '../models/userModel';
import expressAsyncHandler from 'express-async-handler';
const orderRouter = express.Router();
orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const newOrder = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id, // dataa didapat dari isAuth midlleware
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
      });
      const newOrderCreated = await newOrder.save();
      if (!newOrderCreated) {
        return res.status(401).send({
          message: 'you are not authorized',
        });
      }
      res
        .status(201)
        .send({ message: 'New Order Created', data: newOrderCreated });
      console.log(data, 'data server');
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: 'Server Eror',
      });
    }
  })
);

//order Get knpa gak bisa by id ,kenapa gak bisa kalau pakai id ?
orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const data = await Order.findById(req.params.id);
      if (data) {
        res.send(data);
      } else {
        return res.status(404).send({
          message: 'Order id Not Fund',
        });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  })
);
// orderRouter.get(
//   '/:id',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const order = await Order.findOne({ _id: req.params.id });
//     if (order) {
//       res.send(order);
//     } else {
//       res.status(404).send('Order Not Found.');
//     }
//   })
// );
export default orderRouter;
