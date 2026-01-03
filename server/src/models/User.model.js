import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
       default: null
    },

    phone: {
      type: String,
     default: null
    },

    address: {
      type: String,
       default: null
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
      isProfileComplete: {
    type: Boolean,
    default: false,
  },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
