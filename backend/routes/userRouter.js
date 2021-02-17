import express from 'express';
import User from '../models/userModel';

//note ubah router adi userRouter varibalenya biar lbih firendly ini
//brasal daro user Router
const userRouter = express.Router();

//sbnarnya ini mestinya post tapi ini kan senganja dipakai get
//krn adminnya hanya 1 saja ,stlah mendapatkan get  dari client
//server meresponse dgn instasiate buat record field isntansiate dari
//User colection
userRouter.get('/createadmin', async (req, res) => {
  try {
    //instasiate
    const user = new User({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'jsecomerce',
    });
    //save
    const createdUser = await user.save();
    res.send(createUser);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});
//export agar digunakan server.js
export default userRouter;

/*
apaka sich router itu ,adalah sbuah paramlink  adress utk  disediakan pada client

dan jika di dihubungi dgn action get/put/delete/post oleh client  pada link ,
yg sudah disediakan ini nanti akan ada 
function yg akan tangani dan response balik kepada client begitu kiranya 
nah disini kita kan buat data model namaynya User nah kita skrg buat link 
createadmin ,yg mana jika nanti dihubungi maka server akan response dgn buat 
sbuah acount atau buat filed2 nama,email,password, pada table user didatabse



*/
