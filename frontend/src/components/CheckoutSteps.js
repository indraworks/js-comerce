dconst CheckoutSteps = {
  render:(props)=> {
     return `
     <div class="checkout-steps">
     <div class="${props.step1?'active':''}"></div>
     </div>
     `;

  },
  
}