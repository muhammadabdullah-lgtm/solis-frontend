
// import { Info, Mail } from 'lucide-react';

// const footerLinks = [
//   {
//     title: "Electronics",
//     links: ["Mobiles", "Tablets", "Laptops", "Desktops", "Wearables", "Headphones", "Camera, Photo & Video", "Televisions"]
//   },
//   {
//     title: "Fashion",
//     links: ["Women's Fashion", "Men's Fashion", "Kids Fashion", "Fragrances", "Watches", "Jewellery", "Eyewear", "Footwear"]
//   },
//   {
//     title: "Home and Kitchen",
//     links: ["Large Appliances", "Small Appliances", "Bedroom Furniture", "Storage", "Cookware", "Furniture", "Home Fragrance", "Drinkware"]
//   },
//   {
//     title: "Beauty",
//     links: ["Fragrance", "Skincare", "Haircare", "Personal Care", "Makeup", "Makeup Tools", "Men's Grooming", "Health Care Essentials"]
//   },
//   {
//     title: "Baby & Toys",
//     links: ["Nursing & Feeding", "Diapering", "Baby Transport", "Baby & Toddler Toys", "Tricycles & Scooters", "Board Games & Cards", "Baby Food"]
//   },
//   {
//     title: "Top Brands",
//     links: ["Apple", "Samsung", "Xiaomi", "Sony", "Adidas", "Philips", "Lattafa", "Huawei", "Geepas"]
//   },
//   {
//     title: "Discover Now",
//     links: ["Blogs", "Brand Glossary", "Trending Searches", "solis Affiliate Program", "Dubai Traders Program", "solis Grocery", "solis Food", "solis Minutes", "solis Supermall"]
//   },
//   {
//     title: "Popular",
//     links: ["iPhone 17 Series", "iPhone 17", "iPhone 17 Air", "iPhone 17 Pro", "iPhone 17 Pro Max", "Eid Sale & Gift Ideas"]
//   },
//   {
//     title: "GCC",
//     links: ["solis Kuwait", "solis Bahrain", "solis Oman", "solis Qatar"]
//   }
// ];

// export default function Footer() {
//   return (
//     <footer className="bg-white border-t border-gray-200 mt-12 border border-yellow-500 ">
//       {/* Help Section */}
//       <div className="bg-[#F3F4F8] py-8 border-b border-gray-200">
//         <div className="max-w-[1440px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
//           <div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-1">We're Always Here To Help</h3>
//             <p className="text-gray-500 text-sm">Reach out to us through any of these support channels</p>
//           </div>
//           <div className="flex items-center gap-8">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center">
//                 <Info className="text-gray-600" size={24} />
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 font-bold uppercase">Help Center</p>
//                 <a href="#" className="text-xl font-bold text-gray-800 hover:text-blue-600">help.solis.com</a>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center">
//                 <Mail className="text-gray-600" size={24} />
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 font-bold uppercase">Email Support</p>
//                 <a href="mailto:care@solis.com" className="text-xl font-bold text-gray-800 hover:text-blue-600">care@solis.com</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Links Section */}
//       <div className="max-w-[1440px] mx-auto bg-[#0000] px-4 py-12">
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-6">
//           {footerLinks.map((column, idx) => (
//             <div key={idx}>
//               <h4 className="font-bold text-gray-800 mb-4 text-sm">{column.title}</h4>
//               <ul className="flex flex-col gap-3">
//                 {column.links.map((link, lIdx) => (
//                   <li key={lIdx}>
//                     <a href="#" className="text-sm text-gray-500 hover:text-gray-800">{link}</a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* App & Social Section */}
//       <div className="max-w-[1440px] mx-auto px-4 py-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
//         <div className="flex items-center gap-4">
//           <span className="font-bold text-gray-800 text-sm">SHOP ON THE GO</span>
//           <div className="flex gap-2">
//             <img src="https://f.nooncdn.com/s/app/com/common/images/logos/app-store.svg" alt="App Store" className="h-10 cursor-pointer" />
//             <img src="https://f.nooncdn.com/s/app/com/common/images/logos/google-play.svg" alt="Google Play" className="h-10 cursor-pointer" />
//             <img src="https://f.nooncdn.com/s/app/com/common/images/logos/explore-on-app-gallery.svg" alt="App Gallery" className="h-10 cursor-pointer" />
//           </div>
//         </div>
//         <div className="flex items-center gap-4">
//           <span className="font-bold text-gray-800 text-sm">CONNECT WITH US</span>
//           <div className="flex gap-3">
//             <a href="#" className="w-10 h-10 rounded-full bg-[#feee00] flex items-center justify-center hover:bg-yellow-400 transition-colors">
//               {/* <Facebook size={20} className="text-black fill-current" /> */}
//             </a>
//             <a href="#" className="w-10 h-10 rounded-full bg-[#feee00] flex items-center justify-center hover:bg-yellow-400 transition-colors">
//               {/* <Twitter size={20} className="text-black fill-current" /> */}
//             </a>
//             <a href="#" className="w-10 h-10 rounded-full bg-[#feee00] flex items-center justify-center hover:bg-yellow-400 transition-colors">
//               {/* <Instagram size={20} className="text-black" /> */}
//             </a>
//             <a href="#" className="w-10 h-10 rounded-full bg-[#feee00] flex items-center justify-center hover:bg-yellow-400 transition-colors">
//               {/* <Linkedin size={20} className="text-black fill-current" /> */}
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Legal Section */}
//       <div className="bg-[#F3F4F8] py-6 border-t border-gray-200">
//         <div className="max-w-[1440px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
//           <p>© 2026 solis. All Rights Reserved</p>
//           <div className="flex items-center gap-2">
//             {/* Payment Icons Placeholders */}
//             <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold">MC</div>
//             <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-blue-600">VISA</div>
//             <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-green-500">tabby</div>
//             <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-purple-500">tamara</div>
//             <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-blue-400">AMEX</div>
//             <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-green-600">CASH</div>
//           </div>
//           <div className="flex items-center gap-6">
//             <a href="#" className="hover:text-gray-800">Careers</a>
//             <a href="#" className="hover:text-gray-800">Warranty Policy</a>
//             <a href="#" className="hover:text-gray-800">Sell with us</a>
//             <a href="#" className="hover:text-gray-800">Terms of Use</a>
//             <a href="#" className="hover:text-gray-800">Terms of Sale</a>
//             <a href="#" className="hover:text-gray-800">Privacy Policy</a>
//             <a href="#" className="hover:text-gray-800">Consumer Rights</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }









