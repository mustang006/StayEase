import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
      enum: ["user", "admin"],
      default: "user",
    },

    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Home", // Make sure your Home model is named "Home"
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

// Optional: pre-save hashing can be added here if needed
// Optional: password compare method can also be added

const User = mongoose.model("User", userSchema);

export default User;
