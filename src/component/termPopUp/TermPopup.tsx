import React, { useState } from "react";
import TermsConditionsPage from "./TermAndCondition";
import PrivacyPolicyPage from "./PrivacyandPolicy";

interface PopupProps {
  onClose: () => void;
}

export default function TermPopup({ onClose }: PopupProps) {
  const [activeTab, setActiveTab] = useState<"terms" | "privacy">("terms");

  return (
    // <div className="fixed inset-0 bg-black/10  bg-opacity-50 flex items-center  justify-center z-50">
    <div className="flex flex-col items-center justify-center mt-[7%]">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
      <div className="bg-white w-full  max-w-3xl rounded-lg shadow-lg p-6 relative border border-gray-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
        >
          ✕
        </button>
        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab("terms")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === "terms"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Terms & Conditions
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === "privacy"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Privacy Policy
          </button>
        </div>

        {/* Content Area */}
        <div className="max-h-[70vh] overflow-y-auto border-t ">
          {activeTab === "terms" ? <TermsConditionsPage /> : <PrivacyPolicyPage />}
        </div>
      </div>
     </div>
  );
}
