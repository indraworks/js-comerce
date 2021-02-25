import { signin } from '../api';
import { setUserInfo, getUserInfo } from '../localStorage';
import { hideLoading, redirectUser, showLoading, ShowMessage } from '../utils';

const SigninScreen = {
  after_render: () => {
    //mbuat aksi brdasarkan submit yg diselect adalah form id="signin-form"

    document
      .getElementById('signin-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        //taruh di before signin utk overlay
        showLoading();
        const data = await signin({
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

          // document.location.hash = '/';
          //pilihan dari redirect jika sudah login
          redirectUser();
          console.log(data);
        }
      });
  },
  render: () => {
    //jika user brasil login direct loangsung ke '/'
    if (getUserInfo().name) {
      // document.location.hash = '/';
      //pilhan jika login pake redirectUser
      redirectUser();
    }
    return `
      <div class='form-container'>
        <form id='signin-form'>
          <ul class='form-items'>
            <li>
              <h1>Sign In</h1>
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
              <button class='fw' type='submit'><strong>SignIn</strong></button>
            </li>
            <li>
              <div>
                <small>
                  New User?<a href='/#/register'><strong>Create Your Account</stromg></a>
                </small>
              </div>
            </li>
          </ul>
        </form>
      </div>
    `;
  },
};
export default SigninScreen;
