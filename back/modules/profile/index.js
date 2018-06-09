import express from 'express';
import bcrypt from 'bcrypt';
import User from './../../models/User';
import Product from './../../models/Product';

const profile = express.Router();

profile.get('/', (req, res) => {
  User.find({ _id: req.decode.id }, { password: 0 }, (err, userProfile) => {
    if (err) res.status(500).json({ success: false, message: err.message });
    else {
      res.status(200).json({
        success: true,
        message: 'Here is the user!',
        content: userProfile,
      });
    }
  });
});

profile.put('/', (req, res) => {
  if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 11);
  req.body.lastUpdateDate = Date.now();
  const updateOps = {};
  for (const key of Object.keys(req.body)) {
    if (req.body[key]) updateOps[key] = req.body[key];
  }
  User.findOneAndUpdate({ _id: req.decode.id }, { $set: updateOps }, { new: true }, (err, user) => {
    if (err) res.status(500).json({ success: false, message: err.message });
    else {
      res.status(200).json({
        success: true,
        message: 'Profile updated !',
        content: user,
      });
    }
  });
});

profile.delete('/', (req, res) => {
  Product.deleteMany({ userId: req.decode.id }, (err) => {
    if (err) res.status(500).json({ success: false, message: err.message });
    else {
      console.log('DONE');
    }
  });
  User.findOneAndRemove({ _id: req.decode.id }, (err) => {
    if (err) res.status(500).json({ success: false, message: err.message });
    else {
      res.status(200).json({
        success: true,
        message: 'You\'ve just been erased',
      });
    }
  });
});

profile.get('/products', (req, res) => {
  Product.find({ userId: req.decode.id }, (err, uniqueProduct) => {
    if (err) res.status(500).json({ success: false, message: err.message });
    else {
      res.status(200).json({
        success: true,
        message: 'Here are your product!',
        content: uniqueProduct,
      });
    }
  });
});
export default profile;
