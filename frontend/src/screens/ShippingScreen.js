import { update } from '../api';
import CheckoutSteps from '../components/CheckoutSteps';
import { setUserInfo, getUserInfo, clearUserInfo } from '../localStorage';
import { hideLoading, showLoading, ShowMessage } from '../utils';

const ShippingScreen = {
  after_render: () => {
    //mbuat aksi brdasarkan submit yg diselect adalah form id="profile-form"
    //logout
    document.getElementById('signout-button').addEventListener('click', () => {
      clearUserInfo();
      //arahkan ke menu utama
      document.location.hash = '/';
    });
    document
      .getElementById('profile-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        //taruh di before profile utk overlay
        showLoading();
        //ke api.js buat utk func profile
        const data = await update({
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
        });

        hideLoading();
        if (data.error) {
          // alert(data.error);
          //kita ganti dgn showMessage
          ShowMessage(data.error);
        } else {
          setUserInfo(data);
          //jika success redirect ke halaman utama '/'

          document.location.hash = '/';
          console.log(data);
        }
      });
  },
  render: () => {
    //kita check apa sudah benar login si user dari data di localsotrage
    //jik ablum kita redirect ke home '/'
    const { address, city, postalCode, country } = getShipping();

    //isi dari from profile adalah utk kita edit
    //jadi kita ambil username dan email dari sotrage
    //utk password kita biarkan
    return `
     <div>
     ${CheckoutSteps.render({ step1: true, step2: true })}
      <div class='form'>
        <form id='shipping-form'>
          <ul class='form-container'>
            <li>
              <h2>Shipping</h2>
            </li>
            <li>
              <label for='address'><strong>Address</strong></label>
              <input type='address' name='address' id='address' 
              value='${address}'
              required />
            </li>
            <li>
              <label for='city'><strong>City</strong></label>
              <input type='city' name='city' id='city' 
              value='${city}'
              required />
            </li>
            <li>
              <label for='postal-code'><strong>Postal-Code</strong></label>
              <input type='postal-code' name='postal-code' id='postal-code' 
              value='${postalCode}'
              required
              />
            </li>
            <li>
              <label for='country'><strong>Country</strong></label>
              <input type='country' name='country' id='country'
              value='${country}
              required
               />
            </li>
            
            
            <li>
              <button class='fw' type='submit'><strong>Continue</strong></button>
            </li>
           
           
          </ul>
        </form>
      </div>
      </div>
    `;
  },
};
export default ShippingScreen;
