import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "../components/Admin/Sidebar";
import DashboardPage from "../components/Admin/Dashboard/DashboardPage";
import ManageHomesPage from "../components/Admin/Homes/ManageHomesPage";
import FavouriteHomesPage from "../components/Admin/Homes/FavouriteHomesPage";
import UsersPage from "../components/Admin/Users/UsersPage";
import axios from "axios";
import BookingsPage from "../components/Admin/Homes/BookingsPage";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />;
      case "homes":
        return <ManageHomesPage />;
      case "favourites":
        return <FavouriteHomesPage />;
      case "users":
        return <UsersPage />;
      case "bookings": // ✅ Add this
        return <BookingsPage />; // ✅ Point to the new Bookings page
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0D1117] text-white font-urbanist">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 overflow-y-auto p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
