import mongoose from 'mongoose';

const guestSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    nationality: { type: String, required: true },
    nationalId: { type: String, required: true },
    countryFlag: { type: String, required: true },
  },
  { timestamps: true }
);

const Guest = mongoose.model('Guest', guestSchema);
export default Guest;
