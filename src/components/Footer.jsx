import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="bg-first-frost p-3 sm:flex sm:gap-10 sm:justify-center mt-12">
        {/* About Us */}
        <div>
          <p className="text-serpentine montserrat-medium text-xl mb-2">
            About Us
          </p>
          <p className="text-ivy montserrat-regular sm:max-w-2xl">
            MyReview helps users discover and review local businesses with ease.
            From cafes to repair shops, you can explore listings, share
            experiences, and find trusted recommendations all in one place.
          </p>
        </div>
        {/* Menu */}
        <div>
          <p className="text-serpentine montserrat-medium text-xl mb-2 mt-3">
            Menu
          </p>
          <div className="flex flex-col gap-1.5">
            <Link to="/" className="text-ivy montserrat-regular">
              Home
            </Link>
            <Link to="/business-mode" className="text-ivy montserrat-regular">
              Business Mode
            </Link>
            <Link to="/about-us" className="text-ivy montserrat-regular">
              About Us
            </Link>
            <Link to="/categories" className="text-ivy montserrat-regular">
              Categories
            </Link>
            <Link to="/nearby" className="text-ivy montserrat-regular">
              Nearby
            </Link>
            <Link to="/bookmark" className="text-ivy montserrat-regular">
              Bookmark
            </Link>
          </div>
        </div>
        {/* Categories */}
        <div>
          <div>
            <p className="text-serpentine montserrat-medium text-xl mb-2 mt-3">
              Categories
            </p>
            <div className="flex flex-col gap-1.5">
              <Link to="/" className="text-ivy montserrat-regular">
                Restaurant
              </Link>
              <Link to="/business-mode" className="text-ivy montserrat-regular">
                Shopping
              </Link>
              <Link to="/about-us" className="text-ivy montserrat-regular">
                Hotel
              </Link>
              <Link to="/categories" className="text-ivy montserrat-regular">
                Music
              </Link>
            </div>
          </div>
        </div>
        {/* Follow Us */}
        <div>
          <div>
            <p className="text-serpentine montserrat-medium text-xl mb-2 mt-3">
              Follow Us
            </p>
            <div className="flex flex-col gap-1.5">
              <Link to="/" className="text-ivy montserrat-regular">
                Restaurant
              </Link>
              <Link to="/business-mode" className="text-ivy montserrat-regular">
                Shopping
              </Link>
              <Link to="/about-us" className="text-ivy montserrat-regular">
                Hotel
              </Link>
              <Link to="/categories" className="text-ivy montserrat-regular">
                Music
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="bg-spring p-3">
        <p className="text-center text-serpentine montserrat-regular">
          Copyright &copy; 2025 MyReview. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
