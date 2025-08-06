import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, BedDouble, Image as ImageIcon, MapPin } from 'lucide-react';

const HomeFormModal = ({ home, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: null,  // ✅ Fixed line
    title: '',
    location: '',
    price: '',
    rating: '',
    image: '',
    description: '',
    details: { beds: 1, baths: 1, area: 1000 },
    isGuestFavourite: false,
  });

  useEffect(() => {
    if (home) {
      setFormData(home);
    }
  }, [home]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("details.")) {
      const key = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        details: { ...prev.details, [key]: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-2xl bg-[#1A1B2E]/80 backdrop-blur-xl border border-[#5A80E9]/30 rounded-2xl p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white font-['Urbanist']">{home ? 'Edit Home' : 'Add New Home'}</h2>
          <button onClick={onClose} className="text-[#C5C8D7] hover:text-white"><X /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="p-3 bg-[#12131C]/60 border border-[#5A80E9]/30 rounded-lg" required />
            <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="p-3 bg-[#12131C]/60 border border-[#5A80E9]/30 rounded-lg" required />
            <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price (₹)" className="p-3 bg-[#12131C]/60 border border-[#5A80E9]/30 rounded-lg" required />
            <input name="rating" type="number" step="0.1" value={formData.rating} onChange={handleChange} placeholder="Rating (1-5)" className="p-3 bg-[#12131C]/60 border border-[#5A80E9]/30 rounded-lg" required />
            <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="md:col-span-2 p-3 bg-[#12131C]/60 border border-[#5A80E9]/30 rounded-lg" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="md:col-span-2 p-3 bg-[#12131C]/60 border border-[#5A80E9]/30 rounded-lg h-24" />
            <div className="flex items-center gap-2">
              <BedDouble size={18} className="text-[#A8C5FF]" />
              <input name="details.beds" type="number" value={formData.details.beds} onChange={handleChange} placeholder="Beds" className="w-full p-3 bg-[#12131C]/60 border border-[#5A80E9]/30 rounded-lg" />
            </div>
            <div className="flex items-center gap-2">
              <ImageIcon size={18} className="text-[#A8C5FF]" />
              <input name="details.baths" type="number" value={formData.details.baths} onChange={handleChange} placeholder="Baths" className="w-full p-3 bg-[#12131C]/60 border border-[#5A80E9]/30 rounded-lg" />
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-[#A8C5FF]" />
              <input name="details.area" type="number" value={formData.details.area} onChange={handleChange} placeholder="Area (sqft)" className="w-full p-3 bg-[#12131C]/60 border border-[#5A80E9]/30 rounded-lg" />
            </div>
            <label className="flex items-center gap-3 text-white">
              <input type="checkbox" name="isGuestFavourite" checked={formData.isGuestFavourite} onChange={handleChange} className="w-5 h-5 accent-[#5A80E9]" />
              Guest Favourite
            </label>
          </div>
          <div className="mt-8 flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg text-[#C5C8D7] hover:bg-white/10">Cancel</button>
            <motion.button type="submit" whileHover={{ scale: 1.05 }} className="px-6 py-2 rounded-lg bg-[#5A80E9] text-white font-semibold shadow-[0_0_15px_rgba(90,128,233,0.4)]">Save Home</motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default HomeFormModal;
