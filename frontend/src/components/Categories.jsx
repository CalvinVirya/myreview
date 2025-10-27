import React from "react";
import restaurant from "../assets/restaurant.png";
import shopping from "../assets/shopping.png";
import hotel from "../assets/hotel.png";
import car from "../assets/car.png";
import barber from "../assets/barber.png";
import disco from "../assets/disco.png";
import archer from "../assets/archer.png";
import service from "../assets/service.png";

const Categories = () => {
  return (
    <section className="mx-12 flex flex-col gap-8 items-center">
      <div className="flex justify-center">
        <p className="montserrat-semibold text-3xl text-black mt-20">
          Categories
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="border p-5 flex flex-col items-center rounded-lg hover:cursor-pointer min-w-35">
          <img src={restaurant} alt="" className="w-16" />
          <p className="montserrat-semibold mt-2">Restaurants</p>
        </div>
        <div className="border p-5 flex flex-col items-center rounded-lg hover:cursor-pointer min-w-35">
          <img src={shopping} alt="" className="w-16" />
          <p className="montserrat-semibold mt-2">Shopping</p>
        </div>
        <div className="border p-5 flex flex-col items-center rounded-lg hover:cursor-pointer min-w-35">
          <img src={hotel} alt="" className="w-16" />
          <p className="montserrat-semibold mt-2">Hotel</p>
        </div>
        <div className="border p-5 flex flex-col items-center rounded-lg hover:cursor-pointer min-w-35">
          <img src={car} alt="" className="w-16" />
          <p className="montserrat-semibold mt-2">Automotive</p>
        </div>
        <div className="border p-5 flex flex-col items-center rounded-lg hover:cursor-pointer min-w-35">
          <img src={barber} alt="" className="w-16" />
          <p className="montserrat-semibold mt-2">Beauty</p>
        </div>
        <div className="border p-5 flex flex-col items-center rounded-lg hover:cursor-pointer min-w-35">
          <img src={disco} alt="" className="w-16" />
          <p className="montserrat-semibold mt-2">Night Life</p>
        </div>
        <div className="border p-5 flex flex-col items-center rounded-lg hover:cursor-pointer min-w-35">
          <img src={archer} alt="" className="w-16" />
          <p className="montserrat-semibold mt-2">Active Life</p>
        </div>
        <div className="border p-5 flex flex-col items-center rounded-lg hover:cursor-pointer min-w-35">
          <img src={service} alt="" className="w-16" />
          <p className="montserrat-semibold mt-2">Services</p>
        </div>
      </div>
    </section>
  );
};

export default Categories;
