// module.exports = { ini es 5 gatni es6
export default {
  //dinodejs ganti dari export default mjdi module.exports
  products: [
    {
      _id: '111111111111111111111111',
      name: 'FUllzipT-shirts',
      category: 'Shirts',
      image: '/images/product-1.jpg',
      price: 60,
      brand: 'Hiskywin',
      rating: 2.5,
      numReviews: 10,
      countInStock: 0,
    },
    {
      _id: '222222222222222222222222',
      name: 'Full training jacket',
      category: 'jacket',
      image: '/images/product-2.jpg',
      price: 60,
      brand: 'blue factory',
      rating: 2.5,
      numReviews: 10,
      countInStock: 6,
    },
    {
      _id: '333333333333333333333333',
      name: 'Full hero Long Shirts',
      category: 'Shirts',
      image: '/images/product-3.jpg',
      price: 60,
      brand: 'Jordan',
      rating: 4.5,
      numReviews: 30,
      countInStock: 6,
    },
    {
      _id: '444444444444444444444444',
      name: 'Full Zip Running Shirts',
      category: 'Pants',
      image: '/images/product-4.jpg',
      price: 60,
      brand: 'start-pants',
      rating: 3.5,
      numReviews: 77,
      countInStock: 6,
    },
    {
      _id: '555555555555555555555555',
      name: 'Full Zip Running Shirts',
      category: 'Pants',
      image: '/images/product-5.jpg',
      price: 60,
      brand: 'start-pants',
      rating: 3,
      numReviews: 40,
      countInStock: 6,
    },
    {
      _id: '666666',
      name: 'Full jelek Shirts',
      category: 'Pants',
      image: '/images/product-6.jpg',
      price: 60,
      brand: 'start-pants',
      rating: 1.0,
      numReviews: 300,
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
