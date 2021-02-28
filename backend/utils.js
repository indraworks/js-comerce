import jwt from 'jsonwebtoken';
import config from './config';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET
  );
};

//buat midleware utk caegah data user lain gunakan taoken yg sama

export const isAuth = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    res.status(401).send({
      message: 'Token not SUpplied',
    });
  } else {
    const token = bearerToken.slice(7, bearerToken.length);
    //jadi jwt verify akan compare bukak tokenya dgn cara buka keydgn config.JWT_SECRET
    //is dari token yg di verivy adalah nama,email,_id,password
    //nah ini nanti yg dihantar masuk ke func/metode userROuter.put
    //utk di prosses email, dan passwro yg masuk
    jwt.verify(token, config.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(401).send({
          message: 'invalid Token',
        });
      } else {
        req.user = data; //ingat data disini adalah  data yg di req oleh user
        //disend dari api.js bagian func put ,jadi data isnya nama,email,password
        //data ini valid boleh masuk karena tokennya udah benar
        //utk proses slanjut ditangani di aysnc userRouter.put kita pakai next()
        //ukt kirim kesana
        next();
      }
    });
  }
};
