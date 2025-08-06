import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import HomeFormModal from './HomeFormModal';
import SearchBar from '../../homes/SearchBar'; // ✅ import the search bar

const ManageHomesPage = () => {
  const [homes, setHomes] = useState([]);
  const [filteredHomes, setFilteredHomes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHome, setEditingHome] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchHomes = async () => {
    try {
      const res = await fetch("http://localhost:5000/host/homes");
      const data = await res.json();
      setHomes(data.homes);
      setFilteredHomes(data.homes); // ✅ initialize filtered list
    } catch (err) {
      console.error("Error fetching homes:", err);
    }
  };

  useEffect(() => {
    fetchHomes();
  }, []);

  const handleSearch = (query) => {
    setSearchTerm(query);
    const filtered = homes.filter((home) =>
      home.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredHomes(filtered);
  };

  const handleSaveHome = async (homeData) => {
    const url = homeData.id
      ? "http://localhost:5000/host/edit-home"
      : "http://localhost:5000/host/add-home";

    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(homeData),
      });
      fetchHomes();
      setIsModalOpen(false);
      setEditingHome(null);
    } catch (err) {
      console.error("Error saving home:", err);
    }
  };

  const handleDeleteHome = async (id) => {
    try {
      await fetch(`http://localhost:5000/host/delete-home/${id}`, {
        method: "POST",
      });
      fetchHomes();
    } catch (err) {
      console.error("Error deleting home:", err);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white font-['Urbanist']">Manage Homes</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            console.log("Opening Add Home Modal");
            setEditingHome(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5A80E9] text-white font-semibold shadow-[0_0_15px_rgba(90,128,233,0.4)]"
        >
          <PlusCircle size={20} /> Add Home
        </motion.button>
      </div>

      {/* ✅ SearchBar Component */}
      <SearchBar onSearch={handleSearch} />

      {/* ✅ Filtered Homes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHomes.map((home) => (
          <motion.div key={home.id} layout className="bg-[#1A1B2E]/50 backdrop-blur-md border border-[#5A80E9]/20 rounded-xl overflow-hidden">
            <img src={home.image} alt={home.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg text-white truncate">{home.title}</h3>
              <p className="text-sm text-[#C5C8D7]">{home.location}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="font-semibold text-white">₹{home.price}</span>
                <div className="flex gap-4">
                  <button onClick={() => { setEditingHome(home); setIsModalOpen(true); }} className="text-[#A8C5FF] hover:text-white"><Edit size={18} /></button>
                  <button onClick={() => handleDeleteHome(home.id)} className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <HomeFormModal
            home={editingHome}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveHome}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageHomesPage;
