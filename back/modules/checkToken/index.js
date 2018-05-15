import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
const checkToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === process.env.AUTHBEARER
  ) {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRETKEY, (err, decode) => {
      if (err) res.status(500).json({ success: false, message: err });
      else {
        req.decode = decode;
        next();
      }
    });
  } else {
    res.status(403).json({
      success: false,
      message: 'You should be authenticaded to access this route',
    });
  }
};

export default checkToken;
