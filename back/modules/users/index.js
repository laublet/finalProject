import express from 'express';
import User from './../../models/User';

const users = express.Router();

users.get('/', (req, res) => {
  User.find({}, { password: 0 }, (err, usersList) => {
    if (err) res.status(500).json({ success: false, message: err.message });
    else {
      res.status(200).json({
        success: true,
        message: 'Here is the list of users!',
        content: usersList,
      });
    }
  });
});

users.get('/:id', (req, res) => {
  User.findOne({ email: req.params.id }, { password: 0 }, (err, userData) => {
    if (err) res.status(500).json({ success: false, message: err.message });
    else {
      res.status(200).json({
        success: true,
        message: 'Here is the user!',
        content: userData,
      });
    }
  });
});

export default users;
