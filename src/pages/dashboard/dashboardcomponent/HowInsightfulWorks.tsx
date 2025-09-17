// src/components/HowInsightfulWorks.tsx

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { useAuth } from "@/authContext/useAuth";

const HowInsightfulWorks = () => {
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [circleDot, setCircleDot] = useState(1);

  // get context values
    const { setShowLoginup } = useAuth();


  const slides = [
    "Search with any Brand name and get analytics and Optimization",
    "Get instant insights & AI-powered suggestions",
    "Track ranking across LLMs and improve visibility",
  ];

  return (
    <div className=" relative w-full bg-[#311267] z-10 py-16 px-6 text-white text-center  gap-6">
      {/* Tag */}
      <div className="inline-block rounded-full bg-[#FFFFFF] px-4 py-1 text-sm text-[#7C3BED] mb-8">
        ✨ How it works
      </div>

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-15">
        From Sign-up to Insights in Minutes
      </h2>

      {/* Steps */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-20">
        <div className="flex-1">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full  border-1 border-[#7C3BED] ${circleDot === 1 ? "bg-[#7C3BED]" : ""}  mb-3`} onClick={() => { setCircleDot(1) }} >
              1
            </div>
            <hr className={`border-t-1 ${circleDot === 1 ? "border-white" : "border-black"}  w-full max-w-[200px] mb-3`} />
            <h3 className="font-semibold">Create your free profile</h3>
            <p className="text-sm text-gray-300 mt-2">
              Start instantly with a secure login.
            </p>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full border-1 border-[#7C3BED] ${circleDot === 2 ? "bg-[#7C3BED]" : ""}  mb-3`} onClick={() => { setCircleDot(2) }}>
              2
            </div>
            <hr className={`border-t-1 ${circleDot === 2 ? "border-white" : "border-black"} w-full max-w-[200px] mb-3`} />
            <h3 className="font-semibold">Run your first analysis</h3>
            <p className="text-sm text-gray-300 mt-2">
              Check rankings, mentions, and visibility across AI engines.
            </p>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full border-1 border-[#7C3BED] ${circleDot === 3 ? "bg-[#7C3BED]" : ""} mb-3`} onClick={() => { setCircleDot(3) }}>
              3
            </div>
            <hr className={`border-t-1 ${circleDot === 3 ? "border-white" : "border-black"} w-full max-w-[200px] mb-3`} />
            <h3 className="font-semibold">See instant insights</h3>
            <p className="text-sm text-gray-300 mt-2">
              Understand what AI says about your brand, with actionable suggestions.
            </p>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full border-1 border-[#7C3BED] ${circleDot === 4 ? "bg-[#7C3BED]" : ""} mb-3`} onClick={() => { setCircleDot(4) }}>
              4
            </div>
            <hr className={`border-t-1 ${circleDot === 3 ? "border-white" : "border-black"} w-full max-w-[200px] mb-3`} />
            <h3 className="font-semibold">Upgrade anytime</h3>
            <p className="text-sm text-gray-300 mt-2">
              Unlock competitor benchmarking and advanced analytics.
            </p>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="relative max-w-[638px] mx-auto mb-10">
        <div className="bg-[#1f0a45] rounded-xl py-10 px-6 lg:text-[36px] text-lg font-semibold shadow-lg border-[1px] border-[#282D45]">
          {slides[step]}
        </div>

        {/* Arrows */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full lg:left-[-30%] lg:top-[100%]"
          onClick={() => setStep((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        >
          <ChevronLeft size={40} />
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full lg:right-[-30%] lg:top-[100%]"
          onClick={() => setStep((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
        >
          <ChevronRight size={40} />
        </button>
      </div>

      {/* Search Box */}
      <div className="max-w-[738px] mx-auto relative">
        <div className="bg-[#2A2A2A] rounded-lg flex items-end p-2 shadow-md relative h-[117px] w-full  mx-auto border-[#7C7C7C] border-[0.5px]">
          <input
            type="text"
            className="flex-1 bg-transparent text-sm md:text-base outline-none px-3 pt-6 pb-2"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {/* Arrow button aligned at bottom-right */}
          <button className="absolute right-2 bottom-2 bg-white text-[#311267] w-10 h-10 flex items-center justify-center rounded-full">
            <IoIosArrowForward />
          </button>

          {/* Multi-line placeholder / example text */}
          <p
            className={`${inputValue ? "hidden" : ""
              } absolute top-2 left-3 pointer-events-none`}
          >
            <span className="text-[#BFBFBF] font-bold text-base md:text-sm">
              Search by Brand Name or give a product description
            </span>
            <br />
            <span className="text-[#7C7C7C] text-sm">
              For Example: Best Running shoes for men
            </span>
          </p>
        </div>
      </div>
      <button
        className="mt-15 mx-auto flex items-center justify-center bg-[#7b3aed] px-6 py-3 sm:w-[220px] w-full rounded-lg font-semibold text-white hover:bg-[#692ed3] transition"
        onClick={() => setShowLoginup(true)}
      >
        <span className="mr-2">Start Free Trial</span>
        <FaArrowRight />
      </button>

    </div>
  );
};

export default HowInsightfulWorks;
