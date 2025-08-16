"use client";

import { useEffect, useState } from "react";
import StatusCard from "../components/StatusCard";
import { RefreshCw, Github } from "lucide-react";

export default function Home() {
  const [statusList, setStatusList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchStatus = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/status");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setStatusList(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || "Failed to load status data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
  
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg,
              rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 20px),
            repeating-linear-gradient(90deg,
              rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 20px)
          `,
        }}
      ></div>

      <main className="relative z-10 flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-md mx-auto">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-mono">
             Domain Status API
            </h1>
            <p className="text-orange-600 dark:text-cyan-600 mb-4">
             status.JesseJesse.xyz
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchStatus}
                disabled={isLoading}
                className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
              >
                <RefreshCw size={16} className={`${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </button>
              {lastUpdated && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {isLoading && statusList.length === 0 ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-16 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : error ? (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-center">
                {error}{" "}
                <button
                  onClick={fetchStatus}
                  className="underline hover:text-red-700 dark:hover:text-red-300 transition-colors"
                >
                  Retry
                </button>
                
                
              </div>
            ) : statusList.length === 0 ? (
              <div className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-center">
                No services to display
              </div>
            ) : (
              statusList.map((domain) => <StatusCard key={domain.name} {...domain} />)
            )}
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-4 border-t border-black dark:border-green-800 shadow-sm transition-colors duration-200 overflow-hidden text-center text-black dark:text-gray-300 hover:text-cyan-800 dark:hover:text-green-500 flex flex-col items-center gap-2">
        <a
          href="https://github.com/sudo-self/domain-status-api"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-cyan-800 dark:hover:text-green-500 transition-colors"
        >
          <Github size={20} />
          <span className="text-sm text-bold">Source on Github</span>
        </a>
      </footer>
    </div>
  );
}

