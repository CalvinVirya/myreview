import { Fragment, useState } from "react";
import { jwtDecode } from "jwt-decode";
import logo from "../assets/logo.svg";
import Modal from "./Modal";
import { Link, useLocation } from "react-router-dom";
Modal;

function Header() {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const storedUser = sessionStorage.getItem("User");

  let userImage = null;
  let userName = null;

  // decode token kalo ada user login
  if (storedUser) {
    const decoded = jwtDecode(storedUser);
    userImage = decoded.userImage;  // <--- AMBIL IMAGE USER
    userName = decoded.name;
  }

  const headerClassName =
    location.pathname === "/"
      ? "flex justify-between bg-transparent w-screen items-center px-12 py-12 absolute top-0 left-0"
      : "flex justify-between bg-spring w-screen items-center px-12 py-12";

  const ulClassName =
    location.pathname === "/"
      ? "flex space-x-8 text-first-frost montserrat-semibold"
      : "flex space-x-8 montserrat-semibold";

  return (
    <Fragment>
      <header className={headerClassName}>
        <img src={logo} alt="" className="h-15" />
        <nav>
          <ul className={ulClassName}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/business-mode">Business Mode</Link>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/nearby">Nearby</Link>
            </li>
            <li>
              <Link to="/bookmark">Bookmark</Link>
            </li>
          </ul>
        </nav>
        {storedUser ? (
          // Jika user ada → tampilkan Log Out
          <img
            src={userImage}
            alt="User"
            className="w-15 h-15 rounded-full object-cover border border-white cursor-pointer"
            onClick={() => setShowModal(true)}
          />
        ) : (
          // Jika user belum login → tampilkan Login
          <button
            className="py-2 px-6 bg-ivy rounded-2xl montserrat-regular text-first-frost cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            Login
          </button>
        )}

        
      </header>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)} />
    </Fragment>
  );
}

export default Header;
