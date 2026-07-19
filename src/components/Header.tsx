"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/Button";
import { Download } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full text-white border-b-2 border-purple-700 bg-black backdrop-blur-lg">
      <div className="absolute -bottom-[2px] left-0 w-full h-[2px] overflow-hidden pointer-events-none">
        <div className="absolute h-full bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-glow-left blur-[0.5px]" />
        <div className="absolute h-full bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-glow-right blur-[0.5px]" />
      </div>
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold">
          <Link
            href="/"
            className="hover:text-purple-500 hover:shadow-lg hover:shadow-purple-500/50 transition duration-200"
          >
            PUNITH
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/about"
            className="relative group hover:text-purple-500 text-lg transition-all"
          >
            About
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-purple-500 shadow-[0_2px_4px_#a855f7] origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          </Link>
          <Link
            href="/projects"
            className="relative group hover:text-purple-500 text-lg transition-all"
          >
            Projects
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-purple-500 shadow-[0_2px_4px_#a855f7] origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          </Link>
          <div className="relative group">
            <button className="relative group hover:text-purple-500 text-lg transition-all flex items-center gap-1">
              Utilities
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-purple-500 shadow-[0_2px_4px_#a855f7] origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </button>
            <div className="absolute top-full left-0 mt-2 rounded-lg shadow-xl border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[200px] p-2">
              <Link
                href="/typing"
                className="block px-4 py-2 hover:bg-gray-900 rounded text-left hover:text-purple-400 transition-colors w-full"
              >
                Typing Practice
              </Link>
              <Link
                href="/texthandle"
                className="block px-4 py-2 hover:bg-gray-900 rounded text-left hover:text-purple-400 transition-colors w-full"
              >
                Text Handle
              </Link>
            </div>
          </div>
          {/* <Link
            href="/blog"
            className="relative group hover:text-purple-500 text-lg transition-all"
          >
            Blog
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-purple-500 shadow-[0_2px_4px_#a855f7] origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          </Link> */}
          <Link
            href="/contact"
            className="relative group hover:text-purple-500 text-lg transition-all"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-purple-500 shadow-[0_2px_4px_#a855f7] origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          </Link>
          <Link
            href="/resume"
            className="block w-full mb-6 glow-hover shadow-2xl"
          >
            <button className="glass w-full px-6 py-3 rounded-xl mt-5 text-white font-semibold hover:bg-purple-600 transition-all duration-300 hover:scale-[1.02] glow-card">
              View Resume
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-700">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link
                href="/"
                className="block hover:text-purple-500 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block hover:text-purple-500 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="block hover:text-purple-500 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>
            </li>
            <li className="group relative">
              <button className="block w-full text-left hover:text-purple-500 py-2 transition-all group-hover:bg-gray-700 px-4 rounded">
                Utilities ▼
              </button>
              <div className="absolute top-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[140px] ml-auto">
                <Link
                  href="/typing"
                  className="block px-4 py-2 hover:bg-gray-700 rounded text-left hover:text-purple-400 transition-colors w-full"
                >
                  Typing Practice
                </Link>
                <Link
                  href="/texthandle"
                  className="block px-4 py-2 hover:bg-gray-700 rounded text-left hover:text-purple-400 transition-colors w-full"
                >
                  Text Handle
                </Link>
              </div>
            </li>
            <li>
              <Link
                href="/blog"
                className="block hover:text-purple-500 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block hover:text-purple-500 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link href="/resume" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="glass"
                  size="sm"
                  className="mt-2 w-full glow-hover"
                >
                  View Resume
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
