
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/Navbar";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "status",
  description: "domain uptime monitor",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "icon", url: "/favicon.ico", sizes: "16x16 32x32", type: "image/x-icon" },
      { rel: "icon", url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { rel: "icon", url: "/icon-192-maskable.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { rel: "icon", url: "/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors bg-gray-100 dark:bg-gray-900 text-black dark:text-white`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
