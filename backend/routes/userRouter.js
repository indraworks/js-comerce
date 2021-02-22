import express from 'express';
import User from '../models/userModel';
import expressAsyncHandler from 'express-async-handler';
import generateToken from '../utils';

//note ubah router adi userRouter varibalenya biar lbih firendly ini
//brasal daro user Router
const userRouter = express.Router();

//sbnarnya ini mestinya post tapi ini kan senganja dipakai get
//krn adminnya hanya 1 saja ,stlah mendapatkan get  dari client
//server meresponse dgn instasiate buat record field isntansiate dari
//User colection
userRouter.get(
  '/createadmin',
  expressAsyncHandler(async (req, res) => {
    try {
      //instasiate
      const user = new User({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'jsecomerce',
        isAdmin: true,
      });
      //save
      const createdUser = await user.save();
      res.send(createdUser);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  })
);

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
      const userSigned = await User.findOne({
        email: email, //body ini mwkili input form di frontend yg
        //fieldnya ada email,password etc
        password: password,
      });
      if (!userSigned) {
        res.status(401).send({
          message: 'Invalid email or password',
        });
      } else {
        //kalao password & name ok bisa login maka server send
        //response _id,email,password,isAdmin dan token ke client
        res.send({
          _id: userSigned._id,
          name: userSigned.name,
          email: userSigned.email,
          isAdmin: userSigned.isAdmin,
          //nah token ini adalah hasil dari screet +gab(id,name,email,isadmin)
          //kita yg tntukan
          //ditambah algo chiepring si server nah kitabuat func dibawah dgn
          //disini kita akan buat func generate token berdasarkan info userSigned yg dipassing
          token: generateToken(userSigned),
        });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send('server error');
    }
  })
);

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    //ita gak perlu buat findone kita create krn sudah gagal masuk di frontend

    const userRegistered = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await userRegistered.save();
    if (!userRegistered) {
      res.status(401).send({
        message: 'Wrong /invalid user data',
      });
    } else {
      //send respond balik ke client dgn data yg sudah diiisni
      res.send({
        _id: userRegistered._id,
        name: userRegistered.name,
        email: userRegistered.email,
        token: generateToken(userRegistered),
      });
    }

    //kita save
  })
);

//operasi update /put

userRouter.put('/:id', async (req, res) => {
  //ita gak perlu buat findone kita create krn sudah gagal masuk di frontend
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).send({
        message: 'user not found!',
      });
    } else {
      //update usernya tanda || jika tak ada maka diisi yg curent di form nilainya
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      const userUpdated = await user.save();
      //send respond balik ke client dgn data yg sudah diubah/update
      res.send({
        _id: userUpdated._id,
        name: userUpdated.name,
        email: userUpdated.email,
        token: generateToken(userUpdated), //mbuat token baru
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      message: 'server error',
    });
  }

  //kita save
});

//export agar digunakan server.js
export default userRouter;

/*
ketearangan utk PUT ,jadi di browser akan /api/users/:id nah id  atau nlai ini yg diketik
dibroser ditangkap oleh server sebagai sbuah params
req.params.id (id sesuai nama variable si nilai dibroser tadi)



*/

/*
apaka sich router itu ,adalah sbuah paramlink  adress utk  disediakan pada client

dan jika di dihubungi dgn action get/put/delete/post oleh client  pada link ,
yg sudah disediakan ini nanti akan ada 
function yg akan tangani dan response balik kepada client begitu kiranya 
nah disini kita kan buat data model namaynya User nah kita skrg buat link 
createadmin ,yg mana jika nanti dihubungi maka server akan response dgn buat 
sbuah acount atau buat filed2 nama,email,password, pada table user didatabse


*/

/*
Keterangan expressAsynchandler



*/
