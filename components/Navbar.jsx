"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme ? savedTheme === "dark" : prefersDark;
    setIsDark(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme);
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  if (!isMounted) {
    return (
      <nav className="relative flex items-center justify-between p-4 bg-gray-200 dark:bg-gray-800 shadow-sm overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 20px),
              repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 20px)
            `,
          }}
        />
        <span className="text-lg font-semibold text-transparent bg-gray-300 dark:bg-gray-700 rounded animate-pulse">
          Loading...
        </span>
      </nav>
    );
  }

  return (
    <nav className="relative flex items-center justify-between p-4 bg-gray-300 dark:bg-gray-900 border-b border-black dark:border-green-800 shadow-sm transition-colors duration-200 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 20px),
            repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 20px)
          `,
        }}
      />
      <Link href="https://domain-staatus-api.pages.dev" className="relative z-10 flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <h1 className="text-xl font-semibold text-gray-900 dark:text-cyan-500 tracking-tight">
          domain-status-api
        </h1>
      </Link>

      <button
        onClick={toggleDarkMode}
        className="relative z-10 flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        {isDark ? (
          <Sun
            size={20}
            className="text-cyan-400 hover:text-cyan-500 transition-colors"
            aria-hidden="true"
          />
        ) : (
          <Moon
            size={20}
            className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
            aria-hidden="true"
          />
        )}
      </button>
    </nav>
  );
}
