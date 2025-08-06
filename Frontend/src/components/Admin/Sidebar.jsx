import React from 'react';
import { LayoutDashboard, Home, Heart, Users, CalendarCheck } from 'lucide-react';
import { Link } from 'react-router-dom'; // ✅ Import Link

const Sidebar = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'homes', label: 'Manage Homes', icon: Home },
    { id: 'favourites', label: 'Favourites', icon: Heart },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
  ];

  return (
    <aside className="w-64 bg-[#12131C]/60 backdrop-blur-xl border-r border-[#5A80E9]/20 p-6 flex-shrink-0 min-h-screen">
      {/* ✅ Wrap StayEase in a Link to '/' */}
      <Link to="/" className="block mb-12">
        <h1 className="text-3xl font-bold font-['Urbanist'] text-white tracking-wider">
          Stay<span className="text-[#5A80E9]">Ease</span>
          <span className="block text-xs font-normal text-[#C5C8D7]">Admin Panel</span>
        </h1>
      </Link>

      <nav>
        <ul>
          {navItems.map(item => (
            <li key={item.id} className="mb-4">
              <button
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center p-3 rounded-lg transition-all duration-300 ${
                  activePage === item.id
                    ? 'bg-[#5A80E9]/20 text-white'
                    : 'text-[#C5C8D7] hover:bg-[#5A80E9]/10 hover:text-white'
                }`}
              >
                <item.icon className="mr-4" size={20} />
                <span className="font-semibold">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
