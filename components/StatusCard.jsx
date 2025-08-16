"use client";

export default function StatusCard({ name, status, className = "" }) {
  const isOnline = status === "online";

  const statusColors = {
    online: { bg: "bg-green-500", text: "text-cyan-600" },
    offline: { bg: "bg-red-500", text: "text-red-500" },
  };
  const { bg, text } = isOnline ? statusColors.online : statusColors.offline;

  const faviconMap = {
    "JesseJesse.com": "/favicon1.png",
    "JJroper.web.app": "/favicon2.png",
    "sudo-self.com": "/favicon3.png",
  };
  const faviconUrl = faviconMap[name] || "/logo.png";

  const history = Array(30).fill(1);

  const urlMap = {
    "JesseJesse.com": "https://jessejesse.com",
    "JJroper.web.app": "https://jjroper.web.app",
    "sudo-self.com": "https://sudo-self.com",
  };
  const targetUrl = urlMap[name] || "#";


  const thumbnailMap = {
    "JesseJesse.com": "/site1.png",
    "JJroper.web.app": "/site2.png",
    "sudo-self.com": "/site3.png",
  };
  const thumbnailUrl = thumbnailMap[name] || "/logo.png";

  return (
    <div
      className={`
        flex flex-col gap-4 p-4 rounded-xl
        bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white
        border border-black dark:border-gray-300
        shadow-lg hover:shadow-2xl
        transform hover:-translate-y-1 transition-all duration-300
        ${className}
      `}
    >

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0 w-12 h-12">
            <span className={`absolute inset-0 rounded-full ${bg} opacity-50 animate-ping`} />
            <img
              src={faviconUrl}
              alt={`${name} favicon`}
              className="relative w-12 h-12 rounded-full object-cover shadow-md"
            />
          </div>

          <div className="flex flex-col justify-center gap-1">
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold font-mono hover:underline"
            >
              {name}
            </a>
            <p className={`text-sm font-mono capitalize ${text}`}>{status}</p>
          </div>
        </div>

 
        <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden border border-gray-300 shadow-md">
          <img
            src={thumbnailUrl}
            alt={`${name} thumbnail`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    
      <div className="flex gap-1 mt-2 h-10">
        {history.map((dayStatus, idx) => (
          <div
            key={idx}
            className={`w-1.5 transform rotate-12 origin-bottom ${
              dayStatus ? "bg-emerald-700" : "bg-red-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

