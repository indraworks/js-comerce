import CheckoutSteps from '../components/CheckoutSteps';
import { setPayment, getPayment, getUserInfo } from '../localStorage';

const PaymentScreen = {
  after_render: () => {
    document.getElementById('payment-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const paymentMethod = document.querySelector(
        'input[name="payment-method"]:checked'
      ).value;
      setPayment({ paymentMethod });

      document.location.hash = '/placeorder';
    });
  },
  render: () => {
    //check user login apa blum
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = '/';
    }

    return `
     <div>
     ${CheckoutSteps.render({ step1: true, step2: true, step3: true })}
      <div class='form-container'>
        <form id='payment-form'>
          <ul class='form-items'>
            
            <li>
             <h1>Payment</h1>
              
            </li>
            <li>
            <div>
            
             <input type="radio" 
             name="payment-method" 
             id="paypal"
             value="paypal" checked/>
             <label for='paypal'>Paypal</label>         
             </div>

            </li>
            <li>
            <div>
            
             <input type="radio" 
             name="payment-method" 
             id="stripe"
             value="stripe" />
            <label for='stripe'>Stripe</label>              
             </div>

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
export default PaymentScreen; //copy Payment Screen ke Payment

/*
keterangan jika sbuah input kita ambil getelement kita pakai wuery selector
yaitu dgn namenya ! pada saaat event tercheck!
 const paymentMethod = document.querySelector('input[name="payment-method":checked').value;

*/
