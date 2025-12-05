import React from "react";
import {
  Coffee,
  ShoppingBag,
  Home,
  Truck,
  Scissors,
  Music,
  Target,
  Tool,
} from "react-feather";
import { Link } from "react-router-dom";

const Categories = () => {
  const categoryList = [
    { name: "Restaurants", icon: Coffee },
    { name: "Shopping", icon: ShoppingBag },
    { name: "Hotel", icon: Home },
    { name: "Automotive", icon: Truck },
    { name: "Beauty", icon: Scissors },
    { name: "Night Life", icon: Music },
    { name: "Active Life", icon: Target },
    { name: "Services", icon: Tool },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl montserrat-bold text-serpentine mb-4">
            Browse Categories
          </h2>
          <p className="text-gray-500 montserrat-regular max-w-2xl mx-auto">
            Explore diverse services and fascinating places, all organized by
            the categories that matter to you.
          </p>
          <div className="w-24 h-1.5 bg-ivy mx-auto mt-6 rounded-full opacity-50"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categoryList.map((cat, index) => (
            <Link key={index} to={`/nearby?category=${cat.name}`}>
              <div
                key={index}
                className="group bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-ivy/30 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-spring/30 group-hover:text-ivy transition-all duration-300">
                  <cat.icon
                    size={36}
                    strokeWidth={1.5}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <p className="montserrat-semibold text-gray-700 text-lg group-hover:text-serpentine transition-colors duration-300">
                  {cat.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
