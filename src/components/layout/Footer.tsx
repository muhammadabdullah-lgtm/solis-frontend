import { useState } from "react";
import type { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { MapPin, Phone, Mail, Apple, ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { footerLinks } from "../../lib/data";
import { PAYMENT_METHODS } from "../../lib/constants";
import SocialIconButton from "../common/SocialIconButton";
import ContactItem from "../common/ContactItem";
import AppStoreButton from "../common/AppStoreButton";
import GooglePlayIcon from "../common/GooglePlayIcon";



const SOCIAL_LINKS = [
  { icon: <FaTwitter size={17} />, label: "Twitter" },
  { icon: <FaFacebook size={17} />, label: "Facebook" },
  { icon: <FaInstagram size={17} />, label: "Instagram" },
  { icon: <FaYoutube size={17} />, label: "YouTube" },
];

const CONTACT_INFO = [
  { Icon: MapPin, text: "Lahore, Pakistan" },
  { Icon: Phone, text: "+92 300 000 0000" },
  { Icon: Mail, text: "support@solis.pk" },
];






const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email.trim()) {
      setEmail("");
    }
  };

  return (
    <footer className="mt-16">

      <div className="bg-[#feee00]">
        <div className="mx-auto px-4 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black text-black">Stay in the loop</h3>
            <p className="text-sm text-black/60 mt-0.5">
              Get the best deals and new arrivals straight to your inbox.
            </p>
          </div>
          <div className="flex items-center w-full md:w-auto gap-2 max-w-sm">
            <Input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              placeholder="Enter your email"
              wrapperClassName="flex-1"
              className="border-0 rounded-lg shadow-sm placeholder:text-gray-400 px-4"
            />
            <Button variant="dark" size="md" className="shrink-0" onClick={handleSubscribe}>
              Subscribe <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </div>


      <div className="bg-[#1a1a1a] text-white">
        <div className="mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">


            <div className="col-span-2 md:col-span-1 lg:col-span-2">
              <Link to="/" className="text-2xl font-black text-[#feee00] tracking-tight">
                solis
              </Link>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed max-w-xs">
                Your one-stop destination for electronics, fashion, home
                essentials, and more — delivered fast across Pakistan.
              </p>

              <div className="mt-5 space-y-2 text-sm text-gray-400">
                {CONTACT_INFO.map(({ Icon, text }) => (
                  <ContactItem key={text} Icon={Icon} text={text} />
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <SocialIconButton key={s.label} icon={s.icon} label={s.label} />
                ))}
              </div>
            </div>


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


            <div className="col-span-2 md:col-span-1">
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">
                Get the App
              </h4>
              <div className="space-y-3">
                <AppStoreButton
                  icon={<Apple size={22} className="text-white shrink-0" />}
                  eyebrow="Download on the"
                  label="App Store"
                />
                <AppStoreButton
                  icon={<GooglePlayIcon />}
                  eyebrow="Get it on"
                  label="Google Play"
                />
              </div>
            </div>
          </div>
        </div>


        <div className="border-t border-white/10 bg-black/30">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 order-2 sm:order-1">
              © {new Date().getFullYear()} Solis. All rights reserved.
            </p>
            <div className="flex items-center gap-2 order-1 sm:order-2 flex-wrap justify-center">
              {PAYMENT_METHODS.map((method) => (
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
};

export default Footer;
