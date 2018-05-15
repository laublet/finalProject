import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
// Connect to Database
const connection = () => {
  mongoose.connect(process.env.MONGOURL, {}, (err) => {
    if (err) {
      throw err;
    } else {
      console.log(`Connection to the Database etablished ${process.env.MONGOURL}...`);
    }
  });
};

export default connection;
