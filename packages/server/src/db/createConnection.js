import mongoose from 'mongoose';

// # import our config
import { mongoUri } from '../config';

// # opts for our database connection
const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  useCreateIndex: true
};

export default async () => {
  try {
    // # connect to our database
    return await mongoose
      .connect(mongoUri, opts)
      .then(console.log('Successfully connected to database!'))
      .catch(console.error);
  } catch (e) {
    if (e) {
      throw new Error(e);
    }
  }
};
