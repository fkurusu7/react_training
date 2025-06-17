import { Settings } from 'http2';
import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    minBookingLength: { type: Number, default: 3 },
    maxBookingLength: { type: Number, default: 90 },
    maxGuestsPerBooking: { type: Number, default: 8 },
    breakfastPrice: { type: Number, default: 15 },
  },
  { timestamps: true }
);

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
