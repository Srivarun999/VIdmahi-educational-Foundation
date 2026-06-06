import Image from "next/image";
import Link from "next/link";
import { programs } from "@/data/programs";

export default function OurPrograms() {
  return (
    <section id="programs" className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center gap-2 mb-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5A8F2D" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <span className="text-[#5A8F2D] uppercase tracking-widest text-xs font-semibold">
            OUR PROGRAM
          </span>
        </div>

        <div className="space-y-10">
          {programs.map((program) => (
            <div
              key={program.id}
              className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Text */}
              <div className="p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2E6D] mb-3">
                  {program.title}
                </h2>
                <div className="flex items-start gap-2 mb-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5A8F2D" strokeWidth="2" className="mt-0.5 flex-shrink-0">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-[#5A8F2D] text-sm font-medium">{program.location}</span>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  {program.description}
                </p>
                <Link
                  href={`/gallery#${program.id}`}
                  className="inline-flex items-center gap-2 bg-[#0A2E6D] text-white px-5 py-2.5 rounded font-medium text-sm hover:bg-[#0d3880] transition-colors"
                >
                  View More →
                </Link>
              </div>

              {/* Image */}
              <div className="relative h-64 md:h-80">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
