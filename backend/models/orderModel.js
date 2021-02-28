import mongoose from 'mongoose';

//relasinya adalah banyak ke banyak
// jadi ordertable brelasi dengan user table dan order table berelasi dgn product table
// user table diambil objectid user yg pesan barang dan dari oderitem di pesan id barangnya
// jadi order table adalah table penghubung atau transaksi user dan product
const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        // kita ambil nilai property dari table Product yg mana kuncitamunya adalah
        // objectId jadi relasinya sepeti n>1
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: String, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    user: {
      //merupakan kunci tamu dari table user
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    shipping: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    payment: {
      paymentMethod: { type: String, required: true },
      paymentResult: {
        orderID: String,
        payerID: String,
        paymentID: String,
      },
    },
    itemsPrice: { type: Number },
    taxPrice: { type: Number },
    shippingPrice: { type: Number },
    totalPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
    isdelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },

  { timetamps: true }
);
const orderModel = mongoose.model('Order', orderSchema);
export default orderModel;

/*
 catatan function dari timestramp adalah pada saaata kita create 
 order maka akam terupdate waktu yg sekarang ,dimissalkan diwaktu yg akan datang ada yg update
 maka otomatis akan trupadate waktunya dgn sndrinya 
*/

/*
catatan :nama model adalah orderModel,nama collection didalam database adalah
"Order"
*/
