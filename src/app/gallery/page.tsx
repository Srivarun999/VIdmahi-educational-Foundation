import Image from "next/image";
import { programs } from "@/data/programs";
import { galleryImages } from "@/data/gallery";

export const metadata = {
  title: "Gallery | Vidmahi Educational Foundation",
  description: "Showcasing our journey and moments of impact.",
};

export default function GalleryPage() {
  return (
    <>
      {/* Hero Banner */}
      <div
        className="relative h-48 sm:h-64 flex items-center justify-center mt-16"
        style={{ background: "linear-gradient(135deg, #0A2E6D 0%, #5A8F2D 100%)" }}
      >
        <div className="text-center text-white">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Gallery</h1>
          <p className="text-blue-200 text-sm sm:text-base">Showcasing Our Journey</p>
        </div>
      </div>

      {/* Program sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {programs.map((program) => {
          const programImages = galleryImages.filter(
            (img) => img.programId === program.id
          );

          return (
            <section key={program.id} id={program.id} className="mb-16">
              {/* Program header */}
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2E6D] mb-1">
                  {program.title}
                </h2>
                <div className="flex items-center gap-1 text-[#5A8F2D] text-sm mb-3">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {program.location}
                </div>
                <p className="text-gray-600 text-sm max-w-2xl">{program.description}</p>
              </div>

              {/* Image grid */}
              {programImages.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {programImages.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-[#0A2E6D]/0 group-hover:bg-[#0A2E6D]/30 transition-colors flex items-end p-3">
                        <p className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                          {img.alt}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-10 text-center text-gray-400">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <p className="text-sm">
                    Add images to{" "}
                    <code className="bg-gray-100 px-1 rounded text-xs">
                      /public/gallery/{program.id}/
                    </code>{" "}
                    and update{" "}
                    <code className="bg-gray-100 px-1 rounded text-xs">src/data/gallery.ts</code>
                  </p>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
