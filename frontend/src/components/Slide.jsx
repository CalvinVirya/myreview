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
    <div className="overflow-hidden relative h-[600px] md:h-screen w-full bg-gray-900">
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header />
      </div>
      
      <div
        className="flex transition-transform ease-in-out duration-700 h-full [&>*]:!w-full [&>*]:!h-full [&>*]:shrink-0 [&_img]:!h-full [&_img]:!w-full [&_img]:!object-cover"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 pt-10 md:pt-20">
        <div className="flex flex-col items-center justify-center gap-3 md:gap-4 max-w-4xl text-center">
          <p className="text-3xl md:text-5xl lg:text-6xl montserrat-semibold text-first-frost leading-tight drop-shadow-lg">
            McDonalds
          </p>
          <p className="text-sm md:text-lg montserrat-regular text-first-frost/90 max-w-xs md:max-w-2xl drop-shadow-md leading-relaxed px-2">
            McDonald’s is a global fast-food chain famous for its hamburgers,
            French fries, and Golden Arches logo.
          </p>
        </div>
        <div className="w-full max-w-xs md:max-w-md lg:max-w-lg relative z-20">
          <Searchbar />
        </div>
      </div>
      
      <div className="absolute bottom-6 md:bottom-12 left-0 right-0 px-4 md:px-12 z-20">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 md:gap-0">
          
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-xl">
            <button
              className="p-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-serpentine transition-all duration-300 cursor-pointer"
              onClick={prev}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2 px-2">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`transition-all duration-500 rounded-full h-2 shadow-sm ${
                    curr === i 
                      ? "w-8 bg-ivy" 
                      : "w-2 bg-white/40 cursor-pointer hover:bg-white/70"
                  }`}
                  onClick={() => setCurr(i)}
                />
              ))}
            </div>

            <button
              className="p-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-serpentine transition-all duration-300 cursor-pointer"
              onClick={next}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="hidden md:block w-32 lg:w-40 h-1 bg-transparent"></div>
        </div>
      </div>
    </div>
  );
}

export default Slide;