import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AnimatePresence } from "framer-motion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PUNITH KUMAR REDDY | Mechanical Engineer | CAD Design Specialist",
    template: "%s | PUNITH Portfolio"
  },
  description: "Mechanical Engineer specializing in CAD design, 3D modeling with SolidWorks, AutoCAD, CATIA. Portfolio of engineering projects and web tools.",
  authors: [{ name: "PUNITH KUMAR REDDY", url: "https://github.com/puni7777777" }],
  creator: "PUNITH KUMAR REDDY",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.com",
    siteName: "PUNITH Portfolio",
    title: "PUNITH KUMAR REDDY | Mechanical Engineer | CAD Specialist",
    description: "Expert CAD designer and Mechanical Engineer. SolidWorks, AutoCAD, CATIA, NX UG. Precision engineering portfolio.",
    images: [
      {
        url: "/og-image.jpg", // Add to public/
        width: 1200,
        height: 630,
        alt: "PUNITH CAD Portfolio"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PUNITH KUMAR REDDY | Mechanical Engineer",
    description: "CAD Design | 3D Modeling | Engineering Portfolio",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white overflow-x-hidden`}
        // style={{
        //   backgroundImage: `
        //       radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
        //       radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
        //       radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
        //     `,
        // }}
      >
        <Header />
        <AnimatePresence mode="wait">
          <main className="min-h-screen">{children}</main>
        </AnimatePresence>
        <Footer />
      </body>
    </html>
  );
}
