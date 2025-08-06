import React from 'react';

const SearchBar = ({ onSearch }) => (
  <div className="w-full max-w-3xl mx-auto my-8">
    <input
      type="text"
      placeholder="Search by location (e.g., Goa, Manali, Mumbai...)"
      onChange={(e) => onSearch(e.target.value)}
      className="w-full p-4 bg-[#1A1B2E]/50 backdrop-blur-sm border border-[#5A80E9]/30 rounded-full text-center text-lg text-[#C5C8D7] placeholder-[#C5C8D7]/50 focus:outline-none focus:ring-2 focus:ring-[#5A80E9] transition-all duration-300 shadow-[0_0_20px_rgba(90,128,233,0.1)]"
    />
  </div>
);

export default SearchBar;