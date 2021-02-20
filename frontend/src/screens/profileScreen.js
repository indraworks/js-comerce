import { update } from '../api';
import { setUserInfo, getUserInfo } from '../localStorage';
import { hideLoading, showLoading, ShowMessage } from '../utils';

const ProfileScreen = {
  after_render: () => {
    //mbuat aksi brdasarkan submit yg diselect adalah form id="profile-form"

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
    const { name, email } = getUserInfo();
    if (!name) {
      document.location.hash = '/';
    }
    //isi dari from profile adalah utk kita edit
    //jadi kita ambil username dan email dari sotrage
    //utk password kita biarkan
    return `
      <div class='form-container'>
        <form id='profile-form'>
          <ul class='form-items'>
            <li>
              <h1>Create Account</h1>
            </li>
            <li>
              <label for='name'><strong>Name</strong></label>
              <input type='name' name='name' id='name' value='${name}'/>
            </li>
            <li>
              <label for='email'><strong>Email</strong></label>
              <input type='email' name='email' id='email' value='${email}' />
            </li>
            <li>
              <label for='password'><strong>Password</strong></label>
              <input type='password' name='password' id='password' />
            </li>
            
            <li>
              <button class='fw' type='submit'><strong>Update</strong></button>
            </li>
           
          </ul>
        </form>
      </div>
    `;
  },
};
export default ProfileScreen;
