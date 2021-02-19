import axios from 'axios';
import { apiUrl } from './config';
export const getProduct = async (id) => {
  try {
    const response = await axios({
      // url:apiUrl + '/api/products/'+id
      url: `${apiUrl}/api/products/${id}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.response.data.message || err.message };
  }
};
//ingat yg dipassing object yg isinya email dan password
export const signin = async ({ email, password }) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/users/signin`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      //stlah header karna ini metode post jgn lupa data yg akan dimasukanke server
      data: {
        //aslinya email:email,password:password krn es6 boleh dtulis 1 x krn sama
        email,
        password,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err.message);
    return { error: err.response.data.message || err.message };
  }
};
