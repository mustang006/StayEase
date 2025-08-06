// routes/homeRoutes.js
import express from "express";
import {
  getAllHomes,
  getHomeById,
  addToFavourites,
  removeFromFavourites,getFavourites
} from "../controller/userController.js";

const router = express.Router();
router.get("/homes", getAllHomes);                            // Get all homes
router.get("/homes/:id", getHomeById);                        // Get home by ID
router.post("/homes/favourites", addToFavourites);            // Add to favourites
router.post("/homes/favourites/delete/:homeId", removeFromFavourites); // Remove from favourites
router.get("/homes/favourites", getFavourites);               // Get all favourites

export default router;
