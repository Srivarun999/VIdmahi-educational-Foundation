"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DONATION_FORM_URL } from "@/constants";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo/vidmahi-logo.png"
              alt="Vidmahi Educational Foundation"
              width={48}
              height={48}
              className="object-contain"
            />
            <div className="hidden sm:block">
              <div className="font-bold text-[#0A2E6D] text-base leading-tight">
                VIDMAHI
              </div>
              <div className="text-xs text-[#5A8F2D] leading-tight">
                EDUCATIONAL FOUNDATION
              </div>
              <div className="text-[10px] text-[#F2B233] italic leading-tight">
                Igniting minds, illuminating futures.
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-[#0A2E6D] font-medium hover:text-[#5A8F2D] transition-colors text-sm"
            >
              Home
            </Link>
            <Link
              href="/#about"
              className="text-gray-700 hover:text-[#5A8F2D] transition-colors text-sm"
            >
              About Us
            </Link>
            <Link
              href="/#programs"
              className="text-gray-700 hover:text-[#5A8F2D] transition-colors text-sm"
            >
              Our Program
            </Link>
            <Link
              href="/#reports"
              className="text-gray-700 hover:text-[#5A8F2D] transition-colors text-sm"
            >
              Annual Reports
            </Link>
            <Link
              href="/gallery"
              className="text-gray-700 hover:text-[#5A8F2D] transition-colors text-sm"
            >
              Gallery
            </Link>
            <a
              href={DONATION_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#5A8F2D] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#4a7a25] transition-colors"
            >
              Donate
            </a>
            <Link
              href="/#contact"
              className="text-gray-700 hover:text-[#5A8F2D] transition-colors text-sm"
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-0.5 bg-gray-700 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-700 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-700"></div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-[#0A2E6D] font-medium">Home</Link>
          <Link href="/#about" onClick={() => setMenuOpen(false)} className="text-gray-700">About Us</Link>
          <Link href="/#programs" onClick={() => setMenuOpen(false)} className="text-gray-700">Our Program</Link>
          <Link href="/#reports" onClick={() => setMenuOpen(false)} className="text-gray-700">Annual Reports</Link>
          <Link href="/gallery" onClick={() => setMenuOpen(false)} className="text-gray-700">Gallery</Link>
          <a
            href={DONATION_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#5A8F2D] text-white px-4 py-2 rounded text-sm font-medium text-center"
          >
            Donate
          </a>
          <Link href="/#contact" onClick={() => setMenuOpen(false)} className="text-gray-700">Contact Us</Link>
        </div>
      )}
    </header>
  );
}
