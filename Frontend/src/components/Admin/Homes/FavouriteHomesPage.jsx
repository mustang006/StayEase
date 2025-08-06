import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import PropertyCard from './../../homes/PropertyCard';

const FavouriteHomesPage = () => {
  const [favouriteHomes, setFavouriteHomes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavouriteHomes();
  }, []);

  const fetchFavouriteHomes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/favourites");
      setFavouriteHomes(res.data.favouriteHomes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching favourites:", error);
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="p-6 text-white font-urbanist"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-6">Favourite Homes</h1>

      {loading ? (
        <div className="text-center mt-10 text-lg text-[#A8C5FF]">Loading favourites...</div>
      ) : favouriteHomes.length === 0 ? (
        <div className="text-center mt-10 text-lg text-gray-400">No homes marked as favourites yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favouriteHomes.map(home => (
            <PropertyCard key={home.id} home={home} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default FavouriteHomesPage;
