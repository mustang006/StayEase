import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import HomeIcon from "./../icons/HomeIcon";
import { classNames } from "./../../utils/classNames";
import { auth } from "../AuthSystem/config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const userName = currentUser?.displayName;
  const isAdmin = currentUser?.email === "itsmeabhishek65@gmail.com";

  return (
    <header
      className={classNames(
        "fixed top-0 left-0 right-0 z-50 h-20 transition-transform duration-500 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xl"></div>
      <nav className="relative z-10 h-full flex items-center justify-between px-8 max-w-[1920px] mx-auto">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="animated-icon-container">
            <HomeIcon className="animated-home-icon w-8 h-8 text-white" />
            <div className="glowing-line"></div>
          </div>
          <span className="text-3xl font-bold text-[#F1F1F1] tracking-wider">
            StayEase
          </span>
        </div>

        <div className="flex items-center gap-8 text-[#C5C8D7]">
          <NavLink
            to="/homes"
            className={({ isActive }) =>
              classNames(
                "nav-link relative text-base font-medium tracking-wide transition-colors duration-300",
                isActive ? "text-white" : "hover:text-white"
              )
            }
          >
            Homes
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              classNames(
                "nav-link relative text-base font-medium tracking-wide transition-colors duration-300",
                isActive ? "text-white" : "hover:text-white"
              )
            }
          >
            Services
          </NavLink>

          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                classNames(
                  "nav-link relative text-base font-medium tracking-wide transition-colors duration-300",
                  isActive ? "text-white" : "hover:text-white"
                )
              }
            >
              Admin
            </NavLink>
          )}

          <div className="w-px h-6 bg-white/20"></div>

          {/* ✅ Show user's name if available */}
          {userName && (
            <span className="text-white font-medium">{userName}</span>
          )}

          <UserMenu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
