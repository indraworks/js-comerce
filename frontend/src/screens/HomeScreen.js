// import data from '../data.js';

//home screen sbgai object di export
const HomeScreen = {
  render: async () => {
    // const { products } = data;
    //ambil data langsung dari server hrus asyc await
    const response = await fetch('http://localhost:5500/api/products', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 200) {
      return `<div><h1> Errors in getting data!</h1></div>`;
    }
    //if success
    const products = await response.json(); //sudah mrupkan promisedimsukan ke varibale

    return `
                <ul class='products'> 
                   ${products
                     .map(
                       (product) => `
                    <li>
                   <div class="product">
                        <a href="#/product/${product._id}">
                       <img src=${product.image} alt="${product.name}">
                    </a>
                    <div class="product-name">
                       <a href="#/${product._id}">
                          ${product.name}
                        </a>
                    </div>
                    <div class="product-brand">
                      ${product.brand}
                    </div>                  
                    <div class="product-price">
                      $${product.price}
                    </div>
                   
                  </div>
               </li>
      
                     
                   `
                     )
                     .join('\n')}

                 </ul>
                  `;
  },
};

export default HomeScreen;

/*
UTK CHECK DATA DAN FLOW DARI BACKEDN 

cara lihat di console PILIH netowkr check/click  " XHR"  
disitu lihat yg dimabil sblah kiri  bawah  data aldah products 
check pada menu tabulator sblaha kanan  haeders  -->utk lihat status kita
                                       preivew--utk liaht isi data kita ok apa ngagk
                                       timing dll liat dewe



*/

/*
HomeScreen adlaah object yg berisi 
object callback function brenama render
yg isinya yg kit atulis di index.html
yg ada di bagian li class product nah ini  kit amasukan 
dgn backtik agar nanti ini kita pakai 
utk masukan variable dari data.js masing2 sbgai elementnya

/*
 render: () => {
    const {products} = data
    return ( render:()=> {


      
      <ul class="product">
         ${products.map(
             (product) => `
              <li>
                       <div class="product">
                           <a href="/#/product/${product._id}">
                             <img src="${product.image}" alt=${product.name}>
                          </a>
                     
                               <div class="product-name">
                                   <a href="/#/product/1">${product.name}</a>
                               </div>
                               <div class="product-brand">
                                  ${product.brand}
                              </div>
                               <div class="product-price">
                                 $${product.price}
                             </div>
                        </div>
                </li>
        `
            )}
      </ul>

*/

/*
HELLO jangan buta ! render diatas itu adalah 
object dari honmescreen yg mana render punya nilai 
sbb
const HomeScreen = {
  obj:()=>{}  // nah ini dia si obj adalah si render dan ()=> adalah function tanpa nama 
  nah skrng kita isi gitulloooh babang tamfan!
}


*/

/*
 <li>
               <div class="product">
                           <a href="/#/product/${product._id}">
                             <img src="${product.image}" alt=${product.name}>
                          </a>
                               {console.log('indra')}
                               <div class="product-name">
                                   <a href="/#/product/1">${product.name}</a>
                               </div>
                               <div class="product-brand">
                                  ${product.brand}
                              </div>
                               <div class="product-price">
                                 $${product.price}
                             </div>
                        </div>
            </li>
          

*/
