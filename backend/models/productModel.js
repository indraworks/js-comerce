import mongoose from 'mongoose';

const reviewschema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5,
    },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, default: 0.0, required: true },
    numReviews: { type: Number, default: 0, required: true },
    reviews: [reviewSchema],
  },

  { timestamps }
);

const productModel = mongoose.model('Product', productSchema);
export default productModel;
