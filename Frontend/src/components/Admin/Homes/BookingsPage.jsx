import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      const data = await res.data;
      setBookings(data.bookings || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/booking/${id}`);
      fetchBookings();
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-white px-6 py-10"
    >
      <h1 className="text-4xl font-bold mb-10 font-['Urbanist']">
        All Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-[#C5C8D7]">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              onClick={() => navigate(`/home/${booking.homeId}`)}
              className="cursor-pointer bg-[#1A1B2E]/60 border border-[#5A80E9]/20 p-6 rounded-xl shadow-md hover:bg-[#1A1B2E]/80 transition-all duration-200"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{booking.guestName}</h3>
                <p className="text-sm text-[#C5C8D7]">
                  <strong>Email:</strong> {booking.guestEmail}
                </p>
                <p className="text-sm text-[#C5C8D7]">
                  <strong>Home ID:</strong> {booking.homeId}
                </p>
                <p className="text-sm text-[#C5C8D7]">
                  <strong>Check-in:</strong> {booking.checkIn}
                </p>
                <p className="text-sm text-[#C5C8D7]">
                  <strong>Check-out:</strong> {booking.checkOut}
                </p>
                <p className="text-sm text-[#C5C8D7]">
                  <strong>Amount:</strong> ₹{parseFloat(booking.amount).toFixed(2)}
                </p>
                <p className="text-xs text-[#888]">
                  <strong>Booked on:</strong>{" "}
                  {new Date(booking.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent card navigation
                    handleDeleteBooking(booking.id);
                  }}
                  className="text-red-400 hover:text-red-200"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default BookingsPage;
