import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
//jlnkan router saat loading masukan render atau tampilkan tag html li dinamys
//kpada main.inerHTml yg mana utk tampilkan card card

//object routes brisi key broser dan component yg di action/dikenai beban
const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
};

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
