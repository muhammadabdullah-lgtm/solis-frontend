import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const categories = [
  { id: 1, name: "Women's fashion", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop", bgColor: "bg-pink-50" },
  { id: 2, name: "Men's fashion", image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400&h=400&fit=crop", bgColor: "bg-blue-50" },
  { id: 3, name: "Beauty", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop", bgColor: "bg-purple-50" },
  { id: 4, name: "Home & kitchen", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop", bgColor: "bg-amber-50" },
  { id: 5, name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop", bgColor: "bg-slate-100" },
  { id: 6, name: "Mobiles", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop", bgColor: "bg-gray-100" },
  { id: 7, name: "Laptops", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop", bgColor: "bg-indigo-50" },
  { id: 8, name: "Kids' fashion", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop", bgColor: "bg-green-50" },
  { id: 9, name: "Sports", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=400&fit=crop", bgColor: "bg-orange-50" },
  { id: 10, name: "Grocery", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop", bgColor: "bg-emerald-50" },
];

interface CarouselProps {
  title?: string;
  viewAllLink?: string;
  autoplay?: boolean;
  autoplaySpeed?: number;
}

const CategoriesBar: React.FC<CarouselProps> = ({
  title = "",
  viewAllLink = "#",
  autoplay = true,
  autoplaySpeed = 5000,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const autoScrollInterval = useRef<any>(null);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      const newScrollLeft = direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  const startAutoScroll = () => {
    if (autoplay && !isHovered) {
      autoScrollInterval.current = setInterval(() => {
        if (scrollContainerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
          const maxScroll = scrollWidth - clientWidth;
          
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
           
            scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scroll('right');
          }
        }
      }, autoplaySpeed);
    }
  };

  const stopAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
  };

  useEffect(() => {
    checkScrollPosition();
    startAutoScroll();
    
    return () => stopAutoScroll();
  }, []);

  useEffect(() => {
    if (autoplay) {
      if (!isHovered) {
        startAutoScroll();
      } else {
        stopAutoScroll();
      }
    }
    return () => stopAutoScroll();
  }, [isHovered, autoplay]);

  return (
    <div 
      className=" w-full max-w-7xl  sm:px-6 lg:px-8 py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
  
      {/* <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <a 
          href={viewAllLink} 
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          View all
        </a>
      </div> */}


      <div className="relative group">
     
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
        )}

    
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollPosition}
          className="flex overflow-x-auto scroll-smooth gap-4 pb-4 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => (
            <a
              key={category.id}
              href="#"
              className="flex-shrink-0 w-40 sm:w-48 group/card transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`${category.bgColor} rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow`}>
                <div className="aspect-square p-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-medium text-gray-800 text-sm sm:text-base group-hover/card:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </div>
            </a>
          ))}
        </div>


        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        )}
      </div>


  
    </div>
  );
};

export default CategoriesBar;