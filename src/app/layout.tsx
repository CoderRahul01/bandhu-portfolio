import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "llprofileshotsll | Priyanshu Bandhu | Professional Photography",
  description: "Explore the professional photography portfolio of Priyanshu Bandhu. Specializing in honest portraits, candid wedding moments, and authentic street photography in India.",
  keywords: ["photography", "portrait photography", "wedding photography", "street photography", "India photographer", "llprofileshotsll", "Priyanshu Bandhu"],
  authors: [{ name: "Priyanshu Bandhu" }],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "llprofileshotsll | Priyanshu Bandhu",
    description: "Honest portraits and candid moments captured through light and authenticity.",
    url: "https://llprofileshotsll.com",
    siteName: "llprofileshotsll",
    images: [
      {
        url: "https://res.cloudinary.com/dcm3t1tyj/image/upload/v1767628455/bandhu-portfolio/ABOUT/priyanshu-bandhu.jpg",
        width: 1200,
        height: 630,
        alt: "llprofileshotsll - Priyanshu Bandhu Photography",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "llprofileshotsll | Priyanshu Bandhu",
    description: "Honest portraits and candid moments captured through light and authenticity.",
    images: ["https://res.cloudinary.com/dcm3t1tyj/image/upload/v1767628455/bandhu-portfolio/ABOUT/priyanshu-bandhu.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "llprofileshotsll",
  "image": "https://res.cloudinary.com/dcm3t1tyj/image/upload/v1767628455/bandhu-portfolio/ABOUT/priyanshu-bandhu.jpg",
  "@id": "https://llprofileshotsll.com",
  "url": "https://llprofileshotsll.com",
  "telephone": "+91 82075-97203",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "India",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://www.instagram.com/_profileshots_/"
  ],
  "founder": {
    "@type": "Person",
    "name": "Priyanshu Bandhu"
  },
  "description": "Professional photography service specializing in portraits, weddings, and street photography.",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  }
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased selection:bg-white selection:text-black font-sans`}
      >
        <Navbar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
