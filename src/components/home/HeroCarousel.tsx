import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import React, { useState } from 'react';

const HERO_SLIDES = [
  {
    title: 'Elevate Your Workspace Setup',
    description: 'Up to 40% off premium monitors, ergonomic seating, and mechanical keyboards.',
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1200&q=80',
  },
  {
    title: 'Refresh Your Gaming Station',
    description: 'Score limited-time bundles on RGB gear, high-speed mice, and immersive audio.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80',
  },
  {
    title: 'Create Anywhere You Go',
    description: 'Portable laptops, creator tablets, and gear designed for flexible workflows.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80',
  },
  {
    title: 'Upgrade Your Home Office',
    description: 'Find better lighting, quiet accessories, and productivity essentials in one place.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80',
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const activeSlide = HERO_SLIDES[currentSlide];

  const goToPreviousSlide = () => {
    setCurrentSlide((index) => (index === 0 ? HERO_SLIDES.length - 1 : index - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((index) => (index === HERO_SLIDES.length - 1 ? 0 : index + 1));
  };

  return (
    <section className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-auto lg:h-[420px]">
      
      {/* Left Main Banner (Carousel mock) */}
      <div className="flex-[3] relative rounded-2xl overflow-hidden bg-slate-900 group min-h-[300px]">
        {/* Image Background */}
        <img 
          src={activeSlide.image}
          alt={activeSlide.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center w-full md:w-2/3">
        
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            {activeSlide.title}
          </h1>
          <p className="text-lg text-slate-200 mb-8 max-w-md">
            {activeSlide.description}
          </p>
    
        </div>

        {/* Controls */}
        <button
          type="button"
          onClick={goToPreviousSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Show previous hero slide"
        >
     <ChevronLeft size={34}
      strokeWidth={1.5}   // thinner stroke like Solar linear
      color="black" />
        </button>
        <button
          type="button"
          onClick={goToNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Show next hero slide"
        >
          {/* <iconify-icon icon="solar:alt-arrow-right-linear" width="24"></iconify-icon> */}
          {/* <ArrowRight 
      size={24}
      strokeWidth={1.5}
      color="#6b7280"
    /> */}


<ChevronRight size={34}
      strokeWidth={1.5}
      color='black' />

        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_SLIDES.map((_, dot) => (
            <button
              type="button"
              key={dot} 
              onClick={() => setCurrentSlide(dot)}
              className={`h-1.5 rounded-full transition-all ${dot === currentSlide ? 'w-6 bg-yellow-400' : 'w-1.5 bg-white/50'}`}
              aria-label={`Show hero slide ${dot + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right Promo Panel */}
      <div className="flex-[1] rounded-2xl bg-white border border-slate-200 p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow relative overflow-hidden group">
        <div className="absolute top-4 right-4 bg-rose-100 text-rose-700 px-2 py-1 rounded text-xs font-semibold">
          New Arrival
        </div>
        
        <h3 className="text-xl font-semibold tracking-tight text-slate-900 mt-2">Premium Carry</h3>
        <p className="text-sm text-slate-500 mt-1 mb-6">Handcrafted leather essentials.</p>
        
        <div className="flex-grow flex items-center justify-center w-full relative">
          <div className="absolute inset-0 bg-slate-50 rounded-full scale-75 group-hover:scale-90 transition-transform duration-500"></div>
          <img 
            src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" 
            alt="Leather Bag" 
            className="w-48 h-48 object-cover rounded-xl relative z-10 drop-shadow-xl group-hover:-translate-y-2 transition-transform duration-300"
          />
        </div>

        <div className="mt-6 w-full">
          <button className="w-full bg-slate-900 text-white py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-colors">
            View Details
          </button>
        </div>
      </div>

    </section>
  );
}
