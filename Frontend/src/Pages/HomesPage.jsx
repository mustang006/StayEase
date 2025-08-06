import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import Header from "../components/FirstPage/Header";
import Footer from "../components/FirstPage/Footer";
import SearchBar from "../components/AllHomes/SearchBar";
import Notification from "../components/AllHomes/Notification";
import BackToTopButton from "../components/AllHomes/BackToTopButton";
import CategorySection from "../components/AllHomes/CategorySection";

import mockGuests from "../components/Admin/utils/mockGuests";

const HomesPage = () => {
  const [homesData, setHomesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);

  // ✅ Booking handler
  const handleBooking = async (home) => {
    try {
      const guest = mockGuests[Math.floor(Math.random() * mockGuests.length)];

      const checkInDate = new Date(guest.checkIn);
      const checkOutDate = new Date(guest.checkOut);
      const nights = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );
      const totalAmount = home.price * nights;

      const bookingPayload = {
        homeId: home.id, // ✅ id mapped from MongoDB's _id
        guestName: guest.guestName,
        guestEmail: guest.guestEmail,
        checkIn: guest.checkIn,
        checkOut: guest.checkOut,
        amount: totalAmount,
      };

      await axios.post("http://localhost:5000/api/book-home", bookingPayload);

      console.log("Booking successful:", bookingPayload);
      setNotification(home);
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed. Please try again.");
    }
  };

  const closeNotification = () => {
    setNotification(null);
  };

  // ✅ Fetch homes from MongoDB backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/homes")
      .then((res) => {
        const registeredHomes = res.data; // ✅ This is already an array

        if (!Array.isArray(registeredHomes)) {
          console.error(
            "Invalid data format: 'registeredHomes' is not an array"
          );
          return;
        }

        const data = registeredHomes.map((home) => ({
          id: home._id,
          title: home.title,
          location: home.location,
          price: home.price,
          rating: home.rating,
          image: home.image,
          images: home.images || [],
          description: home.description || "No description available.",
          details: home.details || [],
          isGuestFavourite: home.isGuestFavourite || false,
          category:
            home.price < 5000
              ? "Affordable"
              : home.price <= 10000
              ? "Pricier"
              : "Luxury",
        }));

        setHomesData(data);
      })
      .catch((err) => console.error("Failed to fetch homes:", err));
  }, []);

  const filteredHomes = useMemo(() => {
    if (!searchQuery) return homesData;
    return homesData.filter((home) =>
      home.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, homesData]);

  const affordableHomes = filteredHomes.filter((h) => h.price < 5000);
  const pricierStays = filteredHomes.filter(
    (h) => h.price >= 5000 && h.price <= 10000
  );
  const luxuryVillas = filteredHomes.filter((h) => h.price > 10000);

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F1F1F1] font-['Inter']">
      <Header />

      {/* Notification */}
      <div className="fixed top-0 right-0 z-50 p-4">
        <AnimatePresence>
          {notification && (
            <Notification home={notification} onClose={closeNotification} />
          )}
        </AnimatePresence>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-extrabold font-['Urbanist'] tracking-tight text-white"
            style={{
              textShadow:
                "0 0 15px rgba(90, 128, 233, 0.5), 0 0 30px rgba(90, 128, 233, 0.3)",
            }}
          >
            Find Your Perfect Stay
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-4 text-lg md:text-xl text-[#C5C8D7]"
          >
            Discover curated luxury homes and villas for your next unforgettable
            getaway.
          </motion.p>
        </div>

        <SearchBar onSearch={setSearchQuery} />

        <CategorySection
          title="Affordable Homes"
          homes={affordableHomes}
          onBook={handleBooking}
        />
        <CategorySection
          title="Pricier Stays"
          homes={pricierStays}
          onBook={handleBooking}
        />
        <CategorySection
          title="Luxury Villas"
          homes={luxuryVillas}
          onBook={handleBooking}
        />

        {filteredHomes.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-[#C5C8D7]">
              No homes found for "{searchQuery}"
            </h2>
            <p className="mt-2 text-[#C5C8D7]/70">
              Try searching for another location or clearing your search.
            </p>
          </div>
        )}
      </main>

      <BackToTopButton />
      <Footer />
    </div>
  );
};

export default HomesPage;
