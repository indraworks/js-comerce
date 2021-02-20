import { register } from '../api';
import { setUserInfo, getUserInfo } from '../localStorage';
import { hideLoading, showLoading, ShowMessage } from '../utils';

const RegisterScreen = {
  after_render: () => {
    //mbuat aksi brdasarkan submit yg diselect adalah form id="register-form"

    document
      .getElementById('register-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        //taruh di before register utk overlay
        showLoading();
        //ke api.js buat utk func register
        const data = await register({
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
    //jika user brasil login direct loangsung ke '/'
    if (getUserInfo().name) {
      document.location.hash = '/';
    }
    return `
      <div class='form-container'>
        <form id='register-form'>
          <ul class='form-items'>
            <li>
              <h1>Create Account</h1>
            </li>
            <li>
              <label for='name'><strong>Name</strong></label>
              <input type='name' name='name' id='name' />
            </li>
            <li>
              <label for='email'><strong>Email</strong></label>
              <input type='email' name='email' id='email' />
            </li>
            <li>
              <label for='password'><strong>Password</strong></label>
              <input type='password' name='password' id='password' />
            </li>
            <li>
              <label for='repassword'><strong>Re-Enter Password</strong></label>
              <input type='repassword' name='repassword' id='repassword' />
            </li>
            <li>
              <button class='fw' type='submit'><strong>register</strong></button>
            </li>
            <li>
              <div>
                <small>
                  Already Have Account?<a href='/#/signin'><strong>Please Sign-in</strong></a>
                </small>
              </div>
            </li>
          </ul>
        </form>
      </div>
    `;
  },
};
export default RegisterScreen;
