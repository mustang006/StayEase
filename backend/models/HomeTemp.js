// models/Home.js
import mongoose from "mongoose";

const detailSchema = new mongoose.Schema({
  icon: String,
  label: String,
});

const homeSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  isGuestFavourite: { type: Boolean, default: false },
  image: { type: String, required: true },
  images: [String],
  description: { type: String },
  details: [detailSchema],
});

const Home = mongoose.model("Home", homeSchema);

export default Home;
