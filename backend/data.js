module.exports = {
  //dinodejs ganti dari export default mjdi module.exports
  products: [
    {
      _id: '1',
      name: 'FUllzipT-shirts',
      category: 'Shirts',
      image: '/images/product-1.jpg',
      price: 60,
      brand: 'Hiskywin',
      rating: 4.5,
      numReviews: 10,
      countInStock: 6,
    },
    {
      _id: '2',
      name: 'Full training jacket',
      category: 'jacket',
      image: '/images/product-2.jpg',
      price: 60,
      brand: 'blue factory',
      rating: 4.5,
      numReviews: 10,
      countInStock: 6,
    },
    {
      _id: '3',
      name: 'Full hero Long Shirts',
      category: 'Shirts',
      image: '/images/product-3.jpg',
      price: 60,
      brand: 'Jordan',
      rating: 4.5,
      numReviews: 10,
      countInStock: 6,
    },
    {
      _id: '4',
      name: 'Full Zip Running Shirts',
      category: 'Pants',
      image: '/images/product-4.jpg',
      price: 60,
      brand: 'start-pants',
      rating: 4.5,
      numReviews: 10,
      countInStock: 6,
    },
    {
      _id: '5',
      name: 'Full Zip Running Shirts',
      category: 'Pants',
      image: '/images/product-5.jpg',
      price: 60,
      brand: 'start-pants',
      rating: 4.5,
      numReviews: 10,
      countInStock: 6,
    },
    {
      _id: '6',
      name: 'Full Kontol Shirts',
      category: 'Pants',
      image: '/images/product-6.jpg',
      price: 60,
      brand: 'start-pants',
      rating: 4.5,
      numReviews: 10,
      countInStock: 6,
    },
  ],
};

/*
inga tjika di module waktu export defautl gak ada nama hany abentuk object {}
tapa nama maka nama dari module yg diexport adalah nama file!
shingga  namanya adalah data 
import data from '../data.js'

naah products nya yg sbagai object diakases dgn data.products tapi kita descturung 
const {product} = data
*/
