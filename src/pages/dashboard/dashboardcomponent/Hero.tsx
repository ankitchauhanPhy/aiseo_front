import { Mic, ChevronRight, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import MainLogo from "../../../assets/dashboard/MainLogoDashboard.svg";
import SignUpPopup from "@/component/SignUp";
import LoginPopup from "@/component/Login";

import { useAuth } from "@/authContext/useAuth";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [inputValue, setInputValue] = useState("");
  const [loginDashboard, setLoginDashboard] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);

  // get context values
  const { showSignup, showLoginup, setShowLoginup, loginType, setLoginType, setFirstChatText } = useAuth();

  const nav = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem("login");
    console.log("loginStatus Hero Dashboard", loginStatus);
    if (loginStatus === "true") {
      setLoginType(true);
    }
    else {
      setLoginType(false);
    }

    if (loginType) {
      setLoginDashboard(true);
    }
    else {
      setLoginDashboard(false);
    }
  }, [loginType])


  //Close the Input Box
  function handleChatClose() {
    if (loginDashboard) {
      setLoginDashboard(false);
    }
  }


  //Open the Input Box
  function handleChatOpen() {
    if (!loginDashboard) {
      setLoginDashboard(true);
    }
  }


  // Function to send API request
  const handleSend = async () => {
    setLoading(true);
    if (!inputValue.trim()) {
      alert("Please write something before sending!");
      setLoading(false);
      return;
    }
    if (inputValue && loginType) {
      setFirstChatText(inputValue);
      nav("/chathistory");
      setInputValue("");
      setLoading(false);
    } else if (inputValue && !loginType) {
      setFirstChatText(inputValue);
      setShowLoginup(true);
      setLoading(false);
      setInputValue("");
    }
  };

  return (
    <>
      <section className="relative w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-28">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-transparent to-[#fce7d4] z-0"></div>

        {/* Dotted Texture */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `radial-gradient(currentColor 2px, transparent 1px)`,
            backgroundSize: "25px 25px",
            color: "rgba(0,0,0,0.08)",
          }}
        ></div>

        {/* Image + Text in flow (responsive wrap) */}
        <div className={`relative z-10 w-[80%] ${(loginDashboard && loginType) ? "lg:mt-[-3%] md:mt-[-1%]" : "lg:mt-[3%] md:mt-[10%]"}   sm:w-[75%] md:w-[90%]  max-w-5xl mx-auto flex flex-col items-center text-center`}>
          {/* Logo */}
          <img
            src={MainLogo}
            alt="Hero illustration"
            className="w-full h-auto  object-contain"
          />

          {/* Text below image */}
          <div className="absolute lg:top-[10%]  md:top-[-15%]">
            <h1 className="mt-8 font-poppins font-semibold text-[#311267]
            text-2xl sm:text-3xl md:text-5xl lg:text-6xl 
            leading-snug md:leading-[72px] tracking-tight">
              Rank yourself on
            </h1>

            <p className="mt-4 font-poppins font-normal text-[#1D1D1D]
            text-sm sm:text-base md:text-lg lg:text-2xl
            leading-relaxed tracking-tight">
              Various LLM and increase your business
            </p>
            {(!loginDashboard && !loginType) && (
              <div className="mt-6 flex lg:flex-row flex-col items-center justify-center gap-4">
                <button
                  className="px-6 py-3 bg-[#311267] text-white rounded-xl shadow-lg hover:bg-purple-700 transition"
                  onClick={handleChatOpen}
                >
                  Try for Free →
                </button>
                <button className="px-6 py-3 border border-[#311267] text-[#311267] hover:text-white rounded-xl shadow-lg hover:bg-[#311267] transition">
                  See How It Works
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar - shown only if logged in */}
        {loginDashboard && (
          <div className="relative z-10 w-[70%] max mt-10">
            <label className="block bg-[#D9D9D9] rounded-4xl px-4 sm:px-6 py-4 sm:py-1 shadow-2xl">
              {/* Top-right icon */}
              {(loginDashboard && !loginType) && (
                // <CircleX className="absolute top-[-4%] right-[0%] w-6 h-6 text-gray-400 bg-white" onClick={handleChatClose} />
                <div
                  onClick={handleChatClose}
                  className="absolute top-[-4%] right-[0%] flex items-center justify-center
             w-7 h-7 bg-white rounded-full shadow-md cursor-pointer w-7 h-7"
                >
                  <CircleX className="w-full h-full text-gray-500" />
                </div>

              )}
              <textarea
                placeholder="Write anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full min-h-[60px] sm:min-h-[80px] bg-transparent text-[#7C7C7C] 
                  placeholder-gray-600 text-base sm:text-lg md:text-xl outline-none resize-none rounded-2xl p-2 sm:p-3"
              />
              <div className="flex items-end justify-end mt-2 mb-3">
                <div className="flex gap-5">
                  <button className={`p-2 text-[#7C7C7C] rounded-full border border-[#7C7C7C]`}>
                    <Mic className="w-6 h-6" />
                  </button>
                  <button className={`p-2 bg-white text-[#1E2749] rounded-full hover:bg-gray-100`}
                    onClick={() => {handleSend()}}
                    disabled={loading}
                  >
                    {/* <Send className="w-5 h-5" /> */}
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </label>
          </div>
        )}
      </section>

      {/* Signup Overlay */}
      {showSignup && (
        <div className="fixed inset-0 z-50">
          <SignUpPopup />
        </div>
      )}

      {/* Login Overlay */}
      {
        showLoginup && (
          <div className="fixed inset-0 z-50">
            <LoginPopup />
          </div>
        )
      }
    </>
  );
}
