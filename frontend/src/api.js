import axios from 'axios';
import { apiUrl } from './config';
import { getUserInfo } from './localStorage';
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
      headers: {
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
//register
export const register = async ({ name, email, password }) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/users/register`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      //stlah header karna ini metode post jgn lupa data yg akan dimasukanke server
      data: {
        //aslinya email:email,password:password krn es6 boleh dtulis 1 x krn sama
        name,
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

//profile ini kita edit ops = PUT kita search idnya dulu
//kita ambil dari yg uda dikrim server di storage

export const update = async ({ name, email, password }) => {
  const { _id, token } = getUserInfo();
  try {
    const response = await axios({
      url: `${apiUrl}/api/users/${_id}`,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      //ada authorization krn kita pasang utk pake token jika update
      authorization: `Bearer ${token}`,
      data: {
        //aslinya name:name...krn es6 sama bisa tulis skli
        name,
        email,
        password,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data; //kalau ok maka send back data dari bacakend ke fron-end/form
  } catch (err) {
    console.log(err.message);
    return { error: err.response.data.message || err.message };
  }
};
