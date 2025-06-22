import mongoose from 'mongoose';

const cabinSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    // image: { type: String, required: true },
    image: { type: String },
    maxCapacity: { type: Number, required: true },
    regularPrice: { type: Number, required: true },
    discount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Cabin = mongoose.model('Cabin', cabinSchema);

export default Cabin;
