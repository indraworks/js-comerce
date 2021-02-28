import { getCartItems } from './localStorage';

export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split('/'); //yg pertama dapat # bntuk array bersaarakan
  // "/"
  return {
    //dikmblikan dlm object
    resource: request[1],
    id: request[2],
    verb: request[3],
  };
};
export const rerender = async (component) => {
  document.getElementById(
    'main-container'
  ).innerHTML = await component.render();
  await component.after_render();
};

//kita buat show loading and hide loading overlay

export const showLoading = () => {
  document.getElementById('loading-overlay').classList.add('active');
};
export const hideLoading = () => {
  // function wait(ms) {
  //   let start = new Date().getTime();
  //   let end = start;
  //   while (end < start + ms) {
  //     end = new Date().getTime();
  //   }
  // }

  // wait(500);

  document.getElementById('loading-overlay').classList.remove('active');
};
//cb = callback
export const ShowMessage = (message, callback) => {
  document.getElementById('message-overlay').innerHTML = `
      <div>
      <div id="message-overlay-content" >${message}</div>
      <button id="message-overlay-close-button">OK</button>
      </div>
      
      `;

  document.getElementById('message-overlay').classList.add('active');
  //kita close button waktu button diclick select dulu id buton sbb:
  document
    .getElementById('message-overlay-close-button')
    .addEventListener('click', () => {
      document.getElementById('message-overlay').classList.remove('active');
      if (callback) {
        callback();
      }
    });
};

/*//redicrect users  kita buat readirec user ini kita gunakan 
utk detksi apakah user kit aini sudah login jika login maka diredirect keshiping
jadi cara checkna kitka cart sudah keisi kita  check out wizard 
maka kita akan check apa ada item di chart jika ada maka kita redirect kehsiping 
gak perlu login lagi


///*/

export const redirectUser = () => {
  if (getCartItems().length !== 0) {
    document.location.hash = '/shipping';
  } else {
    document.location.hash = '/';
  }
};

/*
 location.hash.split("/")[0]
"#"
location.hash.split("/")[1]
"product"
location.hash.split("/")[2]
"4jktjktr6775332rr77"
 nanti yg diambil adalah array 1,2 dan yg terakhir utk 3 adalah verb
 requestverb apakah get/post/put/delete
utk yg ketiga acationnya itu merupakan GET 
nah parameter verbnya utk query dimulai dgn tanda ?
setelah :id kit adapatkan  sbb:
URL parameter
Additional information can be added to the GET request for the web server to process. 
These URL parameters are simply appended to the URL. The syntax is very simple:

The query string is introduced with a question mark (“?”).
Each parameter is named, so it consists of a name and a value: "Name=Value".
If several parameters are to be included, they are connected using an ampersand 
("&").



*/

/*
CATATAN Location Hash :
https://www.w3schools.com/jsref/prop_loc_hash.asp

contoh :Return the anchor part of a URL. Assume that the current URL is
 http://www.example.com/test.htm#part2:

var x = location.hash;
console.log(x)


*/
