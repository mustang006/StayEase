// controllers/userController.js

import Home from "../models/HomeTemp.js";
import User from "../models/User.js";


export const getAllHomes = async (req, res) => {
  try {
    const homes = await Home.find();
    res.json(homes);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};
// routes/homeRoutes.js or wherever your routes are

// controllers/homeController.js
export const getHomeById = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id); // or however you fetch it

    if (!home) {
      return res.status(404).json({ message: "Home not found" });
    }

    res.json({ home }); // ✅ This works
  } catch (error) {
    console.error("Error fetching home:", error);
    res.status(500).json({ message: "Server error" });
  }
};
import Home from "../models/HomeTemp.js";
import User from "../models/User.js";

// Get all favourite homes
export const getFavourites = async (req, res) => {
  try {
    const user = await User.findById(userId).populate('favourites');
    res.status(200).json({ favouriteHomes: user.favourites });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch favourites' });
  }
};

export const addToFavourites = async (req, res) => {
  try {
    const userId = req.user._id; // from protect middleware
    const { id } = req.body; // home id

    // Check if home exists
    const home = await Home.findById(id);
    if (!home) {
      return res.status(404).json({ message: "Home not found" });
    }

    const user = await User.findById(userId);

    // Avoid duplicates
    if (user.favourites.includes(id)) {
      return res.status(400).json({ message: "Already in favourites" });
    }

    user.favourites.push(id);
    await user.save();

    res.status(200).json({ message: "Added to favourites", favourites: user.favourites });
  } catch (error) {
    console.error("Error adding to favourites:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromFavourites = async (req, res) => {
  try {
    const userId = req.user._id;
    const { homeId } = req.params;

    const user = await User.findById(userId);

    user.favourites = user.favourites.filter(
      (favId) => favId.toString() !== homeId
    );

    await user.save();

    res.status(200).json({ message: "Removed from favourites", favourites: user.favourites });
  } catch (error) {
    console.error("Error removing from favourites:", error);
    res.status(500).json({ message: "Server error" });
  }
};
