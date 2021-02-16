import { parseRequestUrl, rerender } from '../utils';
import { getProduct } from '../api';
import { getCartItems, setCartItems } from '../localStorage';

// //addToCart kita simpan di lclStorage
// //nti kita ambil dan kita jumlah totalqty
// const addToCart = (item, forceUpdate = false) => {
//   //ada 2 metod di localstorage.js yaitu retirieve dan save
//   //kit agetdata apa sudah prnah disimpan? atau save data jika blum ada disimpan dlocal sotrage
//   let cartItems = getCartItems();
//   //kalau mau add dicarts check apa item exist jika exist update apa tidak tambah
//   const existItem = cartItems.find((x) => x.product === item.product);
//   //sx yg ada didlm sotrage di compare dgn item (pasing) jika exist:
//   if (existItem) {
//     if (forceUpdate !== false) {
//       cartItems = cartItems.map((x) =>
//         x.product === existItem.product ? item : x
//       );
//     }
//   } else {
//     cartItems = [...cartItems, item]; //tambahkan klo ini baru
//   }
//   //saving dsotrage dgn func setCartItems
//   setCartItems(cartItems);
//   //jika forceUpdate = true
//   if (forceUpdate !== false) {
//     //func rerender ada di
//     rerender(CartScreen.after_render());
//   }
// };

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((x) =>
        x.product === existItem.product ? item : x
      );
    }
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
  if (forceUpdate) {
    rerender(CartScreen);
  }
};

const CartScreen = {
  after_render: () => {
    //penjelsan dibawah
    const qtySelects = document.getElementsByClassName('qty-select');
    Array.from(qtySelects).forEach((qtySelect) => {
      qtySelect.addEventListener('change', (e) => {
        const item = getCartItems().find((x) => x.product === qtySelect.id);
        //cari qtyselect hr sama dgn id yg yg ada di localstorage
        //spread smua item dilocal storage tambahkan dgn yg baru
        addToCart({ ...item, qty: Number(e.target.value) }, true);
      });
    });
  },
  render: async () => {
    const request = parseRequestUrl(); //gambil parse stlah hash
    //kit aambil id
    if (request.id) {
      //jika ada click button
      const product = await getProduct(request.id); //ambil informasi data product base  product._id di api.js
      addToCart({
        //masukan kdlam cart obj  masuk di local storage
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      });
    }
    // return `<div>Cart Screen </div>
    //       <div>${getCartItems().length}</div>
    // `;
    const cartItems = getCartItems();
    return `
       <div class="content cart"> 
          <div class="cart-list">
           <ul class="cart-list-container">
               <li>
                  <h3> Shopping Cart </h3> 
                  <div>Price</div>
               </li>
                ${
                  cartItems.length === 0
                    ? '<div>Cart is Empty <a href="/#/">Go Shopping </a> </div>'
                    : cartItems
                        .map(
                          (item) => `
                      <li>
                         <div class="container2" > 
                         <div class='cart-image'>
                          <img src='${item.image}' alt='${item.name}' />
                        </div>
                        <div className='cart-name'>
                            <div>
                            <a href='/#/product/${item.product}'>
                              ${item.name}
                            </a>
                            </div>
                          <div> 
                            Qty:
                            <select class='qty-select' id='${item.product}'> 
                             ${[...Array(item.countInStock).keys()].map((x) =>
                               item.qty === x + 1
                                 ? `<option selected value="${x + 1}">${
                                     x + 1
                                   }</option>`
                                 : `<option value="${x + 1}">${x + 1}</option>`
                             )}
                            </select>
                            <button 
                            type="button" 
                            class="delete-button"
                            id="${item.product}"
                            
                            >Delete

                            </button>
                          </div>
                        </div>
                         </div>
                        
                        <div class="cart-price">$${item.price}</div>
                      </li>`
                        )
                        .join('\n')
                }
            </ul>
            
          </div>
        <div class="cart-action">
             <h3 > 
                   Subtotal(${cartItems.reduce((a, c) => a + c.qty, 0)}items):
              $${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
    
             </h3>
            <button id="checkout-button" class="primary fw">Procced To Checkout</button>
       </div>
    
  </div>
  `;
  },
};
export default CartScreen;

/*Keterangan ktika user klik select pilihan di select box
maka qty tsb harus dimasukan/pasing ke function addToCart
nah kita akan buat addeventlistener di bagain after_render:()=> {
  kita select class "qty-select" sbgai acuan
  document.queryselector(".qty-select").addEventListener()
}





/end ket select ///*/

/* ////render option value 
tentang render option value yatu kitabuat array dari item.   
dalam hal ini mewaikili product product.countInStock
nah kita lihat hanya trdiri dari keys saja tunggal dan ber-iterasi max sd bnayaknya nilai stock
0...7 
ngubah mis in stock:9 maka angka 9 dijadikan ieterasi array ===> [...Array(item.countInStock).keys()]
${[...Array(item.countInStock).keys()].map(x=>item.qty ===x+1?)}
//disini artinya mulai dari nol ini mapung mnenyakan apakah jumlah qty sudah 
//equal dgn jumlah array x+1 mis qty =8 dan x+1 =8 krn dimulai dari 0..7
jikasudah sama maka masukan nil x tadi dalam selected value
jika tidak alias kosong gakperlu diupdate selected value tsb
``
contoh :
Create an Array Iterator object, only containing the keys of the array,
 and then loop through each key:

var fruits = ["Banana", "Orange", "Apple", "Mango"];
var fk = fruits.keys();

for (x of fk) {
  document.getElementById("demo").innerHTML += x + "<br>";
}
*/

///keterangan reduce a adalah acumultartor ,c adalah current value

//kit apasang/import  di app.js(sdah ganti nama jd index) atau index.js

/*
jadi ada 2 menu pilihan di cartscren 
yg 1 add to screen tombo boton di tekan ini mengarah buat 
nila2 product ,ame ,image price dan stock di simpan di 
loal storage 
dmikia trus brambah jika di klik

-pilihan kedua sisi kana atas utk lbih liat




*/

/*
local storage :
https://www.w3schools.com/jsref/prop_win_localstorage.asp


*/

/*
disini kita buat dua buah function/method getCartItems and putCartItems
getCartItems utk liat apakah ada yg udah di save ddi local storage jika tidak ada
maka 



*/
