import React, { useEffect, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { useAuth } from "@/authContext/useAuth";


import MainHistoryVisibilityLogo1 from "../assets/mainHistory/MainHistoryVisibilityLogo1.svg";
import MainHistoryVisibilityLogo2 from "../assets/mainHistory/MainHistoryVisibilityLogo2.svg"
import MainHistoryVisibilityLogo4 from "../assets/mainHistory/MainHistoryVisibilityLogo4.svg"

interface VisibilityDetailsProps {
  title: string;
  icon?: React.ReactNode;
  count: number | undefined;
  citationsFound: number;
  citationUrls: string[];
  categoriesFound: number;
  categories: string[];
  monthlyChange?: string;
  onClose: () => void;
}

interface Examplevisibility {
  openVisibility: boolean;
  setOpenVisibility: React.Dispatch<React.SetStateAction<boolean>>
  visibilityData: string;
}

const VisibilityDetails: React.FC<VisibilityDetailsProps> = ({
  title,
  icon,
  count,
  citationsFound,
  citationUrls,
  categoriesFound,
  categories,
  monthlyChange = "+30% this month",
  onClose,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay - clicking it closes modal */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* dialog - stop click propagation so inner clicks don't close */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md p-4 bg-white rounded-xl shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            Competitor Visibility Details
          </h1>
          <div className="flex items-center text-green-600 text-sm">
            <div className="w-2 h-2 bg-green-600 rounded-full mr-2" />
            <span className="text-gray-600">{monthlyChange}</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>

          {/* Icon + Count + Chevron */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-black rounded-l-md flex items-center justify-center">
                <img src={`${icon}`} alt={title} className="w-10 h-10" />
              </div>
              <div className={`${title === "Gemini" ? "bg-[#F97316] " : title === "OpenAI" ? "bg-[#A855F7]" : "bg-[#3B82F6]"} rounded-r-md px-3 py-2 text-white font-semibold text-sm w-[200px]`}>
                {count}
              </div>
            </div>

            <button
              onClick={() => setIsExpanded((s) => !s)}
              aria-expanded={isExpanded}
              aria-controls="visibility-details"
              className="p-1"
            >
              {/* note the "transform" + rotate classes */}
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transform transition-transform ${isExpanded ? "rotate-180" : "rotate-0"
                  }`}
              />
            </button>
          </div>

          {/* Expandable content */}
          <div id="visibility-details" className={isExpanded ? "block" : "hidden"}>
            {/* Citations */}
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                {citationsFound} citations found
              </h3>
              <div className="space-y-2 text-sm">
                {citationUrls && citationUrls.map((url, i) => (
                  <a
                    key={i}
                    href={url}
                    className="text-blue-600 hover:text-blue-800 break-all block"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {url}
                  </a>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                {categoriesFound} categories found
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories && categories.map((c, i) => (
                  <span
                    key={i}
                    className="text-gray-600 text-xs font-medium px-2 py-1 bg-gray-100 rounded"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Example parent that opens the modal */
const ExampleVisibilityDetailsComparison: React.FC<Examplevisibility> = ({
  openVisibility,
  setOpenVisibility,
  visibilityData,
}) => {
  const {
    competitorProductVisible,
    productMatricesCompetitor,
  } = useAuth();

  console.log("productMetricesData Competitor", productMatricesCompetitor);

  let mockIcon;
  let count;
  if (visibilityData === "Perplexity") {
    mockIcon = MainHistoryVisibilityLogo1;
    count = productMatricesCompetitor[0]?.mentions_by_platform?.perplexity;
  } else if (visibilityData === "OpenAI") {
    mockIcon = MainHistoryVisibilityLogo2;
    count = productMatricesCompetitor[0]?.mentions_by_platform?.openai;
  } else if (visibilityData === "Gemini") {
    mockIcon = MainHistoryVisibilityLogo4;
    count = productMatricesCompetitor[0]?.mentions_by_platform?.gemini;
  }

  const platformKey = visibilityData.toLowerCase();
  const citationUrls = productMatricesCompetitor[0]?.citations?.[platformKey] ?? [];
console.log("202=======",productMatricesCompetitor,competitorProductVisible)
  // const citationUrls =
  //   (competitorProductVisible
  //     ? productMatricesCompetitor
  //     : productMatricesData)[0]?.citations?.[platformKey] ?? [];

  const sampleData = {
    title: visibilityData,
    icon: mockIcon,
    count: count,
    // citationsFound: productMatricesData[0]?.citations.visibilityData.length,
    citationsFound: citationUrls.length,
    citationUrls,
    categoriesFound:
         productMatricesCompetitor[0]?.categories?.length ,
    categories: productMatricesCompetitor[0]?.categories ?? [],
    monthlyChange: "+30% this month",
  };

  return (
    <>
      {openVisibility && (
        <VisibilityDetails
          {...sampleData}
          onClose={() => setOpenVisibility(false)}
        />
      )}
    </>
  );
};

export default ExampleVisibilityDetailsComparison;
