import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MahiAIWidget from "@/components/ai/MahiAIWidget";

export const metadata: Metadata = {
  title: "Vidmahi Educational Foundation",
  description:
    "Igniting minds in our villages to illuminate the future of our world. Empowering rural students through free coaching and educational guidance.",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MahiAIWidget />
      </body>
    </html>
  );
}
