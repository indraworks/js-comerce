//ambil dari sotrage
export const getCartItems = () => {
  const cartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];
  return cartItems;
};
//simpan di sotrage
export const setCartItems = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};
//simpan data di storage setUserInfo & getUserInfo
/*
oya catatan kalau parameter di pasing ada nilai itu nilai default
jika mis blum ada atau tidak ada nilai pada argument yg dpasing
contoh const x=({nil1='',nil2=0})=> {}
aslinya tetap sama dgn const x=({nil1,nil2})=>{} //hnya yg atas ada nilau default
*/
//simpan userInfo distorage
export const setUserInfo = ({
  _id = '',
  name = '',
  email = '',
  isAdmin = false,
  token = '',
}) => {
  localStorage.setItem(
    'userInfo',
    JSON.stringify({
      _id,
      name,
      email,
      isAdmin,
      token,
    })
  );
};

//clear User from storage
export const clearUserInfo = () => {
  localStorage.removeItem('userInfo');
};

//ambil userInfo distorage
export const getUserInfo = () => {
  return localStorage.getItem('userInfo') //apakah ada data userInfo?
    ? JSON.parse(localStorage.getItem('userInfo'))
    : { name: '', email: '', password: '' };
};

//GetShipping Info

export const getShipping = () => {
  const shipping = localStorage.getItem('shipping')
    ? JSON.parse(localStorage.getItem('shipping'))
    : {
        address: '',
        city: '',
        postalCode: '',
        country: '',
      };
  return shipping;
};

//SetShipping
//btw default parameter pasing semua = '';
//data yg dimasukan dari form kelocal storage

export const setShipping = ({
  address = '',
  city = '',
  postalCode = '',
  country = '',
}) => {
  localStorage.setItem(
    'shipping',
    JSON.stringify(address, city, postalCode, country)
  );
};
