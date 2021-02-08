//sama sgn home screen kit abuat obkect isinya
//value dan function dimana sbgaia calbac function /anomoys func

const Rating = {
  render: (props) => {
    if (!props.value) {
      return `<div></div>`;
    }
    return `
<div class="rating">
  <span>
    <i class="${props.value >= 1 ? 'fa fa-star' : 'fa fa-star-o'}"  ></i>
  </span>
<span>
  <i
    class="${
      props.value >= 2
        ? 'fa fa-star'
        : props.value >= 1.5
        ? 'fa fa-star-half-o'
        : 'fa fa-star-o'
    }"
  ></i>
</span>
<span>
  <i
    class="${
      props.value >= 3
        ? 'fa fa-star'
        : props.value >= 2.5
        ? 'fa fa-star-half-o'
        : 'fa fa-star-o'
    }"
  ></i>
</span>
<span>
  <i
    class="${
      props.value >= 4
        ? 'fa fa-star'
        : props.value >= 3.5
        ? 'fa fa-star-half-o'
        : 'fa fa-star-o'
    }"
  ></i>
</span>
<span>
  <i
    class="${
      props.value >= 5
        ? 'fa fa-star'
        : props.value >= 4.5
        ? 'fa fa-star-half-o'
        : 'fa fa-star-o'
    }"
  ></i>
</span>
<span>${props.text || ''}</span>
</div>`;
  },
};
export default Rating;

/*
diatas trlihat props ini apa dia adalah argument dari parent yg asuk kesini 
nilai props adalah sebagarg bisa objetc ,atau nilai 
number of start,
props obect contain proptrty value et

cara kerja rating utk class="rating" -->dimaksudkan utk gambar gold background bintang 
nah <i class="fa fa-star" />  <--ini dalah bintang penuh  
    <i class="fa fa-star-o" />  <--ini dalah bintang 1/2 penuh atau separuh
    nah jadi stiap mau gambar binta ing ini kita butuh ada 5 start bintang 
    nah kita check dgn props.value >=1 jika ya maka gambar penuh :jika tidak gambar sprauh nan ini 
    smua kita span  sbnaya 5 jadi 5 inta g berjejer makanya kit acopie dan masing2 kita  tanya 
    apakah mulai lebih >=1 atau 0.5 trus naik apakah 2 atau 1.5 ,apakah 3 atau 2.5 apakah 4 atau 3.5 apaja 5 atau 4.5
 

dan 
*/
