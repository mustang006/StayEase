// src/components/Admin/UsersPage.jsx

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((res) => res.json())
      .then((data) => {
        if (data.users) setUsers(data.users);
      })
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-4xl font-bold text-white mb-8 font-['Urbanist']">Manage Users</h1>
      <div className="bg-[#1A1B2E]/50 backdrop-blur-md border border-[#5A80E9]/20 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="border-b border-[#5A80E9]/20">
            <tr>
              <th className="p-4 text-white">Name</th>
              <th className="p-4 text-white">Email</th>
              <th className="p-4 text-white">Joined Date</th>
              <th className="p-4 text-white">Favorites</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-[#5A80E9]/10">
                <td className="p-4 text-[#F1F1F1]">{user.name}</td>
                <td className="p-4 text-[#C5C8D7]">{user.email}</td>
                <td className="p-4 text-[#C5C8D7]">{user.joined}</td>
                <td className="p-4 text-[#C5C8D7]">{user.favorites}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UsersPage;
