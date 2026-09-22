"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUtilitiesOpen, setIsUtilitiesOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full text-white border-b-2 border-purple-700 bg-black/90 backdrop-blur-xl">
      <div className="absolute -bottom-[2px] left-0 w-full h-[2px] overflow-hidden pointer-events-none">
        <div className="absolute h-full bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-glow-left blur-[0.5px]" />
        <div className="absolute h-full bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-glow-right blur-[0.5px]" />
      </div>

      <nav className="container mx-auto px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-xl font-bold tracking-wider">
          <Link
            href="/"
            className="hover:text-purple-400 transition-colors"
          >
            PUNITH
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/about"
            className="relative group hover:text-purple-400 text-base font-medium transition-all"
          >
            About
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-purple-500 origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>
          <Link
            href="/projects"
            className="relative group hover:text-purple-400 text-base font-medium transition-all"
          >
            Projects
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-purple-500 origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>
          
          {/* Desktop Utilities Dropdown */}
          <div className="relative group">
            <button className="relative hover:text-purple-400 text-base font-medium transition-all flex items-center gap-1 py-1">
              Utilities
              <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 mt-1 rounded-xl shadow-2xl border border-zinc-800 bg-zinc-950 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[190px] p-2">
              <Link
                href="/typing"
                className="block px-4 py-2.5 hover:bg-purple-950/40 rounded-lg text-left hover:text-purple-400 transition-colors text-sm font-medium"
              >
                Typing Practice
              </Link>
              <Link
                href="/texthandle"
                className="block px-4 py-2.5 hover:bg-purple-950/40 rounded-lg text-left hover:text-purple-400 transition-colors text-sm font-medium"
              >
                Text Handle
              </Link>
            </div>
          </div>

          <Link
            href="/contact"
            className="relative group hover:text-purple-400 text-base font-medium transition-all"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-purple-500 origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>

          <Link href="/resume">
            <button className="px-4 py-2 rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white font-semibold text-sm border border-purple-400/40 shadow-lg hover:shadow-purple-500/50 transition-all duration-200">
              View Resume
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 transition-colors"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <X className="w-6 h-6 text-purple-400" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div 
          id="mobile-navigation" 
          className="md:hidden bg-zinc-950/95 border-b border-zinc-800 backdrop-blur-2xl animate-in slide-in-from-top-4 duration-200"
        >
          <ul className="flex flex-col space-y-3 p-5 font-medium text-base">
            <li>
              <Link
                href="/"
                className="block py-2 text-zinc-200 hover:text-purple-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block py-2 text-zinc-200 hover:text-purple-400"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="block py-2 text-zinc-200 hover:text-purple-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
            </li>
            
            {/* Mobile Utilities Accordion */}
            <li>
              <button
                onClick={() => setIsUtilitiesOpen(!isUtilitiesOpen)}
                aria-expanded={isUtilitiesOpen}
                className="flex items-center justify-between w-full py-2 text-zinc-200 hover:text-purple-400 focus:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 rounded px-1"
              >
                <span>Utilities</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isUtilitiesOpen ? "rotate-180 text-purple-400" : ""}`} />
              </button>
              {isUtilitiesOpen && (
                <div className="ml-4 pl-3 border-l-2 border-purple-500/40 space-y-2 pt-1 pb-2">
                  <Link
                    href="/typing"
                    className="block py-1.5 text-sm text-zinc-400 hover:text-purple-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Typing Practice
                  </Link>
                  <Link
                    href="/texthandle"
                    className="block py-1.5 text-sm text-zinc-400 hover:text-purple-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Text Handle
                  </Link>
                </div>
              )}
            </li>

            <li>
              <Link
                href="/contact"
                className="block py-2 text-zinc-200 hover:text-purple-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>

            <li className="pt-2">
              <Link href="/resume" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm shadow-lg shadow-purple-500/30 hover:bg-purple-500 transition-colors text-center">
                  View Resume
                </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
