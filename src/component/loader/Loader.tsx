import React, { useEffect, useState } from "react";

const Loader: React.FC = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? "." : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-0"></div>
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin z-10"></div>

      {/* Loading text with animated dots */}
      <p className="text-gray-700 font-medium text-lg z-10">
        Loading{dots}
      </p>
    </div>
  );
};

export default Loader;
