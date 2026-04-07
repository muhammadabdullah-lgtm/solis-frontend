import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Banner {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
}

const banners: Banner[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&h=500&fit=crop",
    title: "Big Electronics Sale",
    subtitle: "Up to 40% off on the latest gadgets",
    cta: "Shop Electronics",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1200&h=500&fit=crop",
    title: "New Fashion Arrivals",
    subtitle: "Refresh your wardrobe this season",
    cta: "Shop Fashion",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=500&fit=crop",
    title: "Home & Living Deals",
    subtitle: "Transform your space for less",
    cta: "Shop Home",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 4000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, []);

  const goNext = () =>
    setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  const goPrev = () =>
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) goNext();
    if (diff < -50) goPrev();
  };

  return (
    <div
      className="relative w-full h-[200px] md:h-[300px] lg:h-[380px] overflow-hidden rounded-2xl shadow-sm"
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
          <div key={banner.id} className="min-w-full h-full relative shrink-0">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex flex-col justify-center px-8 md:px-14">
              <h2 className="text-white text-xl md:text-3xl lg:text-4xl font-bold leading-tight">
                {banner.title}
              </h2>
              <p className="text-white/80 text-sm md:text-base mt-1 md:mt-2">
                {banner.subtitle}
              </p>
              <button className="mt-4 bg-[#feee00] text-black font-semibold text-sm px-5 py-2 rounded-lg w-fit hover:opacity-90 transition-opacity">
                {banner.cta}
              </button>
            </div>
          </div>
        ))}
      </div>


      <button
        onClick={goPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Next arrow */}
      <button
        onClick={goNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-3 w-full flex justify-center gap-1.5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              current === i ? "bg-white w-5" : "bg-white/50 w-1.5"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;