const footerColumns = [
  {
    title: "Electronics",
    links: [
      "Mobiles",
      "Tablets",
      "Laptops",
      "Desktops",
      "Wearables",
      "Headphones",
      "Camera, Photo & Video",
      "Televisions",
    ],
  },
  {
    title: "Fashion",
    links: [
      "Women's Fashion",
      "Men's Fashion",
      "Kids Fashion",
      "Fragrances",
      "Watches",
      "Jewellery",
      "Eyewear",
      "Footwear",
    ],
  },
  {
    title: "Home and Kitchen",
    links: [
      "Large Appliances",
      "Small Appliances",
      "Bedroom Furniture",
      "Storage",
      "Cookware",
      "Furniture",
      "Home Fragrance",
      "Drinkware",
    ],
  },
  {
    title: "Beauty",
    links: [
      "Fragrance",
      "Skincare",
      "Haircare",
      "Personal Care",
      "Makeup",
      "Makeup Tools",
      "Men's Grooming",
      "Health Care Essentials",
    ],
  },
  {
    title: "Baby & Toys",
    links: [
      "Nursing & Feeding",
      "Diapering",
      "Baby Transport",
      "Baby & Toddler Toys",
      "Tricycles & Scooters",
      "Board Games & Cards",
      "Baby Food",
    ],
  },
  {
    title: "Top Brands",
    links: [
      "Apple",
      "Samsung",
      "Xiaomi",
      "Sony",
      "Adidas",
      "Philips",
      "Lattafa",
      "Huawei",
      "Geepas",
    ],
  },
  {
    title: "Discover Now",
    links: [
      "Blogs",
      "Brand Glossary",
      "Trending Searches",
      "noon Affiliate Program",
      "Dubai Traders Program",
      "noon Grocery",
      "noon Food",
      "noon Minutes",
      "noon Supermall",
    ],
  },
  {
    title: "Popular",
    links: [
      "iPhone 17 Series",
      "iPhone 17",
      "iPhone 17 Air",
      "iPhone 17 Pro",
      "iPhone 17 Pro Max",
      "Eid Sale & Gift Ideas",
    ],
  },
  {
    title: "GCC",
    links: ["noon Kuwait", "noon Bahrain", "noon Oman", "noon Qatar"],
  },
];

const legalLinks = [
  "Careers",
  "Warranty Policy",
  "Sell with us",
  "Terms of Use",
  "Terms of Sale",
  "Privacy Policy",
  "Consumer Rights",
];

function HelpCenterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 2C15.0377 2 17.4234 2.988 19.2177 4.78231C21.012 6.57662 22 8.96231 22 11.5C22 14.0377 21.012 16.4234 19.2177 18.2177C17.4234 20.012 15.0377 21 12.5 21C9.9635 21 7.57662 20.012 5.78231 18.2177C3.988 16.4234 3 14.0377 3 11.5C3 8.96231 3.988 6.57662 5.78231 4.78231C7.57662 2.988 9.9635 2 12.5 2ZM18.3781 17.3781C16.8083 18.948 14.7206 19.8125 12.5 19.8125C10.2794 19.8125 8.19175 18.948 6.62306 17.3781C5.052 15.8083 4.1875 13.7206 4.1875 11.5C4.1875 9.27938 5.052 7.19175 6.62306 5.62188C8.19294 4.052 10.2806 3.1875 12.5 3.1875C14.7206 3.1875 16.8083 4.052 18.3781 5.62188C19.948 7.19175 20.8125 9.27938 20.8125 11.5C20.8125 13.7206 19.948 15.8083 18.3781 17.3781ZM11.9062 6.76781V7.95531H13.0938V6.76781H11.9062ZM11.9062 9.13569V16.2334H13.0938V9.13569H11.9062Z"
        fill="#404553"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.625 6H18.625C19.5188 6 20.25 6.73125 20.25 7.625V17.375C20.25 18.2688 19.5188 19 18.625 19H5.625C4.73125 19 4 18.2688 4 17.375V7.625C4 6.73125 4.73125 6 5.625 6Z"
        stroke="#404553"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.25 7.625L12.125 13.3125L4 7.625"
        stroke="#404553"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="full" height="full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#fb-clip)">
        <path d="M0 12C0 5.373 5.373 0 12 0C18.627 0 24 5.373 24 12C24 18.627 18.627 24 12 24C5.373 24 0 18.627 0 12Z" fill="#FEEE00" />
        <path d="M12.99 18.667V12.333H14.765L15 10.15H12.99L12.993 9.057C12.993 8.488 13.048 8.183 13.878 8.183H14.988V6H13.212C11.08 6 10.33 7.059 10.33 8.84V10.15H9V12.333H10.33V18.667H12.99Z" fill="#404553" />
      </g>
      <defs>
        <clipPath id="fb-clip"><rect width="24" height="24" fill="white" /></clipPath>
      </defs>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="full" height="full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#tw-clip)">
        <path d="M0 11.874C0 5.316 5.304 0 11.846 0C18.388 0 23.692 5.317 23.692 11.875C23.692 18.435 18.388 23.751 11.846 23.751C5.304 23.751 0 18.433 0 11.874Z" fill="#FEEE00" />
        <path d="M16.5226 7.71775C16.573 7.66007 16.6116 7.59301 16.6361 7.52042C16.6607 7.44782 16.6707 7.3711 16.6655 7.29465C16.6604 7.21819 16.6403 7.14349 16.6063 7.07481C16.5723 7.00613 16.5251 6.94482 16.4675 6.89437C16.4098 6.84393 16.3427 6.80534 16.2701 6.78081C16.1975 6.75628 16.1208 6.74629 16.0444 6.75141C15.9679 6.75653 15.8932 6.77666 15.8245 6.81065C15.7558 6.84463 15.6945 6.89182 15.6441 6.9495L12.6632 10.3562L10.1333 6.98333C10.079 6.91089 10.0085 6.85208 9.92754 6.81158C9.84654 6.77108 9.75723 6.75 9.66667 6.75H7.33333C7.225 6.75 7.11881 6.78017 7.02666 6.83712C6.9345 6.89407 6.86003 6.97556 6.81158 7.07246C6.76314 7.16935 6.74263 7.27783 6.75236 7.38572C6.76209 7.49361 6.80167 7.59667 6.86667 7.68333L10.6216 12.6895L7.47742 16.2828C7.42697 16.3405 7.38838 16.4076 7.36385 16.4802C7.33932 16.5528 7.32933 16.6295 7.33445 16.7059C7.33957 16.7824 7.3597 16.8571 7.39369 16.9258C7.42768 16.9945 7.47486 17.0558 7.53254 17.1062C7.59022 17.1567 7.65728 17.1952 7.72988 17.2198C7.80247 17.2443 7.87919 17.2543 7.95565 17.2492C8.0321 17.2441 8.1068 17.2239 8.17548 17.1899C8.24416 17.1559 8.30547 17.1088 8.35592 17.0511L11.3368 13.6438L13.8667 17.0167C13.921 17.0891 13.9915 17.1479 14.0725 17.1884C14.1535 17.2289 14.2428 17.25 14.3333 17.25H16.6667C16.775 17.25 16.8812 17.2198 16.9733 17.1629C17.0655 17.1059 17.14 17.0244 17.1884 16.9275C17.2369 16.8306 17.2574 16.7222 17.2476 16.6143C17.2379 16.5064 17.1983 16.4033 17.1333 16.3167L13.3784 11.3105L16.5226 7.71775Z" fill="#404553" />
      </g>
      <defs>
        <clipPath id="tw-clip"><rect width="24" height="24" fill="white" /></clipPath>
      </defs>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="full" height="full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#ig-clip)">
        <path d="M0 12C0 5.373 5.36 0 11.97 0C18.58 0 23.94 5.373 23.94 12C23.94 18.627 18.58 24 11.97 24C5.36 24 0 18.627 0 12Z" fill="#FEEE00" />
        <path d="M11.9699 5.59961C10.2369 5.59961 10.0199 5.60761 9.33794 5.63861C8.65794 5.66861 8.19494 5.77761 7.78794 5.93561C7.36794 6.09861 7.01294 6.31761 6.65794 6.67361C6.33289 6.99365 6.0814 7.38061 5.92094 7.80761C5.76294 8.21461 5.65494 8.67961 5.62394 9.36061C5.59394 10.0436 5.58594 10.2606 5.58594 12.0006C5.58594 13.7376 5.59394 13.9556 5.62494 14.6376C5.65494 15.3196 5.76294 15.7846 5.92094 16.1916C6.08394 16.6116 6.30194 16.9696 6.65694 17.3256C7.01194 17.6806 7.36794 17.9006 7.78694 18.0636C8.19394 18.2216 8.65794 18.3296 9.33694 18.3606C10.0189 18.3916 10.2369 18.4006 11.9699 18.4006C13.7039 18.4006 13.9199 18.3916 14.6009 18.3606C15.2809 18.3306 15.7459 18.2216 16.1509 18.0636C16.5709 17.9006 16.9269 17.6806 17.2809 17.3256C17.6369 16.9696 17.8549 16.6126 18.0189 16.1916C18.1759 15.7846 18.2829 15.3196 18.3149 14.6386C18.3449 13.9556 18.3539 13.7386 18.3539 11.9996C18.3539 10.2616 18.3459 10.0436 18.3149 9.36061C18.2829 8.67961 18.1749 8.21461 18.0189 7.80761C17.8585 7.38059 17.607 6.99363 17.2819 6.67361C16.9636 6.34811 16.5779 6.09622 16.1519 5.93561C15.7439 5.77761 15.2799 5.66961 14.6009 5.63861C13.9199 5.60761 13.7029 5.59961 11.9679 5.59961H11.9699ZM11.3979 6.75261H11.9699C13.6749 6.75261 13.8769 6.75861 14.5499 6.78961C15.1729 6.81861 15.5099 6.92261 15.7349 7.00961C16.0329 7.12661 16.2449 7.26461 16.4689 7.48961C16.6929 7.71261 16.8309 7.92661 16.9469 8.22461C17.0339 8.45061 17.1379 8.78861 17.1669 9.41261C17.1969 10.0876 17.2039 10.2906 17.2039 11.9986C17.2039 13.7066 17.1969 13.9086 17.1669 14.5836C17.1379 15.2076 17.0339 15.5466 16.9469 15.7716C16.8445 16.0493 16.6812 16.3004 16.4689 16.5066C16.2633 16.7193 16.0124 16.883 15.7349 16.9856C15.5109 17.0736 15.1729 17.1776 14.5499 17.2056C13.8769 17.2366 13.6749 17.2436 11.9699 17.2436C10.2659 17.2436 10.0639 17.2366 9.38994 17.2056C8.76794 17.1776 8.42994 17.0726 8.20494 16.9856C7.92751 16.8829 7.67668 16.7192 7.47094 16.5066C7.25902 16.2999 7.09604 16.0485 6.99394 15.7706C6.90594 15.5456 6.80194 15.2066 6.77394 14.5826C6.74394 13.9086 6.73694 13.7056 6.73694 11.9966C6.73694 10.2866 6.74294 10.0866 6.77394 9.41161C6.80194 8.78761 6.90594 8.44861 6.99394 8.22261C7.10894 7.92461 7.24794 7.71061 7.47094 7.48661C7.67675 7.27412 7.92756 7.11044 8.20494 7.00761C8.42994 6.91961 8.76794 6.81561 9.39094 6.78761C9.97994 6.76061 10.2079 6.75361 11.3979 6.75261ZM15.2289 7.81561C15.0697 7.82216 14.919 7.89014 14.8087 8.00533C14.6982 8.12052 14.6366 8.27398 14.6367 8.43358C14.6368 8.59318 14.6987 8.74655 14.8094 8.86156C14.92 8.97657 15.0709 9.04431 15.2304 9.05061C15.3899 9.04406 15.5407 8.97608 15.6511 8.86089C15.7616 8.74569 15.8232 8.59223 15.8231 8.43263C15.823 8.27303 15.7611 8.11966 15.6504 8.00465C15.5398 7.88964 15.3889 7.8219 15.2294 7.81561H15.2289ZM11.9709 8.71261C11.5397 8.713 11.1128 8.79834 10.7146 8.96376C10.3164 9.12917 9.95462 9.37141 9.65003 9.67665C9.34544 9.98189 9.10397 10.3441 8.9394 10.7427C8.77484 11.1413 8.69041 11.5684 8.69094 11.9996C8.69041 12.4306 8.77478 12.8575 8.93923 13.2559C9.10368 13.6543 9.34499 14.0164 9.64938 14.3215C9.95377 14.6266 10.3153 14.8688 10.7133 15.0343C11.1113 15.1997 11.5379 15.2851 11.9689 15.2856C13.7799 15.2856 15.2469 13.8156 15.2469 11.9996C15.2476 11.5685 15.1633 11.1415 14.9989 10.743C14.8345 10.3445 14.5932 9.98231 14.2888 9.67707C13.9844 9.37183 13.6229 9.12955 13.2248 8.96406C12.8268 8.79858 12.4 8.71313 11.9689 8.71261H11.9709ZM11.9709 9.86661C12.5506 9.86739 13.1066 10.0977 13.5153 10.5073C13.9241 10.917 14.1536 11.4735 14.1529 12.0532C14.1522 12.633 13.9213 13.1888 13.5115 13.5975C13.1017 14.0062 12.545 14.2356 11.9652 14.2348C11.3855 14.234 10.8294 14.003 10.4208 13.5932C10.0121 13.1833 9.7829 12.6267 9.7838 12.0469C9.7847 11.4672 10.016 10.9113 10.4259 10.5028C10.8358 10.0942 11.3927 9.86521 11.9724 9.86621L11.9709 9.86661Z" fill="#404553" />
      </g>
      <defs>
        <clipPath id="ig-clip"><rect width="24" height="24" fill="white" /></clipPath>
      </defs>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="full" height="full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#li-clip)">
        <path d="M0 12C0 5.373 5.373 0 12 0C18.627 0 24 5.373 24 12C24 18.627 18.627 24 12 24C5.373 24 0 18.627 0 12Z" fill="#FEEE00" />
        <path d="M7.7771 7.87239C8.5371 7.87239 9.0001 7.31939 9.0001 6.63639C8.9851 5.93639 8.5381 5.40039 7.8071 5.40039C7.0771 5.40039 6.6001 5.93739 6.6001 6.63639C6.6001 7.31939 7.0621 7.87239 7.7771 7.87239ZM6.6601 8.84839V16.8004H8.9261V8.84839H6.6601Z" fill="#404553" />
        <path d="M10.2662 11.605C10.2662 10.654 10.2332 9.858 10.2002 9.172H12.4002L12.5172 10.232H12.5672C12.9002 9.734 13.7172 9 15.0832 9C16.7502 9 18.0002 10.045 18.0002 12.291V16.8H15.4662V12.572C15.4662 11.59 15.1002 10.919 14.1832 10.919C13.4832 10.919 13.0672 11.371 12.8832 11.809C12.8172 11.964 12.8002 12.182 12.8002 12.401V16.8H10.2662V11.605Z" fill="#404553" />
      </g>
      <defs>
        <clipPath id="li-clip"><rect width="24" height="24" fill="white" /></clipPath>
      </defs>
    </svg>
  );
}

