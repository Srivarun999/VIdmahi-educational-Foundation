import Link from "next/link";
import Image from "next/image";
import { DONATION_FORM_URL } from "@/constants";
import { contactInfo } from "@/data/contact";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0A2E6D" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Name */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/logo/vidmahi-logo.png"
                alt="Vidmahi Logo"
                width={56}
                height={56}
                className="object-contain"
              />
              <div>
                <div className="font-bold text-base">VIDMAHI</div>
                <div className="text-xs text-green-300">EDUCATIONAL FOUNDATION</div>
                <div className="text-[10px] text-yellow-300 italic">Igniting minds, illuminating futures.</div>
              </div>
            </div>
            <p className="text-blue-200 text-sm italic">
              — • Grāmotthānāya Vidyādānam • —
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-base mb-4">Quick Links</h3>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/#about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/#programs" className="hover:text-white transition-colors">Our Program</Link></li>
              <li><Link href="/#reports" className="hover:text-white transition-colors">Annual Reports</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
              <li>
                <a href={DONATION_FORM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Donate
                </a>
              </li>
              <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact details */}
          <div>
            <h3 className="font-semibold text-base mb-4">Contact Us</h3>
            <div className="space-y-3 text-blue-200 text-sm">
              <p>
                <span className="font-semibold">Email:</span> <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">{contactInfo.email}</a>
              </p>
              <p>
                <span className="font-semibold">Phone:</span> <a href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`} className="hover:text-white transition-colors">{contactInfo.phone}</a>
              </p>
              <p>
                <span className="font-semibold">Address:</span> {contactInfo.address}
              </p>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold text-base mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {contactInfo.x && (
                  <a href={contactInfo.x} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-blue-400 flex items-center justify-center hover:bg-black transition-colors text-sm font-bold">
                    X
                  </a>
                )}
                {contactInfo.linkedin && (
                  <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-blue-400 flex items-center justify-center hover:bg-sky-600 transition-colors text-sm font-bold">
                    in
                  </a>
                )}
                {contactInfo.instagram && (
                  <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-blue-400 flex items-center justify-center hover:bg-pink-600 transition-colors text-sm">
                    IG
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-blue-300 text-xs gap-2">
          <p>© 2025 Vidmahi Educational Foundation. All Rights Reserved.</p>
          <p>Designed with ❤️ for a better tomorrow.</p>
        </div>
      </div>
    </footer>
  );
}
