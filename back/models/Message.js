import mongoose from "mongoose";
import mongooseTypeEmail from "mongoose-type-email";
import bcrypt from "bcrypt";

let MessageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  },
  readDate: {
    type: Date,
    default: null
  },
  senderId: {
    type: String
  },
  receiverId: {
    type: String
  }
});

export default mongoose.model("Message", MessageSchema);
