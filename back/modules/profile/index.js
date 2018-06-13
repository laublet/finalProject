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
  User.findOne({ _id: req.decode.id }, { password: 1 }, (err, user) => {
    if (err) res.status(500).json({ success: false, message: err.message });
    else if (user.comparePasswords(req.body.password)) {
      if (req.body.userUpdate.password) req.body.userUpdate.password = bcrypt.hashSync(req.body.userUpdate.password, 11);
      req.body.userUpdate.lastUpdateDate = Date.now();
      const updateOps = {};
      for (const key of Object.keys(req.body.userUpdate)) {
        if (req.body.userUpdate[key]) updateOps[key] = req.body.userUpdate[key];
      }
      User.findOneAndUpdate({ _id: req.decode.id }, { $set: updateOps }, { new: true }, (err, userUpdate) => {
        if (err) res.status(500).json({ success: false, message: err.message });
        else {
          res.status(200).json({
            success: true,
            message: 'Profile updated !',
            content: userUpdate,
          });
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Wrong Password',
      });
    }
  });
});

profile.delete('/', (req, res) => {
  User.findOne({ _id: req.decode.id }, { password: 1 }, (err, user) => {
    if (err) res.status(500).json({ success: false, message: err.message });
    else if (user.comparePasswords(req.body.password)) {
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
    } else {
      res.status(401).json({
        success: false,
        message: 'Wrong Password',
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
