import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  }, //kita buat isAdmin utk kasih tanda user mana yg adamin default adalah
  //false ,hanya 1 atau 2 user saja yg admin nantinya
});

const User = mongoose.model('User', userSchema);
export default User;
/* ////// PENJELASAN COlection ,schmea dan model
jadi disini kita akan buat colection yg bernama users
colection di conventional database mirip dgn table2
nah skrng kita akan buat schmea ygatu property field2 yg ada di sbuah table
apa aja ?
jadi schme amripakan object2 yg tdiri dari property field 
yaitu nama perpety dan type data dari peroperty stb
stlah slsai kita save kitab export sbgai model 
nah model trdiri dari colection dan shcmea ( property dari colction tsb)
diatas bisa diliaha userModel = mongoose.model('Nama_Colection',nama_Schema)



*/
