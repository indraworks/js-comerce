import {parseRequestUrl} from '../utils';
import {getProduct} from '../api';

//addToCart kita simpan di lclStorage
//nti kita ambil dan kita jumlah totalqty
const addToCart =(item,forceUpdate =false)=> {
  //ada 2 metod di localstorage.js yaitu retirieve dan save
  //kit agetdata apa sudah prnah disimpan? atau save data jika blum ada disimpan dlocal sotrage



  
}



const CartScreen = {
  after_render: () => {},
  render: () => {
   const request = parseRequestUrl() //gambil parse stlah hash 
    //kit aambil id
    if(request.id) { //jika ada id 
      const product = await getProduct(request.id) //ambil informasi data product base  product._id di api.js
       addToCart({
         //masukan kdlam cart obj  masuk di local storage
         product:product._id,
         name:product.name,
         image:product.image,
         price:product.price ,
         countInStock:product.countInStock ,
         qty:1    
       })
    }
     return `<div>Cart Screen </div>`


  },
};
export default CartScreen;

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