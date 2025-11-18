import { useEffect, useState } from "react";
import Header from "./Header";
import Searchbar from "./Searchbar";
import { ChevronLeft, ChevronRight } from "react-feather";

function Slide({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 5000,
}) {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="overflow-hidden relative">
      <div className="absolute top-0 left-0 z-1">
        <Header />
      </div>
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-[32px] montserrat-semibold text-first-frost sm:max-w-110 px-4">
            McDonalds
          </p>
          <p className="text-base montserrat-regular text-first-frost sm:max-w-110 text-center px-4">
            McDonald’s is a global fast-food chain famous for its hamburgers,
            French fries, and Golden Arches logo.
          </p>
        </div>
        <div className="w-full flex justify-center items-center px-4 mb-3">
          <Searchbar />
        </div>
      </div>
      <div className="absolute px-12 bottom-12 right-0 left-0">
        <div className="flex flex-col-reverse gap-3 items-center sm:flex-row sm:justify-between">
          <button
            className="py-2 px-6 bg-ivy rounded-md montserrat-regular text-first-frost cursor-pointer w-full sm:w-auto"
            onClick={() => alert(`Tombol pada slide indeks ke-${curr} diklik!`)}
          >
            Explore Now
          </button>
          <div className="flex items-center gap-2">
            <button
              className="rounded-lg p-1 shadow bg-white/80 text-gray-800 hover:bg-white cursor-pointer"
              onClick={prev}
            >
              <ChevronLeft size={16} />
            </button>
            {slides.map((_, i) => (
              <div
                key={i}
                className={`transition-all w-3 h-3 bg-white rounded-full ${
                  curr === i ? "p-2" : "opacity-50"
                }`}
              />
            ))}
            <button
              className="p-1 rounded-lg shadow bg-white/80 text-gray-800 hover:bg-white cursor-pointer"
              onClick={next}
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="w-50 h-5 bg-white"></div>
        </div>
      </div>
    </div>
  );
}

export default Slide;
