import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Home, Users, Heart } from 'lucide-react';

const StatCard = ({ title, value, icon, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-[#1A1B2E]/50 backdrop-blur-md border border-[#5A80E9]/20 p-6 rounded-xl flex items-center gap-6"
  >
    <div className="p-4 rounded-full" style={{ backgroundColor: `${color}20`, color: color, border: `1px solid ${color}50` }}>
      {icon}
    </div>
    <div>
      <p className="text-lg text-[#C5C8D7]">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  </motion.div>
);

const DashboardPage = () => {
  const [totalHomes, setTotalHomes] = useState(0);
  const [favouriteCount, setFavouriteCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0); // Placeholder/mock for now

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const homeRes = await axios.get("http://localhost:5000/api/homes");
      const favRes = await axios.get("http://localhost:5000/api/favourites");

      setTotalHomes(homeRes.data.registeredHomes.length);
      setFavouriteCount(favRes.data.favouriteHomes.length);
      setTotalUsers(13); // Replace with real API call if needed
    } catch (err) {
      console.error("Dashboard stats error:", err);
    }
  };

  return (
    <motion.div className="p-6 text-white font-urbanist" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Homes" value={totalHomes} icon={<Home size={28} />} color="#5A80E9" />
        <StatCard title="Total Users" value={totalUsers} icon={<Users size={28} />} color="#34D399" />
        <StatCard title="Favourite Homes" value={favouriteCount} icon={<Heart size={28} />} color="#F472B6" />
      </div>
    </motion.div>
  );
};

export default DashboardPage;
