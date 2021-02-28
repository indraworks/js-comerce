const CheckoutSteps = {
  render: (props) => {
    //props disni merupakam parameter passing yg dipakai
    // jika true maka class akan active kita akan buat dicssnya check out di style.css

    return `
     <div class="checkout-steps">
      <div class="${props.step1 ? 'active' : ''}">Signin</div>
      <div class="${props.step2 ? 'active' : ''}">Shiping</div>
      <div class="${props.step3 ? 'active' : ''}">Payment</div>
      <div class="${props.step4 ? 'active' : ''}">Place Order</div>
     </div>
     `;
  },
};
export default CheckoutSteps;

/*
jadi gini inti utk check dan buat border di layar  garis sudah ada dimana kita
wiardnya 
cssnya sbgai berikut 
/*check step out 
.checkout-steps {
  display: flex;
  justify-content: space-between;
  width: 400px;
  margin: 1rem auto; /*x-y aja di margin 1rem ;auto buat ditengah  
}
/*check-out steps > div ini artinya direct div dibawahnya semua utk atur anaknya
dibawah container step-outs

.checkout-steps > div {
  border-top: 0.3rem #c0c0c0 solid; //mbuaat garis diatas tulisan Signin ,Shipping,Payment,Place Order
  color: #c0c0c0;
  flex: 1 1; /*gak pake flex basis ini maskudnya smua 4 4nya bagi rata lebarnya   
  padding-top: 1rem;
}
/*ini ktika activve diset waktu waktu lewat login dan payment dan sterutsnya 
dari prgram di checkout-step.js
kalau active berubah warna

.checkout-steps > div.active {
  border-top: 0.3rem #f08000 solid;
  color: #f08000;
}


*/
