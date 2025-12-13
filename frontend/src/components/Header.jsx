import { Fragment, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import logo from "../assets/logo.svg";
import ModalUser from "./ModalUser";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User } from "react-feather";

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isHome = location.pathname === "/";
  const isTransparent = isHome && !isScrolled && !isMobileMenuOpen;

  const headerClassName = isHome
    ? `flex justify-between w-full items-center px-6 md:px-12 py-4 md:py-6 fixed top-0 left-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent backdrop-blur-sm"
          : "bg-spring shadow-md"
      }`
    : "flex justify-between bg-spring w-full items-center px-6 md:px-12 py-4 md:py-6 sticky top-0 z-50 shadow-md transition-all duration-300";

  const navItemClass = isTransparent
    ? "relative text-first-frost montserrat-semibold text-lg transition-colors duration-300 hover:text-spring after:content-[''] after:absolute after:bg-spring after:h-[2px] after:w-0 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
    : "relative text-serpentine montserrat-semibold text-lg transition-colors duration-300 hover:text-ivy after:content-[''] after:absolute after:bg-ivy after:h-[2px] after:w-0 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full";

  const mobileNavItemClass =
    "text-2xl font-montserrat-bold text-serpentine hover:text-ivy transition-colors";

  return (
    <Fragment>
      <header className={headerClassName}>
        <Link
          to="/"
          className="hover:scale-105 transition-transform duration-300 z-50">
          <img src={logo} alt="Logo" className="h-10 md:h-12 drop-shadow-md" />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex space-x-10 items-center">
            <li>
              <Link to="/" className={navItemClass}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/business-mode" className={navItemClass}>
                Business Mode
              </Link>
            </li>
            <li>
              <Link to="/about-us" className={navItemClass}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/nearby" className={navItemClass}>
                Nearby
              </Link>
            </li>
            <li>
              <Link to="/bookmark" className={navItemClass}>
                Bookmark
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4 z-50">
          {storedUser ? (
            <div className="relative group hidden md:block">
              <div
                className="w-12 h-12 rounded-full border-2 border-white cursor-pointer shadow-lg
               transition-transform duration-300 transform
               group-hover:scale-110 group-hover:ring-2 ring-ivy
               overflow-hidden flex items-center justify-center bg-gray-200"
                onClick={() => setShowModal(true)}>
                {userImage ? (
                  <img
                    src={userImage}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={20} className="text-serpentine" />
                )}
              </div>
            </div>
          ) : (
            <button
              className="hidden md:block py-2.5 px-8 bg-ivy rounded-full montserrat-semibold text-first-frost cursor-pointer shadow-lg transition-all duration-300 hover:bg-serpentine hover:shadow-xl hover:-translate-y-1 active:scale-95"
              onClick={() => setShowModal(true)}>
              Login
            </button>
          )}

          <button
            className="md:hidden focus:outline-none transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X
                size={28}
                className={
                  isTransparent ? "text-first-frost" : "text-serpentine"
                }
              />
            ) : (
              <Menu
                size={28}
                className={
                  isTransparent ? "text-first-frost" : "text-serpentine"
                }
              />
            )}
          </button>
        </div>

        <div
          className={`fixed inset-0 bg-spring/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out md:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}>
          <Link
            to="/"
            className={mobileNavItemClass}
            onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <Link
            to="/business-mode"
            className={mobileNavItemClass}
            onClick={() => setIsMobileMenuOpen(false)}>
            Business Mode
          </Link>
          <Link
            to="/about-us"
            className={mobileNavItemClass}
            onClick={() => setIsMobileMenuOpen(false)}>
            About Us
          </Link>
          <Link
            to="/nearby"
            className={mobileNavItemClass}
            onClick={() => setIsMobileMenuOpen(false)}>
            Nearby
          </Link>
          <Link
            to="/bookmark"
            className={mobileNavItemClass}
            onClick={() => setIsMobileMenuOpen(false)}>
            Bookmark
          </Link>

          <div className="mt-4">
            {storedUser ? (
              <div
                className="flex flex-col items-center gap-3"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowModal(true);
                }}>
                <img
                  src={userImage}
                  alt="User"
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-xl"
                />
                <span className="font-montserrat-semibold text-serpentine text-xl">
                  {userName}
                </span>
              </div>
            ) : (
              <button
                className="py-3 px-10 bg-ivy rounded-full montserrat-semibold text-white text-lg shadow-lg"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowModal(true);
                }}>
                Login
              </button>
            )}
          </div>
        </div>
      </header>
      <ModalUser isVisible={showModal} onClose={() => setShowModal(false)} />
    </Fragment>
  );
}

export default Header;
