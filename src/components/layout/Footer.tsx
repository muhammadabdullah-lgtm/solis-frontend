import { useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { MapPin, Phone, Mail, Apple, ArrowRight } from "lucide-react";

/* ── Data ── */

const footerLinks = [
  {
    heading: "Customer Service",
    links: [
      "Help Center",
      "Track Your Order",
      "Returns & Refunds",
      "FAQs",
      "Contact Us",
    ],
  },
  {
    heading: "My Account",
    links: ["Sign In", "Register", "My Cart", "Wishlist", "Order History"],
  },
  {
    heading: "About Solis",
    links: ["About Us", "Careers", "Press", "Sustainability"],
  },
];

const socialLinks = [
  { icon: <FaTwitter size={17} />, label: "Twitter" },
  { icon: <FaFacebook size={17} />, label: "Facebook" },
  { icon: <FaInstagram size={17} />, label: "Instagram" },
  { icon: <FaYoutube size={17} />, label: "YouTube" },
];

const paymentMethods = [
  "Visa",
  "Mastercard",
  "PayPal",
  "Apple Pay",
  "Cash on Delivery",
];

/* ── Component ── */

function Footer() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubscribe = () => {
    if (email.trim()) {
      // TODO: wire up newsletter API
      setEmail("");
    }
  };

  return (
    <footer className="mt-16">
      {/* ── Newsletter strip ── */}
      <div className="bg-[#feee00]">
        <div className=" mx-auto px-4 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black text-black">Stay in the loop</h3>
            <p className="text-sm text-black/60 mt-0.5">
              Get the best deals and new arrivals straight to your inbox.
            </p>
          </div>
          <div className="flex items-center w-full md:w-auto gap-2 max-w-sm">
            <input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2.5 rounded-lg text-sm outline-none border-0 shadow-sm placeholder:text-gray-400"
            />
            <button
              onClick={handleSubscribe}
              className="bg-black text-[#feee00] px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-900 transition-colors flex items-center gap-2 shrink-0"
            >
              Subscribe <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Main footer ── */}
      <div className="bg-[#1a1a1a] text-white">
        <div className=" mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-1 lg:col-span-2">
              <button
                onClick={() => navigate("/")}
                className="text-2xl font-black text-[#feee00] tracking-tight"
              >
                solis
              </button>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed max-w-xs">
                Your one-stop destination for electronics, fashion, home
                essentials, and more — delivered fast across Pakistan.
              </p>

              {/* Contact info */}
              <div className="mt-5 space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-[#feee00] shrink-0" />
                  <span>Lahore, Pakistan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-[#feee00] shrink-0" />
                  <span>+92 300 000 0000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-[#feee00] shrink-0" />
                  <span>support@solis.pk</span>
                </div>
              </div>

              {/* Social icons */}
              <div className="mt-5 flex items-center gap-3">
                {socialLinks.map((s) => (
                  <button
                    key={s.label}
                    aria-label={s.label}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-[#feee00] hover:text-black transition-colors"
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {footerLinks.map((col) => (
              <div key={col.heading}>
                <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">
                  {col.heading}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <button className="text-sm text-gray-400 hover:text-[#feee00] transition-colors text-left">
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* App download */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">
                Get the App
              </h4>
              <div className="space-y-3">
                {/* App Store */}
                <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-4 py-3 w-full text-left">
                  <Apple size={22} className="text-white shrink-0" />
                  <div>
                    <p className="text-[10px] text-gray-400 leading-none">
                      Download on the
                    </p>
                    <p className="text-sm font-semibold text-white leading-tight">
                      App Store
                    </p>
                  </div>
                </button>
                {/* Google Play */}
                <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-4 py-3 w-full text-left">
                  <GooglePlayIcon />
                  <div>
                    <p className="text-[10px] text-gray-400 leading-none">
                      Get it on
                    </p>
                    <p className="text-sm font-semibold text-white leading-tight">
                      Google Play
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/10 bg-black/30">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-xs text-gray-500 order-2 sm:order-1">
              © {new Date().getFullYear()} Solis. All rights reserved.
            </p>

            {/* Payment methods */}
            <div className="flex items-center gap-2 order-1 sm:order-2 flex-wrap justify-center">
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className="text-[10px] font-semibold text-gray-400 border border-white/10 rounded px-2 py-1 bg-white/5"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Google Play icon (SVG — not in lucide) ── */
function GooglePlayIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      className="shrink-0"
      aria-hidden="true"
    >
      <path
        fill="#EA4335"
        d="M1.22 0L13.2 12 1.22 24C.48 23.68 0 22.92 0 22V2C0 1.08.48.32 1.22 0z"
      />
      <path
        fill="#FBBC05"
        d="M20.4 10.22L17.2 8.4 13.2 12l4 4 3.24-1.82A2.1 2.1 0 0 0 20.4 10.22z"
      />
      <path fill="#4285F4" d="M1.22 0C.82.19.48.52.26.96L13.2 12 17.2 8.4z" />
      <path
        fill="#34A853"
        d="M.26 23.04C.48 23.48.82 23.8 1.22 24L17.2 15.6 13.2 12z"
      />
    </svg>
  );
}

export default Footer;