function MastercardIcon() {
  return (
    <svg width="41" height="27" viewBox="0 0 41 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#mc-clip)">
        <mask id="mc-mask" style={{ maskType: "luminance" as const }} maskUnits="userSpaceOnUse" x="0" y="0" width="41" height="27">
          <path d="M0 10.9333C0 6.37811 0 4.10049 1.16004 2.50382C1.53469 1.98817 1.98817 1.53469 2.50382 1.16004C4.10049 0 6.37811 0 10.9333 0H30.0667C34.6219 0 36.8995 0 38.4962 1.16004C39.0118 1.53469 39.4653 1.98817 39.84 2.50382C41 4.10049 41 6.37811 41 10.9333V15.5183C41 20.0735 41 22.3511 39.84 23.9478C39.4653 24.4634 39.0118 24.917 38.4962 25.2916C36.8995 26.4516 34.6219 26.4516 30.0667 26.4516H10.9333C6.37811 26.4516 4.10049 26.4516 2.50382 25.2916C1.98817 24.917 1.53469 24.4634 1.16004 23.9478C0 22.3511 0 20.0735 0 15.5183V10.9333Z" fill="white" />
        </mask>
        <g mask="url(#mc-mask)">
          <path d="M0 10.9333C0 6.37811 0 4.10049 1.16004 2.50382C1.53469 1.98817 1.98817 1.53469 2.50382 1.16004C4.10049 0 6.37811 0 10.9333 0H30.0667C34.6219 0 36.8995 0 38.4962 1.16004C39.0118 1.53469 39.4653 1.98817 39.84 2.50382C41 4.10049 41 6.37811 41 10.9333V15.5183C41 20.0735 41 22.3511 39.84 23.9478C39.4653 24.4634 39.0118 24.917 38.4962 25.2916C36.8995 26.4516 34.6219 26.4516 30.0667 26.4516H10.9333C6.37811 26.4516 4.10049 26.4516 2.50382 25.2916C1.98817 24.917 1.53469 24.4634 1.16004 23.9478C0 22.3511 0 20.0735 0 15.5183V10.9333Z" fill="white" />
          <path d="M22.4028 9.14258H17.5979V17.3081H22.4028V9.14258Z" fill="#FF5F00" />
          <path d="M18.0921 13.2272C18.0916 12.4409 18.2628 11.6648 18.593 10.9575C18.9233 10.2504 19.4038 9.63053 19.9982 9.14508C19.262 8.54304 18.3778 8.16868 17.4468 8.06479C16.5158 7.96084 15.5754 8.13159 14.7331 8.55746C13.891 8.98326 13.1809 9.64713 12.6841 10.473C12.1873 11.2989 11.9238 12.2536 11.9238 13.2279C11.9238 14.2022 12.1873 15.1568 12.6841 15.9828C13.1809 16.8086 13.891 17.4724 14.7331 17.8983C15.5754 18.3242 16.5158 18.4949 17.4468 18.3909C18.3778 18.287 19.262 17.9127 19.9982 17.3106C19.4036 16.825 18.923 16.205 18.5927 15.4976C18.2625 14.7901 18.0913 14.0136 18.0921 13.2272Z" fill="#EB001B" />
          <path d="M28.0739 13.2253C28.0739 14.1997 27.8103 15.1544 27.3135 15.9803C26.8166 16.8063 26.1065 17.47 25.2641 17.8958C24.4218 18.3217 23.4813 18.4922 22.5502 18.3882C21.6191 18.2841 20.7349 17.9096 19.9988 17.3073C20.5929 16.8215 21.0733 16.2015 21.4037 15.4942C21.734 14.787 21.9056 14.0109 21.9056 13.2245C21.9056 12.4382 21.734 11.6622 21.4037 10.9549C21.0733 10.2477 20.5929 9.62769 19.9988 9.14178C20.7349 8.53954 21.6191 8.16498 22.5502 8.06096C23.4813 7.95688 24.4218 8.12749 25.2641 8.55329C26.1065 8.9791 26.8166 9.6429 27.3135 10.4688C27.8103 11.2947 28.0739 12.2494 28.0739 13.2239V13.2253Z" fill="#F79E1B" />
        </g>
        <path d="M10.9332 0.378906H30.0667C32.3527 0.378906 34.0367 0.379354 35.3499 0.521626C36.6559 0.663123 37.5499 0.941301 38.2728 1.46642C38.7562 1.81765 39.1814 2.24293 39.5326 2.72636C40.0578 3.44917 40.336 4.34318 40.4775 5.64921C40.6197 6.96237 40.6202 8.64641 40.6202 10.9324V15.5175C40.6202 17.8036 40.6197 19.4876 40.4775 20.8008C40.336 22.1068 40.0578 23.0008 39.5326 23.7236C39.1814 24.207 38.7562 24.6323 38.2728 24.9835C37.5499 25.5087 36.6559 25.7869 35.3499 25.9284C34.0367 26.0706 32.3527 26.0711 30.0667 26.0711H10.9332C8.64714 26.0711 6.9631 26.0706 5.64995 25.9284C4.34392 25.7869 3.4499 25.5087 2.72709 24.9835C2.24366 24.6323 1.81838 24.207 1.46715 23.7236C0.942034 23.0008 0.663855 22.1068 0.522358 20.8008C0.380086 19.4876 0.379639 17.8036 0.379639 15.5175V10.9324C0.379639 8.64641 0.380086 6.96237 0.522358 5.64921C0.663855 4.34318 0.942034 3.44917 1.46715 2.72636C1.81838 2.24293 2.24366 1.81765 2.72709 1.46642C3.4499 0.941301 4.34392 0.663123 5.64995 0.521626C6.9631 0.379354 8.64714 0.378906 10.9332 0.378906Z" stroke="#EBEBEB" strokeWidth="0.75926" />
      </g>
      <defs>
        <clipPath id="mc-clip"><rect width="41" height="26.4516" fill="white" /></clipPath>
      </defs>
    </svg>
  );
}

