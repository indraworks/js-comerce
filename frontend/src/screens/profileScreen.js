import { update } from '../api';
import { setUserInfo, getUserInfo, clearUserInfo } from '../localStorage';
import { hideLoading, showLoading, ShowMessage } from '../utils';
import OrderScreen from './OrderScreen';

const ProfileScreen = {
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
  render: async () => {
    //kita check apa sudah benar login si user dari data di localsotrage
    //jik ablum kita redirect ke home '/'
    const { name, email } = getUserInfo();
    if (!name) {
      document.location.hash = '/';
    }
    //isi dari from profile adalah utk kita edit
    //jadi kita ambil username dan email dari sotrage
    //utk password kita biarkan
    //profile bagi 2 kiri dan kanan -profile info & profile order
    //profipe info utk info user dan profile order utk history order
    // ygdilakukan oleh user beruoa list table
    //ambil dari api getMyOrders dan maping di tag div provide orders

    const orders = await getMyOrders();

    return `
      <div className="profle">
         <div className="profile-info">
                <div class='form-container'>
        <form id='profile-form'>
          <ul class='form-items'>
            <li>
              <h1>Update Account</h1>
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
            <li>
              <button class='fw' type='button'id="signout-button"><strong>Sign-Out</strong></button>
            </li>
           
          </ul>
        </form>
      </div>
         </div>
        <div className="profile-orders">
          <table>
         <thead>
             <tr>
                <th>ORDER</th>
                <th>DATE</th>
                <th>PAID</th>
                <th>DELIVE</th>
                <th>ACTION</th>
             </tr>
         </thead>
         <tbody>
             ${(orders.length = 0
               ? `<tr><td colSpan="6" >No Order Found</td></tr>`
               : orders.map(
                   (order) =>
                     ` <tr>
               <td>${order.id}</td>    
               <td>${order.createdAt}</td>    
               <td>${order.totalPrice}</td>    
               <td>${order.paidAt}</td>    
               <td>${order.deliveryAt}</td>    
               <td><a href="/#/order/${order._id}"> DETAILS</a></td>    
              </td>
             </tr>`
                 ))}
             
         </tbody>
       </table>

            
         </div>
      </div>


      
    `;
  },
};
export default ProfileScreen;

/*
catatan Pengenalan table jadi table ada 
<table> adalah tag pembungkus semua tag2 didalamnya
<thead> table header  default tulisanyan tebal
<tbody> table body 
<tr> table Row
<td> table cell di body
<th> table cell di header
colspan adalah besaran kolumn yg di ocupied buat sediakan cell2nya /field kalau di database




sumber :
https://www.w3schools.com/html/html_tables.asp

topik lengkap :
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
catatan:
Define an HTML Table
The <table> tag defines an HTML table.

Each table row is defined with a <tr> tag. Each table header is defined with a <th> tag. Each table data/cell is defined with a <td> tag.

By default, the text in <th> elements are bold and centered.

By default, the text in <td> elements are regular and left-aligned.

*/

/*




*/
