import {
  parseRequestUrl,
  rerender,
  showLoading,
  hideLoading,
  ShowMessage,
} from '../utils';
import { createOrder, getOrder, getPayPalClientId, payOrder } from '../api';

//fuction
const addPaypalSdk = async (totalPrice) => {
  const clientID = await getPayPalClientId();
  showLoading();
  if (!window.paypal) {
    //if not created makabuat order baru
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypalobjects.com/api/checkout.js`;
    script.async = true;
    script.onload = () => handlePayment(clientID, totalPrice);
    document.body.appendChild(script);
  } else {
    handlePayment(clientID, totalPrice);
  }
};
//handlePayment berisi sandbox dari paypal yg di render di frontend

const handlePayment = (clientID, totalPrice) => {
  window.paypal.Button.render(
    {
      //configure environment
      env: 'sandbox',
      client: {
        sandbox: clientID,
        production: '',
      },
      // cuztomise button optional
      locale: 'en_US',
      style: {
        size: 'responsive',
        color: 'gold',
        shape: 'pill',
      },
      //enable Pay checkout  flow(optional)
      commit: true,
      //setup payment berisi data  dan jumlah 
      payment(data, actions) {
        //merupakan payment record
        return actions.payment.create({
          transactions: [ //create payment record ,
            { //isinya transaction dalam bentuk array
              amount: {
                total: totalPrice,
                currency: 'USD', //total pilihannya bisa  pakai mata uang apa 
                //saja
              },
            },
          ],
        });
      },
      //define after successful transaction or failure transaction
      //setelah success transction 
      onAuthorize(data, actions) {
        return actions.payment.execute().then(async () => {
          //success
          showLoading();
          // call pay order
          //ini function utk tunjukan sucessful & hisotrynya

          await payOrder( // di passing di api 
            //pasing 2 yaitu id dari prserrequesUrl dan {isidata orderId,payerId,paymetID}
            parseRequestUrl().id,
            {
              orderID: data.orderId,
              payerID: data.payerID,
              paymentID: data.paymentID,
            }
          );
          hideLoading();
          //rerender ssudah sucessful payment
          ShowMessage('Payment already successful', () => {
            rerender(OrderScreen);//update state payment
          });
        });
      },
    },
    '#paypal-button' //show button paypalnya render di front-ned
  ).then(() => {
    hideLoading();
  });
};

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
    if (!isPaid) {
      addPaypalSdk(totalPrice);
    }
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
                 <li class="'total"> <div> Order Total</div><div> $${totalPrice}</div></li>
                 <li><div class="fw"id='paypal-button'> </div> </li>
                 </ul>
            </div>
    
         </div>
      </div>
     `;
  },
};
export default OrderScreen;
