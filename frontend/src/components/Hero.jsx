import React from "react";
import Slide from "./Slide";

const hero2 =
  "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg";
const hero1 =
  "https://images.pexels.com/photos/941864/pexels-photo-941864.jpeg";
const hero3 = "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg";
const hero4 =
  "https://images.pexels.com/photos/3411135/pexels-photo-3411135.jpeg";
const hero5 =
  "https://images.pexels.com/photos/3807799/pexels-photo-3807799.jpeg";

const slides = [hero1, hero2, hero3, hero4, hero5];

const Hero = () => {
  return (
    <div>
      <Slide autoSlide={true}>
        {slides.map((s, i) => (
          <div key={i} className="h-140 w-screen object-contain">
            <img
              src={s}
              className="w-full h-full min-w-screen object-cover brightness-30"
            />
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Hero;