function VisaIcon() {
  return (
    <svg width="41" height="27" viewBox="0 0 41 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#visa-clip)">
        <path d="M0 9.52258C0 5.55512 0 3.57139 1.01036 2.18075C1.33667 1.73163 1.73163 1.33667 2.18075 1.01036C3.57139 0 5.55512 0 9.52258 0H31.4774C35.4449 0 37.4286 0 38.8193 1.01036C39.2683 1.33667 39.6633 1.73163 39.9896 2.18075C41 3.57139 41 5.55512 41 9.52258V16.929C41 20.8965 41 22.8802 39.9896 24.2709C39.6633 24.72 39.2683 25.1149 38.8193 25.4412C37.4286 26.4516 35.4449 26.4516 31.4774 26.4516H9.52258C5.55512 26.4516 3.57139 26.4516 2.18075 25.4412C1.73163 25.1149 1.33667 24.72 1.01036 24.2709C0 22.8802 0 20.8965 0 16.929V9.52258Z" fill="#1334CB" />
        <path d="M17.3422 9.05946L14.3328 16.4819H12.369L10.8714 10.5674C10.7866 10.2014 10.7018 10.0697 10.4334 9.90863C9.98129 9.65972 9.2466 9.42549 8.59668 9.27908L8.63907 9.05946H11.8039C12.2135 9.05946 12.5668 9.33767 12.6657 9.82074L13.4569 14.1102L15.3924 9.05946H17.3422ZM25.0563 14.0663C25.0705 12.1046 22.4426 11.9875 22.4567 11.1237C22.4567 10.8602 22.7111 10.5674 23.2479 10.5088C23.5163 10.4795 24.251 10.4503 25.0846 10.8455L25.4095 9.24978C24.9574 9.08876 24.3782 8.92773 23.6717 8.92773C21.835 8.92773 20.5352 9.93786 20.5211 11.3872C20.507 12.4559 21.4536 13.0562 22.1459 13.4075C22.8665 13.7735 23.1207 14.0077 23.1066 14.3298C23.1066 14.8276 22.5274 15.0471 21.9905 15.0618C21.058 15.0764 20.507 14.7983 20.0832 14.5933L19.7441 16.2183C20.182 16.4233 20.9873 16.599 21.821 16.6136C23.7706 16.599 25.0563 15.6034 25.0563 14.0663ZM29.9307 16.4819H31.6544L30.1426 9.05946H28.5602C28.207 9.05946 27.8962 9.27908 27.769 9.60119L24.9716 16.4819H26.9213L27.3027 15.3692H29.6905L29.9307 16.4819ZM27.8396 13.8613L28.8145 11.0798L29.3797 13.8613H27.8396ZM20.0125 9.05946L18.4725 16.4819H16.6076L18.1475 9.05946H20.0125Z" fill="white" />
      </g>
      <defs>
        <clipPath id="visa-clip"><rect width="41" height="26.4516" fill="white" /></clipPath>
      </defs>
    </svg>
  );
}

