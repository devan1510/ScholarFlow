import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";

const HomePage = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    {
      text: "Financial education is not just about money, it's about freedom and the power to shape your own destiny.",
      author: "Robert Kiyosaki",
      icon: "⚡",
    },
    {
      text: "The best investment you can make is in your own education. Knowledge compounds like interest, but never stops growing.",
      author: "Benjamin Franklin",
      icon: "📚",
    },
    {
      text: "Don't tell me where your priorities are. Show me where you spend your money and I'll tell you what they are.",
      author: "James W. Frick",
      icon: "🎯",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-aged-paper relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-800/5 rounded-full blur-3xl"></div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Logo - Centered */}
          <div className="mb-12 relative">
            <div className="absolute inset-0 bg-brass-gradient rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative inline-block">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-brass-gradient rounded-full shadow-2xl flex items-center justify-center border-4 border-amber-300/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-wood-grain opacity-20"></div>
                <span className="text-6xl md:text-7xl relative z-10">🎓</span>
              </div>
              {/* Decorative Rings */}
              <div className="absolute -inset-2 border-2 border-amber-600/20 rounded-full"></div>
              <div className="absolute -inset-4 border border-amber-600/10 rounded-full"></div>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-8 relative inline-block">
            <span className="bg-gradient-to-r from-amber-900 via-amber-700 to-amber-800 bg-clip-text text-transparent">
              ScholarFlow
            </span>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
          </h1>

          {/* Rotating Quotes Section */}
          <div className="max-w-3xl mx-auto mt-16">
            <div className="vintage-card p-8 md:p-12 rounded-lg relative overflow-hidden">
              {/* Animated Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 via-transparent to-amber-600/5 animate-shimmer"></div>

              {/* Quote Icon */}
              <div className="text-5xl mb-6 transform transition-all duration-500 hover:scale-110 inline-block">
                {quotes[quoteIndex].icon}
              </div>

              {/* Quote Text with Fade Animation */}
              <div className="relative">
                <div className="absolute -top-4 -left-4 text-6xl text-amber-600/20 font-serif">
                  "
                </div>
                <p
                  key={quoteIndex}
                  className="font-serif text-xl md:text-2xl text-amber-800 leading-relaxed mb-6 animate-fadeIn px-4"
                >
                  {quotes[quoteIndex].text}
                </p>
                <div className="absolute -bottom-4 -right-4 text-6xl text-amber-600/20 font-serif">
                  "
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center justify-center gap-3 mt-6">
                <div className="w-12 h-px bg-amber-600/30"></div>
                <p className="font-mono text-sm text-amber-700 tracking-wide">
                  — {quotes[quoteIndex].author}
                </p>
                <div className="w-12 h-px bg-amber-600/30"></div>
              </div>

              {/* Quote Navigation Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {quotes.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuoteIndex(idx)}
                    className={`transition-all duration-300 ${
                      quoteIndex === idx
                        ? "w-6 h-2 bg-amber-600 rounded-full"
                        : "w-2 h-2 bg-amber-600/30 rounded-full hover:bg-amber-600/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Decorative Bottom Element */}
          <div className="mt-16 flex justify-center gap-2">
            <div className="w-8 h-px bg-amber-600/30"></div>
            <div className="w-2 h-2 bg-amber-600/50 rounded-full"></div>
            <div className="w-8 h-px bg-amber-600/30"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
