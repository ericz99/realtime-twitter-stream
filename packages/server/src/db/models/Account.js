import mongoose, { Schema } from 'mongoose';

const accountSchema = new Schema({
  accountName: String,
  accountID: String,
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('account', accountSchema);
