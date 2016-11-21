import mongoose from 'mongoose';

export default (ctx) => {
  const schema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      index: { unique: true },
      tolawecase: true,
      treim: true
    },
    password : {
      type: String
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    role: {
      type: String
    }
  }, {
    timestamp: true,
    collection: 'User'
  });

  return mongoose.model('User', schema);
}
