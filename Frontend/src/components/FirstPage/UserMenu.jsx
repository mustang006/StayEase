import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../AuthSystem/config/firebaseConfig';
import UserIcon from './../icons/UserIcon';
import { classNames } from './../../utils/classNames';
import toast from 'react-hot-toast';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Detect current logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out successfully");
    navigate('/');
    setIsOpen(false);
  };

  const handleMyAccount = () => {
    if (currentUser) {
      navigate(`/account/${currentUser.uid}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
      >
        <UserIcon className="w-6 h-6 text-white" />
      </button>

      <div className={classNames(
        "absolute top-14 right-0 w-48 bg-[#1A1B2E]/80 backdrop-blur-xl rounded-lg shadow-2xl border border-white/10 transition-all duration-300 ease-in-out",
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      )}>
        <div className="p-2">
          {!currentUser ? (
            <>
              <button
                onClick={() => { navigate('/auth'); setIsOpen(false); }}
                className="dropdown-item"
              >
                Login
              </button>
              <button
                onClick={() => { navigate('/auth'); setIsOpen(false); }}
                className="dropdown-item"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleMyAccount}
                className="dropdown-item"
              >
                My Account
              </button>

              <div className="h-px bg-white/10 my-1"></div>

              <button
                onClick={handleLogout}
                className="dropdown-item"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
