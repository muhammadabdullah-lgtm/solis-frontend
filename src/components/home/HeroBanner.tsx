function HeroBanner() {
  return (
    <div className="w-full h-[200px] md:h-[300px] bg-gray-200 rounded-lg overflow-hidden">
      <img
        src="https://via.placeholder.com/1200x300"
        alt="banner"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default HeroBanner;