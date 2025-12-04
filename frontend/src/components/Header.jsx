import { Fragment, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import logo from "../assets/logo.svg";
import ModalUser from "./ModalUser";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const storedUser = sessionStorage.getItem("User");

  let userImage = null;
  let userName = null;

  if (storedUser) {
    const decoded = jwtDecode(storedUser);
    userImage = decoded.userImage;
    userName = decoded.name;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";
  const isTransparent = isHome && !isScrolled;

  const headerClassName = isHome
    ? `flex justify-between w-screen items-center px-12 py-6 fixed top-0 left-0 z-50 transition-all duration-300 ${
        isTransparent ? "bg-transparent backdrop-blur-sm" : "bg-spring shadow-md"
      }`
    : "flex justify-between bg-spring w-screen items-center px-12 py-6 sticky top-0 z-50 shadow-md transition-all duration-300";

  const navItemClass = isTransparent
    ? "relative text-first-frost montserrat-semibold text-lg transition-colors duration-300 hover:text-spring after:content-[''] after:absolute after:bg-spring after:h-[2px] after:w-0 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
    : "relative text-serpentine montserrat-semibold text-lg transition-colors duration-300 hover:text-ivy after:content-[''] after:absolute after:bg-ivy after:h-[2px] after:w-0 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full";

  const ulClassName = "flex space-x-10 items-center";

  return (
    <Fragment>
      <header className={headerClassName}>
        <Link to="/" className="hover:scale-105 transition-transform duration-300">
          <img src={logo} alt="Logo" className="h-12 drop-shadow-md" />
        </Link>
        
        <nav>
          <ul className={ulClassName}>
            <li><Link to="/" className={navItemClass}>Home</Link></li>
            <li><Link to="/business-mode" className={navItemClass}>Business Mode</Link></li>
            <li><Link to="/about-us" className={navItemClass}>About Us</Link></li>
            <li><Link to="/nearby" className={navItemClass}>Nearby</Link></li>
            <li><Link to="/bookmark" className={navItemClass}>Bookmark</Link></li>
          </ul>
        </nav>

        {storedUser ? (
          <div className="relative group">
            <img
              src={userImage}
              alt="User"
              className="w-12 h-12 rounded-full object-cover border-2 border-white cursor-pointer shadow-lg transition-transform duration-300 transform group-hover:scale-110 group-hover:ring-2 ring-ivy"
              onClick={() => setShowModal(true)}
            />
          </div>
        ) : (
          <button
            className="py-2.5 px-8 bg-ivy rounded-full montserrat-semibold text-first-frost cursor-pointer shadow-lg transition-all duration-300 hover:bg-serpentine hover:shadow-xl hover:-translate-y-1 active:scale-95"
            onClick={() => setShowModal(true)}
          >
            Login
          </button>
        )}
      </header>
      <ModalUser isVisible={showModal} onClose={() => setShowModal(false)} />
    </Fragment>
  );
}

export default Header;