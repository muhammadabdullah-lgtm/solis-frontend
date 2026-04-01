import { useEffect, useRef, useState } from "react";

interface Banner {
  id: number;
  image: string;
  title: string;
}

const banners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f",
    title: "Big Electronics Sale",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53",
    title: "Up to 50% Off Fashion",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    title: "Home Essentials Deals",
  },
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<any>(null);

  // Auto play
  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, []);

  const next = () => {
    setCurrent((prev) =>
      prev === banners.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setCurrent((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  // Swipe support
  let startX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = startX - e.changedTouches[0].clientX;

    if (diff > 50) next();
    if (diff < -50) prev();
  };

  return (
    <div
      className="relative w-full h-[220px] md:h-[320px] lg:h-[360px] overflow-hidden rounded-xl shadow-sm"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="min-w-full h-full relative">
            
            {/* Image */}
            <img
              src={banner.image}
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-center px-6">
              <h2 className="text-white text-xl md:text-3xl font-bold">
                {banner.title}
              </h2>

              <button className="mt-4 bg-yellow-400 w-fit px-5 py-2 rounded-md hover:bg-yellow-500">
                Shop Now
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
      >
        ◀
      </button>

      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {banners.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-2 rounded-full cursor-pointer transition ${
              current === index ? "bg-white w-4" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;