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
//remve cart
const removeFromCart = (id) => {
  //ngeset yg bukan id yg didelete dimasukan kestorage
  setCartItems(getCartItems().filter((x) => x.product !== id));
  if (id === parseRequestUrl().id) {
    //jik adisa sama id  dan id  yg ada di browser redirect ke page cart langsung
    //artinya dia blum habi sdidelete
    document.location.hash = '/cart';
    console.log('indra');
    console.log('id =', id);
    console.log('parseUrl =', parseRequestUrl(id));
  } else {
    //ini jika dia gak sama alias dia baru saja di click didelete id dibandingkan dgn id broser ygbaru
    console.log('mirna');
    console.log('id =', id);
    console.log('parseUrl =', parseRequestUrl(id));
    rerender(CartScreen);
    //update tampilan
    //artiya render 2x yaitu CartScree,remder(0) & CarSreen.after_render()
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

    //utk delete sama button djdikan array,trigerya waktu diclick
    const btnDeletes = document.getElementsByClassName('delete-button');
    Array.from(btnDeletes).forEach((btnDelete) => {
      btnDelete.addEventListener('click', () => {
        removeFromCart(btnDelete.id);
      });
    });
    //add process checkout
    document.getElementById('checkout-button').addEventListener('click', () => {
      //document locatioh.hash adalah numjuk pada browsser stlah /# --> yatu /Sign-in
      //jdi diborser cchrm kita diarahkan redirect ke adress /#/Sign-In
      //pada console =http://localhost:8080/#/Sign-In
      document.location.hash = '/Sign-In';
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
        qty: 1, //defaultnya 1 dulu nnti akan diubah oleh user lwat click tombol select
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

/*
PENJELASAAN JIKA SAYA klik button di product id di card utk saya kmduian kan muncul product/:id 
spcific no,nah ada button add to cart nah disitu akan broser ke cart misal product id  yg saya klick =6 
maka saya menuju paga cart nah itu trus brambtah /cart/6 
jika sama mnuju product screem dan clikc product id  3 misalkan nah saya mnuju hal specific produt/3
nah ktika saya kklik add to cart maka broser akan jadi cart/3 

nah skrg id button syaa kan smbarang itu pas misalkan saya delete button yg 3 jika sama 
maka akan menuju kecart halaman skrgn 
kalau tidak maka saya render smua halaman utk update 





 if (id === parseRequestUrl().id) {
     ini atinya idcart = product yg paling bawah  yg ada di browser
     dan id yg saya delete ini adalah sama dgn idcart yg baru masuk susunan paling 
     bawah   
     maka gak perlu di update screen tetap di cart
     yg didelete yg diurut paling bawah 


    document.location.hash = '/cart';
    console.log('indra');
    console.log('id =', id);
    console.log('parseUrl =', parseRequestUrl(id));
  } else {
     yg didelete bukan yg diurut paling bawah ,tidak sama dgn broser yg skarang mis broser skrng cart/6 
     yg kit adelete yg ditengah id =4 maka kita akan mlakukan update screem 


    console.log('mirna');
    console.log('id =', id);
    console.log('parseUrl =', parseRequestUrl(id));
    rerender(CartScreen);
    //update tampilan
    //artiya render 2x yaitu CartScree,remder(0) & CarSreen.after_render()
  }



*/

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
