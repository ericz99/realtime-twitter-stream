import dotenv from 'dotenv';

// # check for .env file
if (!dotenv.config()) {
  throw new Error('Please create a .env file in /packages/server');
}

// # export config
export const {
  port = process.env.PORT || 8080,
  backlog = '0.0.0.0',
  mongoUri = process.env.MONGO_URI,
  consumerKey = process.env.CONSUMER_KEY,
  consumerSecret = process.env.CONSUMER_SECRET,
  accessToken = process.env.ACCESS_TOKEN,
  accessSecret = process.env.ACCESS_SECRET,
  api = {
    prefix: '/api'
  }
} = process.env;
