import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import * as LucideIcons from "lucide-react";
import { Star, Heart } from "lucide-react";

import Header from "../components/FirstPage/Header";
import Notification from "../components/AllHomes/Notification";
import mockGuests from "../components/Admin/utils/mockGuests";

const HomeDetailsPage = () => {
  const { id } = useParams();
  const [home, setHome] = useState(null);
  const [isFavourited, setIsFavourited] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isBooked, setIsBooked] = useState(false); // ✅ Track if already booked

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/homes/${id}`)
      .then((res) => {
        const data = res.data.home;

        // Handle details format
        let iconifiedDetails = [];

        if (Array.isArray(data.details)) {
          iconifiedDetails = data.details.map((detail) => ({
            label: detail.label,
            icon: LucideIcons[detail.icon] || LucideIcons.Dot,
          }));
        } else if (typeof data.details === "object") {
          iconifiedDetails = Object.entries(data.details).map(
            ([key, value]) => {
              const label = `${value} ${
                key.charAt(0).toUpperCase() + key.slice(1)
              }`;
              const iconMap = {
                beds: LucideIcons.BedDouble,
                baths: LucideIcons.Bath,
                area: LucideIcons.Ruler,
              };
              return {
                label,
                icon: iconMap[key] || LucideIcons.Dot,
              };
            }
          );
        }

        setHome({
          ...data,
          isGuestFavourite: data.isGuestFavourite === 1,
          images: data.images?.length
            ? data.images
            : [data.image || "https://via.placeholder.com/800x600"],
          details: iconifiedDetails,
        });

        // Check if home is already booked
        axios.get("http://localhost:5000/api/bookings").then((res) => {
          const bookings = res.data.bookings;
          const alreadyBooked = bookings.some((b) => b.homeId === data.id);
          setIsBooked(alreadyBooked);
        });

        // Check if it's favourited
        axios.get("http://localhost:5000/api/users/homes/favourites").then((favRes) => {
          const favouriteHomes = favRes.data.favouriteHomes || [];
          const isFav = favouriteHomes.some((h) => h.id === data.id);
          setIsFavourited(isFav);
        });
      })
      .catch((err) => console.error("Failed to fetch home:", err));
  }, [id]);

  const onToggleFavourite = async () => {
    try {
      if (!isFavourited) {
        await axios.post(`http://localhost:5000/api/users/homes/favourites`, {
          id: home.id,
        });
        setIsFavourited(true);
      } else {
        await axios.post(
          `http://localhost:5000/api/users/homes/favourites/delete/${home.id}`
        );
        setIsFavourited(false);
      }
    } catch (error) {
      console.error("Failed to toggle favourite:", error);
    }
  };

  const handleBooking = async () => {
    try {
      const guest = mockGuests[Math.floor(Math.random() * mockGuests.length)];
      const checkInDate = new Date(guest.checkIn);
      const checkOutDate = new Date(guest.checkOut);
      const nights = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );
      const totalAmount = home.price * nights;

      const bookingPayload = {
        homeId: home.id,
        guestName: guest.guestName,
        guestEmail: guest.guestEmail,
        checkIn: guest.checkIn,
        checkOut: guest.checkOut,
        amount: totalAmount,
      };

      await axios.post("http://localhost:5000/api/book-home", bookingPayload);

      console.log("Booking successful:", bookingPayload);
      setNotification(home);
      setIsBooked(true); // ✅ Mark as booked
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    }
  };

  const closeNotification = () => setNotification(null);

  if (!home)
    return <div className="text-white p-10 text-center">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#0D1117] min-h-screen text-white"
    >
      <Header />

      {/* Booking Notification */}
      <div className="fixed top-0 right-0 z-50 p-4">
        <AnimatePresence>
          {notification && (
            <Notification home={notification} onClose={closeNotification} />
          )}
        </AnimatePresence>
      </div>

      <img
        src={home.images[0]}
        alt={home.title}
        className="w-full h-[60vh] object-cover"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 p-8 rounded-2xl border border-white/10 bg-[#12131C]/60 backdrop-blur-xl shadow-2xl">
            <div className="flex justify-between flex-col sm:flex-row items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold">{home.title}</h1>
                <p className="text-[#C5C8D7]">{home.location}</p>
              </div>
              <div className="flex gap-4 mt-4 sm:mt-0 items-center">
                <span className="text-xl font-semibold text-[#A8C5FF]">
                  ₹{parseInt(home.price).toLocaleString("en-IN")} / night
                </span>
                <span className="flex items-center text-lg gap-1">
                  <Star className="text-yellow-400" size={20} /> {home.rating}
                </span>
              </div>
            </div>

            {home.isGuestFavourite && (
              <span className="inline-block bg-[#5A80E9]/10 text-[#A8C5FF] px-4 py-1 rounded-full text-sm font-semibold border border-[#5A80E9]/30 shadow-[0_0_15px_rgba(90,128,233,0.3)]">
                Guest Favourite
              </span>
            )}

            <p className="my-6 text-[#C5C8D7]">{home.description}</p>

            {/* Details with Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {home.details?.map((detail, index) => {
                const Icon = detail.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#1A1B2E]/50"
                  >
                    <Icon className="text-[#A8C5FF]" size={24} />
                    <span>{detail.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 sticky top-28 p-8 rounded-2xl border border-white/10 bg-[#12131C]/60 backdrop-blur-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Ready to book?</h2>

            <button
              onClick={onToggleFavourite}
              className="w-full mb-4 flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition"
            >
              <Heart
                className={
                  isFavourited ? "text-red-500 fill-current" : "text-white"
                }
                size={20}
              />
              {isFavourited ? "Favourited" : "Add to Favourites"}
            </button>

            <button
              onClick={handleBooking}
              disabled={isBooked}
              className={`w-full py-4 rounded-lg text-white font-bold transition-all duration-300 ${
                isBooked
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#5A80E9] hover:shadow-[0_0_25px_rgba(90,128,233,0.6)]"
              }`}
            >
              {isBooked ? "Already Booked" : "Book Now"}
            </button>
          </div>
        </div>

        {/* Gallery */}
        {home.images.length > 1 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Gallery</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {home.images.slice(1).map((img, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-80 h-52 rounded-xl overflow-hidden"
                >
                  <img
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HomeDetailsPage;
