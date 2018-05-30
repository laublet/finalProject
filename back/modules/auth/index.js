import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './../../models/User';
// import sendMail from '../mail/index';
const auth = express.Router();

// const msg = {
//   to: '',
//   from: 'awesomeVueApp@awesome.com',
//   subject: 'Congrat ! ',
//   text: 'Welcome to our AwesomeAPP',
// };

auth.post('/signup', (req, res) => {
  if (req.body.username && req.body.password) {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (user === null) {
        const newUser = new User(req.body);
        newUser.password = bcrypt.hashSync(req.body.password, 11);
        newUser.save((err, nUser) => {
          if (err) {
            res.status(400).json({ success: false, message: err.message });
          } else {
            nUser.password = undefined;
            res.status(200).json({
              success: true,
              message: 'Tadaaa ! New user registed',
              content: nUser,
            });
          }
        });
      } else {
        res.status(412).json({ success: false, message: 'This email adress is already taken' });
      }
    });
  } else {
    res.status(412).json({
      success: false,
      message: 'You need to enter an email, username and a password !',
    });
  }
});

// auth.post('/login', (req, res) => {
//   if (req.body.email && req.body.password) {
//     User.findOne({ email: req.body.email }, (err, user) => {
//       if (err) res.status(500).json({ success: false, message: err.message });
//       if (!user) {
//         res.status(401).json({ success: false, message: 'User not found' });
//       } else if (user) {
//         if (!user.comparePasswords(req.body.password)) {
//           res.status(401).json({ success: false, message: 'Wrong password..' });
//         } else {
//           jwt.sign({ email: user.email, id: user._id }, process.env.SECRETKEY, (err, result) => {
//             if (err) {
//               res.status(500).json({ success: false, message: err.message });
//             } else {
//               res.status(200).json({
//                 success: true,
//                 message: 'Here is your AwesomeToken !',
//                 content: { token: `${process.env.AUTHBEARER} ${result}` },
//               });
//             }
//           });
//         }
//       }
//     });
//   } else {
//     res.status(412).json({
//       success: false,
//       message: 'Email and/or password are missing..',
//     });
//   }
// });

auth.post('/login', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(412).json({ success: false, message: 'Email and/or password are missing..' });
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    } else if (user) {
      if (!user.comparePasswords(req.body.password)) {
        return res.status(401).json({ success: false, message: 'Wrong password..' });
      }
      jwt.sign({ email: user.email, id: user._id, username: user.username }, process.env.SECRETKEY, (err, result) => {
        if (err) {
          return res.status(500).json({ success: false, message: err.message });
        }
        return res.status(200).json({
          success: true,
          message: 'Here is your AwesomeToken !',
          content: { success: true, token: `${process.env.AUTHBEARER} ${result}`, username: user.username },
        });
      });
    }
  } catch (e) {
    return res.status(400).send();
  }
});

export default auth;
