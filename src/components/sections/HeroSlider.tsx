"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { heroSlides } from "@/data/site";
import { DONATION_FORM_URL } from "@/constants";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % heroSlides.length);
  }, []);

  const prev = () => {
    setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          {/* Fallback gradient bg if image not loaded */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${slide.image}')`,
              backgroundColor: "#0A2E6D",
            }}
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-6 sm:px-10">
        <div className="max-w-xl">
          <p className="text-yellow-400 uppercase tracking-widest text-xs font-semibold mb-3">
            Empowering Rural Students
          </p>
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-2">
            Empowering Rural Students.
          </h1>
          <h1 className="text-yellow-400 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Building Brighter Futures.
          </h1>
          {/* Decorative line */}
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px w-8 bg-yellow-400"></div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#F2B233">
              <path d="M12 2L14.09 8.26L21 9L15.5 14.14L17.18 21L12 17.77L6.82 21L8.5 14.14L3 9L9.91 8.26L12 2Z" />
            </svg>
            <div className="h-px w-8 bg-yellow-400"></div>
          </div>
          <p className="text-gray-200 text-base sm:text-lg mb-8 leading-relaxed">
            Providing free education, guidance and opportunities to help rural students achieve their dreams.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={DONATION_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#5A8F2D] hover:bg-[#4a7a25] text-white px-6 py-3 rounded font-semibold transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Support Our Mission
            </a>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 border border-white text-white hover:bg-white/20 px-6 py-3 rounded font-semibold transition-colors"
            >
              Explore Gallery
            </Link>
          </div>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${i === current ? "bg-yellow-400 w-6" : "bg-white/60"}`}
          />
        ))}
      </div>
    </section>
  );
}
