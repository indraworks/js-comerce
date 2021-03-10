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
//orderRouter utk put /edit payment
orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (order) {
        (order.isPaid = true),
          (order.paidAt = Date.now),
          (order.payment.paymentResult = {
            payerID: req.body.payerID,
            paymentID: req.body.paymentID,
            orderID: req.body.orderID,
          });
      }
      const updatedOrder = await order.save();
      res.send({ message: 'Order Update', order: updatedOrder });
      if (!order) {
        res.status(404).json({
          message: 'order not found!',
        });
      }
    } catch (err) {
      console.log(err.message);
      return { error: err.message };
    }
  })
);

//order ruter untuk melihat smua list order dari user yg login saat ini

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const mineOrders = Order.find({ user: req.user._id });
    res.send(mineOrders);
  })
);

export default orderRouter;

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
//https://developer.paypal.com/demo/checkout/#/pattern/server
