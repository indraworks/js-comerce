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
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      //ada authorization krn kita pasang utk pake token jika update

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

//create order ini sama dgn  post register
// jadi kalau kita kirim data ke server
// yg di perhatikan adalah pasiing data disni adalah order
// nah jangan lupa karena ini adalah privat maka harus ada tokem
//

// export const createOrder = async (order) => {
//   const { token } = getUserInfo();
//   try {
//     const response = await axios.post(
//       `${apiUrl}/api/orders/`,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//            Authorization: `Bearer ${token}`,
//         },
//       },
//       { data: order }
//     );
//     if (response.statusText !== 'OK') {
//       throw new Error(response.data.message);
//     }
//     return response.data;
//   } catch (err) {
//     return {error:err.response?err.response.data.message:err.message }

//   }
// };

export const createOrder = async (order) => {
  const { token } = getUserInfo();
  try {
    const response = await axios({
      url: `${apiUrl}/api/orders`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: order,
    });
    if (response.statusText !== 'Created') {
      throw new Error(response.data.message);
    }

    return response.data;
    //console log response data
  } catch (err) {
    return { error: err.response ? err.response.data.message : err.message };
  }
};

//getOrder
export const getOrder = async (id) => {
  const { token } = getUserInfo();
  try {
    const response = await axios({
      url: `${apiUrl}/api/orders/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      //ingat utk request GEt gak perlu send data krn kita ambil data
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    console.log(response.data, 'data response');
    return response.data;
  } catch (err) {
    return { error: err.message };
  }
};

export const getPayPalCLientId = async () => {
  const response = await axios({
    url: `${apiUrl}/api/paypal/ClientId`,
    method: 'GET',
    headers: {
      'Content-Type': 'Application/json',
    },
  });
  if (response.statusText !== 'OK') {
    throw new Error(response.data.message);
  }

  return response.data.clientId;
};

/*
cara makai axios ada dua yaitu dgn cara tanpa embel2 method didepannya
cara 1:
    const x = axios({
      method: 'POST',
      url:`${adressUrl}+path`,
      Headers:{
        Content-Type:"applicatiom/jsom"
      },
      data:{variable_Param_yg_dipassing}
     
    })

cara 2:s
    const y = axios.put atau axios.post{
          `alamat adress`,{Content-Type:application/json,
          authorization:"Bearer ${token}"
          },
          {variabel_data_yg_dipassing_difunction :param_data}
    }

axios akan selalu dapat response dari waktu dia akssess
apakah ada data atau ada error
utk hal tsb maka disiapkan data penampung atau variabel



*/
