import { DONATION_FORM_URL } from "@/constants";

export default function SupportMission() {
  return (
    <section
      className="py-16"
      style={{
        background: "linear-gradient(135deg, #0A2E6D 0%, #0d3a8a 50%, #5A8F2D 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-yellow-400 uppercase tracking-widest text-xs font-semibold mb-3">
          SUPPORT OUR MISSION
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
          Your Support Makes a Difference
        </h2>

        <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-4 max-w-2xl mx-auto">
          Every child deserves an opportunity to learn, grow, and succeed.
        </p>
        <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-4 max-w-2xl mx-auto">
          Your contribution helps us provide educational guidance, learning resources, and opportunities to students in rural communities.
        </p>
        <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
          As we continue our journey from Bhuthkur Village towards reaching more villages in the future, every contribution makes a meaningful difference.
        </p>

        {/* Icons */}
        <div className="flex justify-center gap-8 mb-10">
          {[
            { icon: "📚", label: "Education Support" },
            { icon: "📖", label: "Learning Resources" },
            { icon: "🌟", label: "Better Opportunities" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="text-blue-200 text-xs">{item.label}</p>
            </div>
          ))}
        </div>

        <a
          href={DONATION_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#F2B233] hover:bg-[#e0a120] text-[#0A2E6D] px-8 py-3 rounded font-bold text-base transition-colors"
        >
          Donate Now
        </a>
      </div>
    </section>
  );
}
