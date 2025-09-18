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
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

      {/* Loading text with animated dots */}
      <p className="text-gray-700 font-medium text-lg">
        Loading{dots}
      </p>
    </div>
  );
};

export default Loader;
