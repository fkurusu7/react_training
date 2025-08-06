import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      lowercase: true,
      minlength: [3, 'fullname must be 3 letters long'],
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      minlength: [3, 'fullname must be 3 letters long'],
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
