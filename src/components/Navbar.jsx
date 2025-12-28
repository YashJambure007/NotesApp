import { NavbarData } from "../data/Navbar";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 shadow-xl">
      {/* Desktop Navbar */}
      <div className="hidden md:flex h-[70px] justify-center items-center p-4 gap-x-8">
        <div className="flex items-center gap-x-2 mr-auto ml-8">
          <div className="p-2 rounded-xl bg-white/20 backdrop-blur-xl border border-white/30">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 className="text-white font-bold text-xl hidden sm:block">PasteHub</h1>
        </div>

        <nav className="flex items-center gap-x-6">
          {NavbarData.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 text-white font-semibold text-sm rounded-xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg transition duration-300"
                  : "px-4 py-2 text-white font-medium text-sm rounded-xl hover:bg-white/10 backdrop-blur-xl border border-white/10 transition duration-300 hover:border-white/30"
              }
            >
              {link.title}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex h-[70px] justify-between items-center p-4">
        <div className="flex items-center gap-x-2">
          <div className="p-2 rounded-xl bg-white/20 backdrop-blur-xl border border-white/30">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 className="text-white font-bold text-lg">PasteHub</h1>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-white/20 backdrop-blur-xl border border-white/30 text-white hover:bg-white/30 transition duration-300"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-blue-500 to-purple-600 border-t border-white/30 shadow-2xl animate-slideDown">
          <nav className="flex flex-col gap-y-2 p-4">
            {NavbarData.map((link, idx) => (
              <NavLink
                key={idx}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "px-4 py-3 text-white font-semibold text-sm rounded-xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg transition duration-300"
                    : "px-4 py-3 text-white font-medium text-sm rounded-xl hover:bg-white/10 backdrop-blur-xl border border-white/10 transition duration-300 hover:border-white/30"
                }
              >
                {link.title}
              </NavLink>
            ))}
          </nav>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
