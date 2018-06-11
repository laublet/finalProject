import express from 'express';
import mongoose from 'mongoose';
import connection from '../connection/index';
import User from './../../models/User';
import Message from './../../models/Message';

const messages = express.Router();

messages.post('/', (req, res) => {
  User.findOne({ _id: req.body.userID }, (err, user) => {
    if (err) res.status(500).json({ success: false, message: err.message });
    if (user === null) {
      res.status(401).json({ success: false, message: 'User does not exist' });
    } else {
      const newMessage = new Message(req.body);
      newMessage.senderId = req.decode.id;
      newMessage.from = req.decode.username;
      newMessage.receiverId = req.body.userID;
      newMessage.save((err, naming) => {
        if (err) {
          res.status(400).json({ success: false, message: err.message });
        } else {
          res.status(200).json({ success: true, message: 'Message posted' });
        }
      });
    }
  });
});

messages.get('/', (req, res) => {
  Message.find({ receiverId: req.decode.id }, (err, usersMessages) => {
    if (err) {
      res.status(500).json({ success: false, message: err.message });
    } else {
      res.status(200).json({
        success: true,
        message: 'Here are your message!',
        content: usersMessages,
      });
    }
  });
});

messages.get('/:messageId', (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.messageId)) {
    Message.findOne({ _id: req.params.messageId }, (err, message) => {
      if (err) {
        res.status(500).json({ success: false, message: err.message });
      } else {
        console.log('ICI', message);
        res.status(200).json({
          success: true,
          message: 'Here are your message!',
          content: message,
        });
      }
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Message ID not valid !',
    });
  }
});

messages.put('/:messageId', (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.messageId)) {
    Message.findByIdAndUpdate(
      req.params.messageId,
      {
        $set: {
          read: true,
          readDate: req.body.readDate,
        },
      },
      (err, doc) => {
        if (err) {
          res.status(500).json({ success: false, message: err.message });
        } else {
          res.status(200).json({
            success: true,
            message: 'Message Updated !',
          });
        }
      },
    );
  } else {
    res.status(400).json({
      success: false,
      message: 'Message ID not valid !',
    });
  }
});

export default messages;
