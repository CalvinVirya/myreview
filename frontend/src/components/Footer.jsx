import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "react-feather";

const Footer = () => {
  return (
    <footer className="bg-first-frost pt-16 pb-8 border-t border-white/50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="space-y-6">
          <h3 className="text-3xl montserrat-bold text-serpentine">MyReview</h3>
          <p className="text-ivy montserrat-medium text-sm leading-relaxed text-justify">
            MyReview helps users discover and review local businesses with ease.
            From cafes to repair shops, you can explore listings, share
            experiences, and find trusted recommendations all in one place.
          </p>
        </div>

        <div>
          <h4 className="text-xl montserrat-bold text-serpentine mb-6 relative inline-block">
            Menu
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-ivy rounded-full"></span>
          </h4>
          <div className="flex flex-col space-y-3">
            {["Home", "Business Mode", "About Us", "Categories", "Nearby", "Bookmark"].map((item, idx) => {
              const path = item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`;
              return (
                <Link
                  key={idx}
                  to={path}
                  className="text-ivy montserrat-medium hover:text-serpentine hover:translate-x-2 transition-all duration-300 inline-block w-fit"
                >
                  {item}
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="text-xl montserrat-bold text-serpentine mb-6 relative inline-block">
            Categories
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-ivy rounded-full"></span>
          </h4>
          <div className="flex flex-col space-y-3">
            {["Restaurant", "Shopping", "Hotel", "Music"].map((item, idx) => (
              <Link
                key={idx}
                to={item === "Restaurant" ? "/" : "/categories"}
                className="text-ivy montserrat-medium hover:text-serpentine hover:translate-x-2 transition-all duration-300 inline-block w-fit"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xl montserrat-bold text-serpentine mb-6 relative inline-block">
            Contact Us
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-ivy rounded-full"></span>
          </h4>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-ivy group cursor-pointer">
              <div className="p-2 bg-white rounded-full group-hover:bg-serpentine group-hover:text-white transition-colors duration-300">
                <Mail size={16} />
              </div>
              <span className="montserrat-medium text-sm">support@myreview.com</span>
            </div>
            <div className="flex items-center gap-3 text-ivy group cursor-pointer">
              <div className="p-2 bg-white rounded-full group-hover:bg-serpentine group-hover:text-white transition-colors duration-300">
                <MapPin size={16} />
              </div>
              <span className="montserrat-medium text-sm">Jakarta, Indonesia</span>
            </div>
            <div className="flex items-center gap-3 text-ivy group cursor-pointer">
              <div className="p-2 bg-white rounded-full group-hover:bg-serpentine group-hover:text-white transition-colors duration-300">
                <Phone size={16} />
              </div>
              <span className="montserrat-medium text-sm">+62 812 3456 7890</span>
            </div>

            <div className="flex gap-4 mt-8">
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-ivy hover:bg-serpentine hover:text-white transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-ivy hover:bg-serpentine hover:text-white transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-ivy hover:bg-serpentine hover:text-white transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>


      <p className="text-center text-serpentine montserrat-semibold text-sm">
        Copyright &copy; 2025 MyReview. All Rights Reserved.
      </p>

    </footer>
  );
};

export default Footer;