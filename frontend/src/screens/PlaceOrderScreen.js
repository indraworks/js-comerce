import {
  getCartItems,
  getShipping,
  getPayment,
  cleanCart,
} from '../localStorage';
import CheckoutSteps from '../components/CheckoutSteps';
import { showLoading, hideLoading, ShowMessage } from '../utils';
import { createOrder } from '../api';

//fuction
const convertCartToOrder = () => {
  const orderItems = getCartItems();
  if (orderItems.length == 0) {
    document.location.hash = '/cart';
  }

  const shipping = getShipping();
  if (!shipping.address) {
    document.location.hash = '/shipping';
  }

  const payment = getPayment();
  if (!payment.paymentMethod) {
    document.location.hash = '/payment';
  }
  //calculate
  const itemsPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  return {
    orderItems,
    shipping,
    payment,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};
const PlaceOrderScreen = {
  //jadi giniutk after_render ini diisi dgn
  // buat prgoram create order ke backend data disimpan didatabase
  // nah data akan otomatis ada no id nya jika disimpam didatabase
  // stlaj disimpan maka kita akan arahkan ke location /data/order/:id

  after_render: async () => {
    document
      .getElementById('placeorder-button')
      .addEventListener('click', async () => {
        const order = convertCartToOrder(); //data2 transaksi order ditampung di order
        //kemudian dipassing di fuc createOrder yg ada di api.js
        const data = await createOrder(order); //disimpan di database

        if (data.error) {
          return ShowMessage(data.error);
        } else {
          cleanCart();
          document.location.hash = `/order/${data.data._id}`;
          //sama request dari frontend
          //console.log datanya
          console.log(data, 'data saya');
          console.log(data.data, 'data saya data');
        }
      });
  },
  render: () => {
    const {
      orderItems,
      shipping,
      payment,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = convertCartToOrder();
    return `
        
        ${CheckoutSteps.render({
          step1: true,
          step2: true,
          step3: true,
          step4: true,
        })}

        <div class='order'>
           <div class="order-info">
              <div>
                <h2> shipping</h2>
                   <div>
                   ${shipping.address},
                   ${shipping.city},
                   ${shipping.postalCode},
                   ${shipping.country}     
                   
                   </div>
                   </div>  
                 <div>
             
                <h2> Payment</h2>
                   <div>PaymentMethod:${payment.paymentMethod} </div>
                </div>
                <div>
                  <ul class="cart-list-container">
                   <li>
                    <h2>Shopping Cart</h2>
                       <div> Price</div>
                   </li>
                     ${orderItems
                       .map(
                         (item) => `
                      <li>
                      <div class="cart-name"> 
                         <img src="${item.image}" alt="${item.name}" />
                        </div>
                     <div class="cart-name">
                      <div>
                       <a href="/#/product/${item.product}" >${item.name} </a> 
                      </div>
                      <div>
                       Qty: ${item.qty}
                      </div> 
                     <div class="cart-price">$${item.price} </div>
                     
                     
                     </div>
                      </li>`
                       )
                       .join('\n')}
                  </ul>
                 </div> 
             </div>
            <div class="order-action"> 
            <ul>
                 <li>
                     <h2>OrderSummary </h2>
                 </li>
                 <li><div>Item </div><div>$${itemsPrice} </div> </li>
                 <li><div>Shipping </div><div>$${shippingPrice} </div></li>
                 <li><div> Tax</div><div>$${taxPrice} </div> </li>
                 <li class="total"> <div> Order Total</div><div> $${totalPrice}</div></li>
                  <li>
                    <button id="placeorder-button" class="primary fw">PlaceOrder </button>
                  </li>
                 </ul>
            </div>
    
         </div>

     `;
  },
};
export default PlaceOrderScreen;
