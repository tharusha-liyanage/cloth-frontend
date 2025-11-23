// src/components/Footer.jsx
import React from "react";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#604a03ff] text-white py-10">
      <div className="container mx-auto px-4">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">

          {/* Pages */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Pages</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/newArrival" className="hover:text-white transition">New Arrival</a></li>
              <li><a href="/officeWear" className="hover:text-white transition">Office Wear</a></li>
              <li><a href="/denim" className="hover:text-white transition">Denim</a></li>
              <li><a href="/frock" className="hover:text-white transition">Frock</a></li>
              <li><a href="/topWear" className="hover:text-white transition">Top Wear</a></li>
            </ul>
          </div>

          {/* Description */}
          <div className="max-w-xs">
            <h3 className="text-lg font-semibold mb-4">Mahinda Trade Center</h3>
            <p className="text-gray-300">
              A trusted fashion spot offering trendy, affordable, and high-quality clothing for everyday style.
            </p>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 Mahinda Trade Center. All rights reserved.
          </p>

          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-pink-400 transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-green-400 transition">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
