import mongoose from 'mongoose';
import Cabin from './cabins.model';
import Guest from './guests.model';

const bookingSchema = new mongoose.Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    numNights: { type: Number, required: true },
    numGuests: { type: Number, required: true },
    cabinPrice: { type: Number, required: true },
    extrasPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true },
    hasBreakfast: { type: Boolean },
    isPaid: { type: Boolean },
    observations: { type: String },

    cabin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: Cabin,
    },
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: Guest,
    },
  },
  { timestamps: true }
);
