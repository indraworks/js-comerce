import { parseRequestUrl, ShowMessage } from '../utils';
import { createOrder, getOrder } from '../api';

//fuction

const OrderScreen = {
  //jadi giniutk after_render ini diisi dgn
  // buat prgoram create order ke backend data disimpan didatabase
  // nah data akan otomatis ada no id nya jika disimpam didatabase
  // stlaj disimpan maka kita akan arahkan ke location /data/order/:id

  render: async () => {
    const request = parseRequestUrl();
    // const order = getOrder(request.id) kita ganti sementara
    const {
      _id,
      orderItems,
      shipping,
      deliveredAt,
      isdelivered,
      isPaid,
      paidAt,
      payment,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = await getOrder(request.id);
    return `
     <div>
       <h1>order ${_id} </h1>
        <div class='order'>
           <div class="order-info">
              <div>
                <h2> shipping</h2>
                   <div>
                      ${shipping.address},
                      ${shipping.city},
                      ${shipping.postalCode},
                      ${shipping.country}    
                   ${
                     isdelivered
                       ? `<div class="success">DeliveredAt ${deliveredAt} </div>`
                       : `<div class="error"> Not Delivered</div>`
                   }
                   </div>
                   </div>  
                 <div>
             
                <h2> Payment</h2>
                   <div>PaymentMethod:${payment.paymentMethod} </div>
                    ${
                      isPaid
                        ? `<div class="success">Paid At ${paidAt} </div>`
                        : `<div class="error"> Not Paid</div>`
                    }
                </div>
                <div>
                  <ul class="cart-list-container">
                   <li>
                    <h2>Shopping Cart</h2>
                       <div> Price</div>
                   </li>
                     ${orderItems
                       .map(
                         (item) =>
                           `<li key={item._id}>
                          <div class="cart-image">
                          <img src="${item.image}" alt="${item.name}" />
                          </div>
                          <div class="cart-name">
                            <div>
                              <a href="/#/product/${item.product}">
                                ${item.name}
                              </a>
                            </div>
                            <div>Qty: ${item.qty}</div>
                          </div>
                          <div class="cart-price">$${item.price}</div>
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
                 
                 </ul>
            </div>
    
         </div>
      </div>
     `;
  },
};
export default OrderScreen;
