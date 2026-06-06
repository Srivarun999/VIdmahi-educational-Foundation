import Image from "next/image";
import { VOLUNTEER_FORM_URL } from "@/constants";
import { aboutContent } from "@/data/about";

export default function WhoWeAre() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center gap-2 mb-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5A8F2D" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <span className="text-[#5A8F2D] uppercase tracking-widest text-xs font-semibold">
            WHO WE ARE
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Text content */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="flex items-center justify-center rounded-full bg-[#F8FAFC] p-2 shadow-sm">
                <Image
                  src="/favicon.png"
                  alt="Vidmahi logo"
                  width={44}
                  height={44}
                  className="rounded-full"
                />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2E6D] leading-tight">
                About Vidmahi Educational Foundation
              </h2>
            </div>

            {aboutContent.paragraphs.map((p, i) => (
              <p key={i} className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">
                {p}
              </p>
            ))}

            <p className="text-gray-700 font-medium mb-2 text-sm">
              We provide free coaching and support for:
            </p>
            <ul className="mb-5 space-y-1">
              {aboutContent.programs.map((prog, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="text-[#5A8F2D] mt-1">•</span>
                  {prog}
                </li>
              ))}
            </ul>

            {aboutContent.additionalParagraphs.map((p, i) => (
              <p key={i} className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">
                {p}
              </p>
            ))}

            <blockquote className="border-l-4 border-[#F2B233] pl-4 italic text-[#0A2E6D] text-sm sm:text-base mt-4">
              &ldquo;{aboutContent.closingMessage}&rdquo;
            </blockquote>

            <button className="mt-6 border border-[#0A2E6D] text-[#0A2E6D] px-5 py-2 rounded hover:bg-[#0A2E6D] hover:text-white transition-colors text-sm inline-flex items-center gap-2">
              Read More About Us →
            </button>
          </div>

          {/* Image */}
          <div className="relative rounded-xl overflow-hidden shadow-lg h-80 md:h-full min-h-64 bg-gray-50">
            <Image
              src={aboutContent.image}
              alt="Students and teacher"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-gray-200 bg-[#F8FAFC] p-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="uppercase tracking-widest text-xs text-[#5A8F2D] font-semibold mb-3">
              VOLUNTEER LEADERSHIP
            </p>
            <h3 className="text-3xl font-bold text-[#0A2E6D] mb-4">
              Meet the Volunteers
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Vidmahi Educational Foundation is built on public funding and community support. Volunteers help us extend our reach, guide students, and manage the foundation's programs with transparency and care.
            </p>
          </div>

          <div className="grid gap-8 justify-center">
            <div className="flex flex-col items-center gap-6 max-w-sm mx-auto">
              <div className="relative rounded-full overflow-hidden w-72 h-72 bg-white shadow-sm mx-auto">
                <Image
                  src="/hero/singari-sri-varun.png"
                  alt="Singari Sri Varun, Founder and Manager"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm text-center">
                <p className="text-xl font-semibold text-[#0A2E6D]">Singari Sri Varun</p>
                <p className="text-sm text-gray-500">Founder · Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
