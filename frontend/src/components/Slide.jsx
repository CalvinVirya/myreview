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
        className="flex transition-transform ease-in-out duration-700"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none"></div>

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
        <div className="w-80 flex justify-center items-center px-4 mb-3">
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
          
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-lg">
            <button
              className="p-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-serpentine transition-all duration-300 cursor-pointer"
              onClick={prev}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2 px-2">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`transition-all duration-500 rounded-full h-2 ${
                    curr === i 
                      ? "w-6 bg-ivy" 
                      : "w-2 bg-white/40 cursor-pointer hover:bg-white/70"
                  }`}
                  onClick={() => setCurr(i)}
                />
              ))}
            </div>

            <button
              className="p-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-serpentine transition-all duration-300 cursor-pointer"
              onClick={next}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="w-50 h-5 bg-white"></div>
        </div>
      </div>
    </div>
  );
}

export default Slide;