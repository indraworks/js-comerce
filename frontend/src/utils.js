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
  document.getElementById('loading-overlay').classList.remove('active');
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
