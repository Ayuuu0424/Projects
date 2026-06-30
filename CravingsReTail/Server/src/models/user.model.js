import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
      enum: ["customer", "restaurant", "rider"],
    },

    password: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("user", UserSchema);

export default User;
