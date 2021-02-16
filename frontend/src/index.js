import HomeScreen from './screens/HomeScreen.js';
import { parseRequestUrl } from './utils.js';
import Page404Screen from './screens/Page404Screen.js';
import ProductScreen from './screens/ProductScreen.js';
import CartScreen from './screens/CartScreen.js';

const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
  '/cart/:id': CartScreen, //mnuju cart per id
  '/cart': CartScreen, //
};
//kalau dapat data dari server  maka hrs disesuikan router dan render
//harus async dan await mnyesuaikan
const router = async () => {
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');
  console.log(parseUrl);
  //compare
  const screen = routes[parseUrl] ? routes[parseUrl] : Page404Screen;

  const main = document.querySelector('#main-container');
  main.innerHTML = await screen.render();
  //manggil afeter render disini jika diklick
  if (screen.after_render) await screen.after_render();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);

/*KETERANGAN NOTE/CATATAN:
import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
//jlnkan router saat loading masukan render atau tampilkan tag html li dinamys
//kpada main.inerHTml yg mana utk tampilkan card card

//object routes brisi key broser dan component yg di action/dikenai beban

const router = () => {
  const main = document.querySelector('#main-container');
  main.innerHTML = HomeScreen.render(); //nilai main skarang berisi html yg dinamis dari Homescreen.render()
};
window.addEventListener('load', router); // adaEvent listener adalah
//eben javascript yg jalankan module atau func bersaarkan kejadian
//misalkan saat loading  nah jalankan functon router yg isina ambil id object ditarhuh di vaiable
//main dimana get element id mnunuk pada main di html nah isi nain ini adalah
//html yg dinamic yg mana didatap data=ri data nah data ini di passing ke
//HomeScree.render
//dimaa render adalah mrupakan object metode katalain atau key dari sbuah object
//yanga mmana value dari onject adalah mrupakan <li> </li> yg dinamkik krn dimasukan dari variable data tadi
//${nilai variable }


//sekrang kita akan mlkukan hal yg sama dgn product id 
akan tetapi kit aharus route ambil hast dari route itu dan 



*/

/*
Catatan resource method utk ambil/identify resource web site
https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web


*/

/*
https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onhashchange

*/

/*
// import HomeScreen from './screens/HomeScreen.js';
// import ProductScreen from './screens/ProductScreen.js';
// import { parseRequestUrl } from './utils';
// import Page404Screen from './screens/Page404Screen';
// //create routes utk locate adressing dan panggil Screen modulenya
// // const routes = {
// //   '/': homeScreen,
// //   // '/product:id': ProductScreen,
// // };

// const router = () => {
//   const request = parseRequestUrl();
//   const parseUrl =
//     (request.resource ? `/${request.resource}` : '/') +
//     (request.id ? ':/id' : '') +
//     (request.verb ? `request.verb` : '');
//   //panggil routesbuat pilihan screen adress ke '/' atau '/product:id' atau page404error jkta tak ada
//   // const screen = routes[parseUrl] ? routes[parseUrl] : Page404Screen;
//   const screen = routes;
//   const main = document.getElementById('main-container');
//   main.innerHTML = HomeScreen.render(); //nilai main skarang berisi html yg dinamis dari Homescreen.render()
// };
// window.addEventListener('load', router);
// window.addEventListener('hashchange', router);


*/
