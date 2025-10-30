'use client';

import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-black text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/" className="hover:text-purple-500 hover:shadow-lg hover:shadow-purple-500/50 transition duration-200">
            PUNITH
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="/" className="hover:text-purple-500">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-purple-500">
              About
            </Link>
          </li>
          <li>
            <Link href="/projects" className="hover:text-purple-500">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/typing" className="hover:text-purple-500">
              Typing
            </Link>
          </li>
          <li>
            <Link href="/texthandle" className="hover:text-purple-500">
              TextHandle
            </Link>
          </li>
          <li>
            <Link href="/fileupload" className="hover:text-purple-500">
              File Upload
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-purple-500">
              Contact
            </Link>
          </li>
        </ul>

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
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/typing"
                className="block hover:text-purple-500 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Typing
              </Link>
            </li>
            <li>
              <Link
                href="/texthandle"
                className="block hover:text-purple-500 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                TextHandle
              </Link>
            </li>
            <li>
              <Link
                href="/fileupload"
                className="block hover:text-purple-500 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                File Upload
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
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