function AmexIcon() {
  return (
    <svg width="41" height="26" viewBox="0 0 41 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#amex-clip)">
        <path d="M37.6923 3.46667V4.816V21.5947V22.5333C37.6923 23.3547 37.0411 24 36.2123 24H4.48005C3.65122 24 3 23.3547 3 22.5333V3.46667C3 2.64533 3.65122 2 4.48005 2H36.2123C37.0411 2 37.6923 2.64533 37.6923 3.46667Z" fill="white" />
        <path d="M34.7914 21.5947L33.2522 19.8933L31.6537 21.5947H28.516H21.767V13.6747H18.6293L22.5366 4.816H26.3255L27.6872 7.86667V4.816H32.4233L33.2522 7.104L34.081 4.816H37.6923V3.46667C37.6923 2.64533 37.0411 2 36.2123 2H4.48005C3.65122 2 3 2.64533 3 3.46667V22.5333C3 23.3547 3.65122 24 4.48005 24H36.2123C37.0411 24 37.6923 23.3547 37.6923 22.5333V21.5947H34.7914Z" fill="#0071CE" />
        <path d="M35.2056 20.657H37.6921L34.436 17.1957L37.6921 13.793H35.2648L33.1927 16.0223L31.1799 13.793H28.6934L32.0087 17.2543L28.6934 20.657H31.1207L33.1927 18.4277L35.2056 20.657Z" fill="#0071CE" />
        <path d="M24.727 19.073V18.017H28.6343V16.433H24.727V15.377H28.6935V13.793H22.8325V20.657H28.6935V19.073H24.727Z" fill="#0071CE" />
        <path d="M35.8568 12.7937H37.6329V5.87109L34.7912 5.92976L33.252 10.2124L31.6535 5.92976H28.6934V12.7937H30.5879V7.98309L32.3639 12.7937H34.0216L35.8568 7.98309V12.7937Z" fill="#0071CE" />
        <path d="M25.6743 5.93164H23.247L20.1685 12.7956H22.2405L22.8326 11.4463H26.0295L26.6215 12.7956H28.7528L25.6743 5.93164ZM23.4838 9.86231L24.431 7.63297L25.3782 9.86231H23.4838Z" fill="#0071CE" />
        <path d="M35.9756 17.0179L37.6924 18.8953V15.1406L35.9756 17.0179Z" fill="#0071CE" />
      </g>
      <defs>
        <clipPath id="amex-clip"><rect width="41" height="26" fill="white" /></clipPath>
      </defs>
    </svg>
  );
}

