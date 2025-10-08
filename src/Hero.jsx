import { useEffect, useState } from "react";
import Header from "./Header";
import Searchbar from "./Searchbar";
import { ChevronLeft, ChevronRight } from "react-feather";

function Hero({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 5000,
}) {
  const [curr, setCurr] = useState(0);

  // Go to previous slide with wrap-around
  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

  // Go to next slide with wrap-around
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="overflow-hidden relative">
      <div className="absolute top-0 left-0 z-20">
        <Header />
      </div>
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}>
        {slides}
        {/* salah naro div disini */}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Searchbar />
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          <button className="px-13 py-5 bg-ivy rounded-2xl montserrat-regular text-first-frost">
            Explore Now
          </button>
          <button
            className="rounded-lg p-1 shadow bg-white/80 text-gray-800 hover:bg-white"
            onClick={prev}>
            <ChevronLeft size={16} />
          </button>
          {slides.map((_, i) => (
            <div
              className={`transition-all w-3 h-3 bg-white rounded-full ${
                curr === i ? "p-2" : "opacity-50"
              }`}
            />
          ))}
          <button
            className="p-1 rounded-lg shadow bg-white/80 text-gray-800 hover:bg-white"
            onClick={next}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
