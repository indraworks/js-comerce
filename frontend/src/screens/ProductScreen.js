import { getProduct } from '../api';
import { parseRequestUrl } from '../utils';
import Rating from '../components/Rating';

const ProductScreen = {
  //after render dtriger kick button

  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById('add-button').addEventListener('click', () => {
      document.location.hash = `/cart/${request.id}`;
      //harus kita buat router di index.js utk panggil ini
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<h1>${product.error}</h1>`;
    }
    //
    return `
    <div class='content'>
      <div class='back-to-result'>
        <a href='/#/'>Back To Result</a>
      </div>
      <div class='details'>
         <div class='details-image'>
             <img src="${product.image}" alt="${product.name}">
          </div>
        <div class='details-info'>
          <ul>
            <li>
              <h1>${product.name}</h1>
            </li>
            ${Rating.render({
              value: product.rating,
              text: `${product.numReviews} reviews`,
            })}
            <li>
              Price :<strong>$${product.price}</strong>
            </li>
            <li>
              Description:
              <div>${product.category}</div>
            </li>
            </ul>
            </div>
          <div class='details-action'>
             <ul>
               <li>
                Price:$${product.price}
               </li>
                <li>
                  Status: ${
                    product.countInStock > 0
                      ? `<span class='success'>In Stock</span>`
                      : `<span class="error"> Unavailable</span>`
                  }
                </li>
                 <li>
                  <button id='add-button' class='fw primary'>
                    Add to Cart
                    </button>
                </li>
            </ul>
        </div>
      </div>
    </div>`;
  },
};
export default ProductScreen;

////////CATATAN /////////////////
/*
ingat  NameObject ={ render: ()=>{}}
rednder adalah key : dan ()=> {} adalah function 
jadi kalau kita panggil NameObject.render() berarti kit apanggil 
()=> {} funtion anomyous utk jalankan function 

parseRequestUrl utk ambil / stlah catch hash # 
getProduct <-- adalah fucn di api.js


//////UTK TAMPILAN ERROR /////////
return `<h1>${product.err}</h1>`; errornya dari error backend api
*/
