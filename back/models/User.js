import mongoose from 'mongoose';
import mongooseTypeEmail from 'mongoose-type-email';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  civility: {
    type: String,
    defaut: null,
  },
  firstName: {
    type: String,
    defaut: null,
  },
  lastName: {
    type: String,
    defaut: null,
  },
  address: {
    country: {
      type: String,
      default: null,
    },
    region: {
      type: String,
      default: null,
    },
    departement: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    street: {
      type: String,
      default: null,
    },
    postal: {
      type: String,
      default: null,
    },
    longitude: {
      type: Number,
      default: null,
    },
    latitude: {
      type: Number,
      default: null,
    },
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  lastUpdateDate: {
    type: Date,
    default: null,
  },
});

UserSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', UserSchema);
