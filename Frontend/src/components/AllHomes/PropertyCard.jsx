import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PropertyCard = ({ home, onBook }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="group relative rounded-2xl overflow-hidden bg-[#1A1B2E]/50 backdrop-blur-md border border-[#5A80E9]/20 transition-all duration-300"
    >
      {/* 🔗 Wrap clickable image area with Link */}
      <Link to={`/homes/${home.id}`}>
        <motion.div
          className="relative"
          style={{ transformStyle: 'preserve-3d' }}
          whileHover={{
            rotateY: 8,
            rotateX: -3,
            transition: { duration: 0.3, ease: 'easeOut' },
          }}
        >
          <img
            src={home.image}
            alt={home.title}
            className="w-full h-52 object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-all duration-500 group-hover:from-black/20 group-hover:bg-[#5A80E9]/10" />
          {home.isGuestFavourite && (
            <div className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white bg-[#5A80E9]/80 rounded-full shadow-[0_0_10px_rgba(90,128,233,0.5)]">
              Guest Favourite
            </div>
          )}
        </motion.div>
      </Link>

      <div className="p-4">
        <h3 className="text-lg font-bold font-['Urbanist'] text-[#F1F1F1] truncate">
          {home.title}
        </h3>
        <p className="text-[#C5C8D7] text-sm mt-1">{home.location}</p>
        <div className="flex justify-between items-center mt-3">
          <p className="text-md font-semibold text-white">
            ₹{parseInt(home.price).toLocaleString('en-IN')}{' '}
            <span className="text-xs font-normal text-[#C5C8D7]">/ 2 nights</span>
          </p>
          <p className="text-md font-semibold text-[#A8C5FF]">★ {home.rating}</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
        <button
          onClick={() => onBook(home)}
          className="w-full py-2.5 text-md font-bold text-white bg-[#5A80E9]/90 rounded-lg border-2 border-transparent hover:border-[#A8C5FF] hover:animate-pulse transition-all duration-300 shadow-[0_0_15px_rgba(90,128,233,0.3)]"
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
