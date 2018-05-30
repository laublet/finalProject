import mongoose from 'mongoose';
import mongooseTypeEmail from 'mongoose-type-email';
import bcrypt from 'bcrypt';

const MessageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
  readDate: {
    type: Date,
    default: null,
  },
  senderId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Message', MessageSchema);
