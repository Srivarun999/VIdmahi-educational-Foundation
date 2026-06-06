import { contactInfo } from "@/data/contact";

export default function ContactUs() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <p className="text-[#5A8F2D] uppercase tracking-widest text-xs font-semibold mb-2">
          CONTACT US
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2E6D] mb-4">
              We&apos;d Love to Hear From You
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              For any queries, suggestions or collaboration, feel free to reach out to us.
            </p>
          </div>

          {/* Right — contact details */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Address */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0A2E6D]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2E6D" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#0A2E6D] text-sm mb-1">Address</p>
                <p className="text-gray-600 text-sm leading-relaxed">{contactInfo.address}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0A2E6D]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2E6D" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#0A2E6D] text-sm mb-1">Email</p>
                <a href={`mailto:${contactInfo.email}`} className="text-gray-600 text-sm hover:text-[#5A8F2D]">
                  {contactInfo.email}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0A2E6D]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2E6D" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#0A2E6D] text-sm mb-1">Phone</p>
                <a href={`tel:${contactInfo.phone}`} className="text-gray-600 text-sm hover:text-[#5A8F2D]">
                  {contactInfo.phone}
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-start gap-3">
              <div>
                <p className="font-semibold text-[#0A2E6D] text-sm mb-2">Follow Us</p>
                <div className="flex gap-2">
                  {contactInfo.facebook && (
                    <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#0A2E6D] text-white flex items-center justify-center text-xs font-bold hover:bg-blue-700 transition-colors">
                      f
                    </a>
                  )}
                  {contactInfo.instagram && (
                    <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs hover:bg-pink-600 transition-colors">
                      IG
                    </a>
                  )}
                  {contactInfo.youtube && (
                    <a href={contactInfo.youtube} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs hover:bg-red-700 transition-colors">
                      YT
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
