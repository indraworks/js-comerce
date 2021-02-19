import jwt from 'jsonwebtoken';
import config from './config';

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET
  );
};

export default generateToken;