function CodIcon() {
  return (
    <svg width="41" height="26" viewBox="0 0 41 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#cod-clip)">
        <path d="M33.1819 3H7.81819C6.26175 3 5 4.11929 5 5.5V20.5C5 21.8807 6.26175 23 7.81819 23H33.1819C34.7383 23 36 21.8807 36 20.5V5.5C36 4.11929 34.7383 3 33.1819 3Z" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d="M7.81819 4C6.69805 4 6 4.78082 6 5.5V20.5C6 21.2192 6.69805 22 7.81819 22H33.1819C34.302 22 35 21.2192 35 20.5V5.5C35 4.78082 34.302 4 33.1819 4H7.81819ZM4 5.5C4 3.45776 5.82544 2 7.81819 2H33.1819C35.1746 2 37 3.45776 37 5.5V20.5C37 22.5422 35.1746 24 33.1819 24H7.81819C5.82544 24 4 22.5422 4 20.5V5.5Z" fill="#6FA059" />
        <path d="M10.2219 14.2221C10.074 13.8458 10 13.4385 10 13C10 12.5615 10.074 12.1556 10.2219 11.7822C10.3699 11.4059 10.5719 11.0891 10.8282 10.8317C11.087 10.5714 11.3934 10.3678 11.7474 10.2207C12.1014 10.0736 12.4791 10 12.8806 10C13.1659 10 13.4314 10.0396 13.677 10.1188C13.9253 10.1952 14.1393 10.3027 14.3189 10.4413C14.5012 10.5799 14.6583 10.7298 14.7904 10.8911C14.9225 11.0495 15.04 11.2249 15.1431 11.4173L14.1525 11.9392C14.0363 11.6959 13.8633 11.495 13.6334 11.3366C13.4036 11.1782 13.1527 11.099 12.8806 11.099C12.3893 11.099 11.9838 11.2786 11.6642 11.6379C11.3446 11.9972 11.1848 12.4512 11.1848 13C11.1848 13.5488 11.3446 14.0042 11.6642 14.3663C11.9838 14.7256 12.3893 14.9052 12.8806 14.9052C13.1527 14.9052 13.4036 14.826 13.6334 14.6676C13.8633 14.5092 14.0363 14.3069 14.1525 14.0608L15.1431 14.5743C14.6306 15.5248 13.8765 16 12.8806 16C12.4791 16 12.1014 15.9264 11.7474 15.7793C11.3934 15.6322 11.087 15.43 10.8282 15.1726C10.5719 14.9123 10.3699 14.5955 10.2219 14.2221Z" fill="#6FA059" />
        <path d="M15.1982 15.894L17.2903 10.0977H18.7365L20.8207 15.894H19.5052L19.1724 14.9138H16.8545L16.5137 15.894H15.1982ZM17.1675 13.8275H18.8554L18.0114 11.3325L17.1675 13.8275Z" fill="#6FA059" />
        <path d="M20.9004 15.076L21.5265 14.1382C21.7352 14.3702 21.9861 14.5597 22.2793 14.7068C22.5725 14.8511 22.8948 14.9232 23.2461 14.9232C23.5472 14.9232 23.7784 14.861 23.9395 14.7365C24.1033 14.6092 24.1852 14.4564 24.1852 14.2782C24.1852 14.1707 24.1495 14.0774 24.0782 13.9982C24.0068 13.9161 23.9104 13.8497 23.7889 13.7987C23.6701 13.7478 23.5327 13.7011 23.3768 13.6587C23.221 13.6163 23.0572 13.5738 22.8855 13.5314C22.7138 13.4861 22.5421 13.4366 22.3704 13.3829C22.1987 13.3263 22.035 13.2542 21.8791 13.1665C21.7233 13.076 21.5846 12.9713 21.4631 12.8525C21.3442 12.7337 21.2491 12.5823 21.1778 12.3985C21.1065 12.2146 21.0708 12.0067 21.0708 11.7747C21.0708 11.2768 21.257 10.8596 21.6295 10.5229C22.0046 10.1835 22.5025 10.0137 23.1233 10.0137C23.9897 10.0137 24.6936 10.2825 25.2352 10.82L24.5933 11.7238C24.3793 11.5144 24.135 11.356 23.8602 11.2485C23.5855 11.141 23.3055 11.0873 23.0202 11.0873C22.7772 11.0873 22.587 11.141 22.4497 11.2485C22.315 11.3532 22.2476 11.4946 22.2476 11.6729C22.2476 11.7803 22.2912 11.8751 22.3784 11.9572C22.4682 12.0364 22.5857 12.0986 22.731 12.1439C22.8789 12.1863 23.0453 12.2344 23.2302 12.2881C23.4178 12.339 23.608 12.39 23.8008 12.4409C23.9936 12.489 24.1825 12.5597 24.3674 12.6531C24.555 12.7436 24.7214 12.8497 24.8667 12.9713C25.0146 13.0901 25.1321 13.2499 25.2193 13.4508C25.3091 13.6516 25.354 13.8808 25.354 14.1382C25.354 14.6927 25.1691 15.1424 24.7993 15.4876C24.4321 15.8299 23.8959 16.001 23.1906 16.001C22.2318 16.001 21.4684 15.6927 20.9004 15.076Z" fill="#6FA059" />
        <path d="M26.1304 15.894V10.0977H27.2834V12.3763H29.8391V10.0977H31V15.894H29.8391V13.4626H27.2834V15.894H26.1304Z" fill="#6FA059" />
      </g>
      <defs>
        <clipPath id="cod-clip"><rect width="41" height="26" fill="white" /></clipPath>
      </defs>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="font-sans ">
      {/* ── Support Bar ── */}
      <div className="bg-noon-bg border-t border-noon-border">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-[24px] py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          {/* Left: title + subtitle */}
          <div>
            <h3 className="text-[#404553] text-xl font-bold leading-[140%]">
              We're Always Here To Help
            </h3>
            <p className="text-[#7E859B] text-sm font-normal leading-[140%] mt-0.5">
              Reach out to us through any of these support channels
            </p>
          </div>

          {/* Right: support links */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            {/* Help Center */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full border border-noon-border bg-white flex items-center justify-center flex-shrink-0">
                <HelpCenterIcon />
              </div>
              <div>
                <span className="block text-[#7E859B] text-[11px] font-semibold uppercase leading-[140%] tracking-wide">
                  Help Center
                </span>
                <span className="block text-[#404553] text-[20px] font-semibold leading-[140%]">
                  help.noon.com
                </span>
              </div>
            </a>

            {/* Email Support */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full border border-noon-border bg-white flex items-center justify-center flex-shrink-0">
                <EmailIcon />
              </div>
              <div>
                <span className="block text-[#7E859B] text-[11px] font-semibold uppercase leading-[140%] tracking-wide">
                  Email Support
                </span>
                <span className="block text-[#404553] text-[20px] font-semibold leading-[140%]">
                  care@noon.com
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Footer Links ── */}
      <div className="  border-t border-noon-border">
        <div className=" bg-white max-w-screen-2xl mx-auto px-4 md:px-[24px] pt-6 pb-0">
          {/* 9-column links grid */}
          <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-9 lg:grid-cols-9 xl:grid-cols-9 2xl:grid-cols-9 gap-x-6 gap-y-8">
            {footerColumns.map((col) => (
              <div key={col.title} className="min-w-0">
                <h4 className="text-[#404553] text-[15px] font-bold leading-[140%] mb-3">
                  {col.title}
                </h4>
                <ul className="space-y-[7px]">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[#404553] text-[12px] font-normal leading-[140%] hover:text-noon-dark hover:underline transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── App Downloads + Social row ── */}
          <div className="w-[70%]  flex flex-col lg:flex-row items-start  justify-between gap-4 py-8 mt-4 mx-auto  ">
            {/* Shop On The Go */}
            <div className="flex flex-col items-center gap-3  ">
              <span className="text-[#404553] text-[16px] font-bold uppercase leading-[140%] tracking-wider">
                Shop On The Go
              </span>
              <div className="flex items-center gap-3 flex-wrap">
                <a href="#">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/5e35e9f8e0832f91e0ee5b50cc09bbd32afb9e70?width=226"
                    alt="App Store"
                    className="h-[35px] w-auto"
                  />
                </a>
                <a href="#">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/b836220b16bbea1f7640286fadbf93889d66223f?width=226"
                    alt="Google Play"
                    className="h-[35px] w-auto"
                  />
                </a>
                <a href="#">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/cc7f6625a82fd94626843224ece11a9bb09400ae?width=233"
                    alt="Huawei App Gallery"
                    className="h-[35px] w-auto"
                  />
                </a>
              </div>
            </div>

            {/* Connect With Us */}
            <div className="flex flex-col items-center gap-3">
              <span className="text-[#404553] text-[14px] font-bold uppercase leading-[140%] tracking-wider">
                Connect With Us
              </span>
              <div className="flex items-center gap-1">
                <a href="#" className="flex items-center justify-center w-[41px] h-[41px]">
                  <FacebookIcon />
                </a>
                <a href="#" className="flex items-center justify-center w-[41px] h-[41px]">
                  <TwitterIcon />
                </a>
                <a href="#" className="flex items-center justify-center w-[41px] h-[41px]">
                  <InstagramIcon />
                </a>
                <a href="#" className="flex items-center justify-center w-[41px] h-[41px]">
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Copyright Bar ── */}
        <div className="bg-noon-bg border-t  border-noon-border bg-noon-bg h-[115px] ">
          <div className="max-w-screen-2xl mx-auto px-4 md:px-[24px] py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-[#7E859B] text-[14px] font-normal leading-[140%] whitespace-nowrap">
              © 2026 noon. All Rights Reserved
            </p>

            {/* Payment icons */}
            <div className="flex items-center gap-2 flex-wrap">
              <MastercardIcon />
              <VisaIcon />
              {/* Tabby */}
              <svg width="41" height="27" viewBox="0 0 41 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="41" height="26.4516" rx="5.29" fill="url(#tabby-grad)" />
                <rect x="3.417" y="5.974" width="34.309" height="13.668" rx="2.657" fill="url(#tabby-grad2)" />
                <text x="5.5" y="16" fontFamily="Figtree, sans-serif" fontSize="6.5" fontWeight="700" fill="#292929" letterSpacing="-0.2">tabby</text>
                <defs>
                  <linearGradient id="tabby-grad" x1="41" y1="13.226" x2="0" y2="13.226" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3BFFC7" />
                    <stop offset="1" stopColor="#3BFF9E" />
                  </linearGradient>
                  <linearGradient id="tabby-grad2" x1="3.417" y1="12.807" x2="37.726" y2="12.807" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3BFF9D" />
                    <stop offset="1" stopColor="#3BFFC8" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Tamara */}
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/69a4e03a824a4843ddaa30b70940d02167ba3b35?width=82"
                alt="Tamara"
                className="h-[26px] w-auto"
              />
              <AmexIcon />
              <CodIcon />
            </div>

            {/* Legal links */}
            <nav className="flex flex-wrap gap-x-5 gap-y-1.5">
              {legalLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[#404553] text-[14px] font-normal leading-[140%] hover:underline whitespace-nowrap"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
