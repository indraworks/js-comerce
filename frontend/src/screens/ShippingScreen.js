import CheckoutSteps from '../components/CheckoutSteps';
import { setShipping, getShipping } from '../localStorage';

const ShippingScreen = {
  after_render: () => {
    document
      .getElementById('shipping-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        setShipping({
          address: document.getElementById('address').value,
          city: document.getElementById('city').value,
          postalCode: document.getElementById('postalCode').value,
          country: document.getElementById('country').value,
        });
        document.location.hash = '/payment';
      });
  },
  render: () => {
    const { address, city, postalCode, country } = getShipping();

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
              <input type=text name='address' id='address' 
              value='${address}'
              required />
            </li>
            <li>
              <label for='city'><strong>City</strong></label>
              <input type=text name='city' id='city' 
              value='${city}'
              required />
            </li>
            <li>
              <label for='postal-code'><strong>Postal-Code</strong></label>
              <input type=text name='postal-code' id='postal-code' 
              value='${postalCode}'
              required
              />
            </li>
            <li>
              <label for='country'><strong>Country</strong></label>
              <input type=text name='country' id='country'
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
