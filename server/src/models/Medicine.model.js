import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
    },
    image: {
  type: String, // Cloudinary URL
  required: true,
},
    isActive: {
      type: Boolean,
      default: true, // useful to disable medicine later
    },
   
  },
  { timestamps: true }
);

export default mongoose.model("Medicine", medicineSchema);
