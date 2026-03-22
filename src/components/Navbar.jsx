import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Import the CSS file from styles folder

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Wood Texture Background with Overlay */}
      <nav className="relative bg-wood-dark text-amber-50 shadow-2xl">
        {/* Wood Grain Overlay */}
        <div className="absolute inset-0 bg-wood-pattern opacity-30 pointer-events-none"></div>

        {/* Vintage Paper Texture Overlay */}
        <div className="absolute inset-0 bg-vintage-paper opacity-20 mix-blend-overlay pointer-events-none"></div>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo with Brass Accent */}
            <div className="flex items-center space-x-3">
              {/* Vintage Seal/Medallion */}
              <div className="hidden sm:block w-10 h-10 bg-brass-gradient rounded-full shadow-inner border border-amber-700/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-wood-grain opacity-40"></div>
                <div className="absolute inset-1 border border-amber-300/30 rounded-full"></div>
                <div className="absolute inset-2 border border-amber-400/20 rounded-full"></div>
              </div>

              <Link
                to="/"
                className="font-serif text-xl md:text-2xl tracking-wide vintage-text hover:text-amber-300 transition-all duration-300 hover:drop-shadow-lg relative group"
              >
                <span className="relative">
                  MyApp
                  {/* Hand-drawn underline effect */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-500"></span>
                </span>
                <span className="text-xs block -mt-1 font-mono text-amber-400/70 tracking-widest">
                  EST. 2024
                </span>
              </Link>
            </div>

            {/* Desktop Menu - Vintage Style */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { path: "/", label: "Home", icon: "📜" },
                { path: "/jobs", label: "Jobs & Payments", icon: "⚙️" },
                { path: "/transactions", label: "Transactions", icon: "📖" },
                { path: "/dashboard", label: "Dashboard", icon: "🏛️" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative group px-4 py-2 font-serif text-amber-100 hover:text-amber-200 transition-all duration-300"
                >
                  {/* Vintage Button Background on Hover */}
                  <span className="absolute inset-0 bg-wood-light opacity-0 group-hover:opacity-20 rounded-md transition-all duration-300"></span>
                  <span className="absolute inset-0 border border-amber-700/30 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300"></span>

                  <span className="relative flex items-center space-x-2">
                    <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </span>
                    <span className="text-sm tracking-wide">{item.label}</span>
                  </span>

                  {/* Hand-drawn underline */}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-amber-500/50 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button - Leather/Paper Style */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-10 h-10 rounded-md border border-amber-700/50 bg-wood-medium/50 backdrop-blur-sm hover:bg-wood-light/50 transition-all duration-300 group"
              aria-label="Toggle menu"
            >
              {/* Vintage-style hamburger icon */}
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1.5">
                <span
                  className={`w-5 h-0.5 bg-amber-300 transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
                ></span>
                <span
                  className={`w-5 h-0.5 bg-amber-300 transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
                ></span>
                <span
                  className={`w-5 h-0.5 bg-amber-300 transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                ></span>
              </div>
              {/* Brass rivet effect */}
              <div className="absolute top-1 left-1 w-1 h-1 bg-amber-600 rounded-full"></div>
              <div className="absolute bottom-1 right-1 w-1 h-1 bg-amber-600 rounded-full"></div>
            </button>
          </div>
        </div>

        {/* Decorative Brass Edge */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-600/50 to-transparent"></div>
      </nav>

      {/* Mobile Menu - Vintage Accordion Style */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-wood-dark border-t border-amber-800/30 shadow-inner relative">
          {/* Wood texture overlay */}
          <div className="absolute inset-0 bg-wood-pattern opacity-20 pointer-events-none"></div>

          <div className="relative py-3 space-y-1">
            {[
              { path: "/", label: "Home", icon: "📜" },
              { path: "/jobs", label: "Jobs & Payments", icon: "⚙️" },
              { path: "/transactions", label: "Transactions", icon: "📖" },
              { path: "/dashboard", label: "Dashboard", icon: "🏛️" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-4 px-6 py-3 font-serif text-amber-100 hover:bg-wood-light/30 transition-all duration-300 group relative"
              >
                {/* Vintage page turn effect on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-amber-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></span>

                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
                <span className="text-base tracking-wide">{item.label}</span>

                {/* Hand-drawn arrow on hover */}
                <span className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}

            {/* Decorative divider */}
            <div className="relative mt-2 mb-1">
              <div className="absolute left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent"></div>
            </div>

            {/* Vintage signature/motto */}
            <div className="px-6 py-3">
              <p className="text-xs font-mono text-amber-500/60 tracking-wider text-center">
                ✦ Student Financial Heritage ✦
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
