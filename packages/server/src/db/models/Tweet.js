import mongoose, { Schema } from 'mongoose';

const tweetSchema = new Schema({
  tweetID: Number,
  tweet: String,
  from: { type: Schema.Types.ObjectId, ref: 'account' },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('tweet', tweetSchema);
