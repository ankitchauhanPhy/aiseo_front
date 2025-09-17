// import { Mic, ChevronRight, CircleX } from "lucide-react";
// import { useEffect, useState } from "react";
// import MainLogo from "../../../assets/dashboard/MainLogoDashboard.svg";
// import SignUpPopup from "@/component/SignUp";
// import LoginPopup from "@/component/Login";

// import { useAuth } from "@/authContext/useAuth";
// import { useNavigate } from "react-router-dom";

// export default function HeroSection() {
//   const [inputValue, setInputValue] = useState("");
//   const [loginDashboard, setLoginDashboard] = useState<boolean>();
//   const [loading, setLoading] = useState<boolean>(false);

//   // get context values
//   const { showSignup, showLoginup, setShowLoginup, loginType, setLoginType, setFirstChatText } = useAuth();

//   const nav = useNavigate();

//   useEffect(() => {
//     const loginStatus = localStorage.getItem("login");
//     console.log("loginStatus Hero Dashboard", loginStatus);
//     if (loginStatus === "true") {
//       setLoginType(true);
//     }
//     else {
//       setLoginType(false);
//     }

//     if (loginType) {
//       setLoginDashboard(true);
//     }
//     else {
//       setLoginDashboard(false);
//     }
//   }, [loginType])


//   //Close the Input Box
//   function handleChatClose() {
//     if (loginDashboard) {
//       setLoginDashboard(false);
//     }
//   }


//   //Open the Input Box
//   function handleChatOpen() {
//     if (!loginDashboard) {
//       setLoginDashboard(true);
//     }
//   }


//   // Function to send API request
//   const handleSend = async () => {
//     setLoading(true);
//     if (!inputValue.trim()) {
//       alert("Please write something before sending!");
//       setLoading(false);
//       return;
//     }
//     if (inputValue && loginType) {
//       setFirstChatText(inputValue);
//       nav("/chathistory");
//       setInputValue("");
//       setLoading(false);
//     } else if (inputValue && !loginType) {
//       setFirstChatText(inputValue);
//       setShowLoginup(true);
//       setLoading(false);
//       setInputValue("");
//     }
//   };

//   return (
//     <>
//       <section className="relative w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-28">
//         {/* Gradient Background */}
//         <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-transparent to-[#fce7d4] z-0"></div>

//         {/* Dotted Texture */}
//         <div
//           className="absolute inset-0 z-0"
//           style={{
//             backgroundImage: `radial-gradient(currentColor 2px, transparent 1px)`,
//             backgroundSize: "25px 25px",
//             color: "rgba(0,0,0,0.08)",
//           }}
//         ></div>

//         {/* Image + Text in flow (responsive wrap) */}
//         <div className={`relative z-10 w-[80%] ${(loginDashboard && loginType) ? "lg:mt-[-3%] md:mt-[-1%]" : "lg:mt-[3%] md:mt-[10%]"}   sm:w-[75%] md:w-[90%]   mx-auto flex flex-col items-center text-center`}>
//           {/* Logo */}
//           <img
//             src={MainLogo}
//             alt="Hero illustration"
//             className="w-full h-auto  object-contain"
//           />

//           {/* Text below image */}
//           <div className="absolute lg:top-[10%]  md:top-[-10%]">
//             <h1 className="mt-8 font-poppins font-semibold text-[#311267]
//             text-2xl sm:text-3xl md:text-3xl lg:text-4xl 
//             leading-snug md:leading-[72px] tracking-tight">
//               The Future of SEO is AI Visibility
//             </h1>

//             <p className="mt-4 font-poppins font-normal text-[#1D1D1D]
//             text-sm sm:text-base md:text-lg lg:text-2xl
//             leading-relaxed tracking-tight">
//               Be discovered in the answers that matter. Track, analyze, and grow your brand presence across ChatGPT, Perplexity, Google Gemini, and more.
//             </p>
//             {(!loginDashboard && !loginType) && (
//               <div className="mt-6 flex lg:flex-row flex-col items-center justify-center gap-4">
//                 <button
//                   className="px-6 py-3 bg-[#311267] text-white rounded-xl shadow-lg hover:bg-purple-700 transition"
//                   onClick={handleChatOpen}
//                 >
//                   Start Free Trial → No Credit Card Required
//                 </button>
//                 <button className="px-6 py-3 border border-[#311267] text-[#311267] hover:text-white rounded-xl shadow-lg hover:bg-[#311267] transition">
//                   See How It Works
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Search Bar - shown only if logged in */}
//         {loginDashboard && (
//           <div className="relative z-10 w-[70%] max mt-10">
//             <label className="block bg-[#D9D9D9] rounded-4xl px-4 sm:px-6 py-4 sm:py-1 shadow-2xl">
//               {/* Top-right icon */}
//               {(loginDashboard && !loginType) && (
//                 // <CircleX className="absolute top-[-4%] right-[0%] w-6 h-6 text-gray-400 bg-white" onClick={handleChatClose} />
//                 <div
//                   onClick={handleChatClose}
//                   className="absolute top-[-4%] right-[0%] flex items-center justify-center
//              w-7 h-7 bg-white rounded-full shadow-md cursor-pointer w-7 h-7"
//                 >
//                   <CircleX className="w-full h-full text-gray-500" />
//                 </div>

//               )}
//               <textarea
//                 placeholder="Write anything..."
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 className="w-full min-h-[60px] sm:min-h-[80px] bg-transparent text-[#7C7C7C] 
//                   placeholder-gray-600 text-base sm:text-lg md:text-xl outline-none resize-none rounded-2xl p-2 sm:p-3"
//               />
//               <div className="flex items-end justify-end mt-2 mb-3">
//                 <div className="flex gap-5">
//                   <button className={`p-2 text-[#7C7C7C] rounded-full border border-[#7C7C7C]`}>
//                     <Mic className="w-6 h-6" />
//                   </button>
//                   <button className={`p-2 bg-white text-[#1E2749] rounded-full hover:bg-gray-100`}
//                     onClick={() => {handleSend()}}
//                     disabled={loading}
//                   >
//                     {/* <Send className="w-5 h-5" /> */}
//                     <ChevronRight className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
//             </label>
//           </div>
//         )}
//       </section>

//       {/* Signup Overlay */}
//       {showSignup && (
//         <div className="fixed inset-0 z-50">
//           <SignUpPopup />
//         </div>
//       )}

//       {/* Login Overlay */}
//       {
//         showLoginup && (
//           <div className="fixed inset-0 z-50">
//             <LoginPopup />
//           </div>
//         )
//       }
//     </>
//   );
// }






import { ChevronRight, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import MainLogo from "../../../assets/dashboard/MainLogoDashboard.svg";
// import MainLogo from "../../../assets/dashboard/icons-logo.gif";

import SignUpPopup from "@/component/SignUp";
import LoginPopup from "@/component/Login";

import { useAuth } from "@/authContext/useAuth";
import { useNavigate } from "react-router-dom";
import { HistoryAPI } from "@/api";
import { WelcomePopup } from "@/component/WelcomePopup";

export default function HeroSection() {
  const [inputValue, setInputValue] = useState("");
  const [loginDashboard, setLoginDashboard] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState(false);

  // get context values
  const {
    showSignup,
    showLoginup,
    setShowLoginup,
    loginType,
    setLoginType,
    setFirstChatText,
    setConversationData,
    conversationData
  } = useAuth();

  const nav = useNavigate();

  async function getAllHistory() {
    try {
      const response = await HistoryAPI.getAllhistory(1);
      console.log("API Response:", response);
      if (response.statusText) {
        setConversationData(response.data);
      }
    } catch (err: Error | unknown) {
      console.error("API Error:", err);
      const message = err instanceof Error ? err.message : "Something went wrong!";
      console.log("Error", message);
    }
  }

  useEffect(() => {
    const loginStatus = localStorage.getItem("login");
    if (loginStatus === "true") {
     
      setLoginType(true);
      setShowPopup(true);
      //nav("/index")
    } else {
      setLoginType(false);
    }
    setLoginDashboard(loginStatus === "true");
  }, [loginType, setLoginType]);

  function handleChatClose() {
    setLoginDashboard(false);
  }

  function handleChatOpen() {
    setLoginDashboard(true);
  }

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
    } else if (inputValue && !loginType) {
      setFirstChatText(inputValue);
      setShowLoginup(true);
    }

    setInputValue("");
    setLoading(false);
  };


  const [showPopup, setShowPopup] = useState(false);
   
    const handleGoToDashboard = () => {
      console.log('Redirecting to dashboard...');
      // setShowPopup(true);
      nav("/index");
    };
   
    const handleClose = () => {
      setShowPopup(false);
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

        {/* ===== Left Side "View History" Button ===== */}
        {(loginDashboard && loginType) && (
          <>
            {/* Button */}
            <button
              className="fixed top-1/2/2 -left-23 transform -translate-y-1/2 rotate-[-90deg]
      bg-white border border-gray-300 shadow-md px-15 py-2 rounded-lg text-md font-medium
      hover:bg-gray-100 transition z-50"
              onClick={() => {setShowHistory(true); getAllHistory();}}
            >
              View History
            </button>

            {/* Sidebar */}
            <div
              className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 z-50 rounded-lg
      ${showHistory ? "translate-x-0" : "-translate-x-full"}`}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h2 className="font-semibold text-md">History</h2>
                <button onClick={() => setShowHistory(false)}>
                  <CircleX className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              {/* Scrollable Content */}
              <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-56px)]">
                {conversationData?.conversations && conversationData?.conversations.length > 0 ? (
                  <>
                    {conversationData.conversations.map((c) => (
                      <div
                        key={c.conversation_id}
                        className="p-3 bg-gray-100 rounded-md hover:bg-gray-300 cursor-pointer"
                        onClick={()=>{
                          nav("/optimization",{
                            state: {userId: 1, conversationId: c.conversation_id}
                          })
                        }}
                      >
                        {c.last_user_query}
                      </div>
                    ))}
                  </>
                ) : (
                  "No Data Found"
                )}
              </div>
            </div>
          </>
        )}


        {/* Content */}
        {(loginDashboard && loginType) ? (
          <div className="relative z-10 w-full max-w-6xl flex flex-col items-center text-center">
            {/* Image as container */}
            <div className="relative w-full flex items-center justify-center">
              <img
                src={MainLogo}
                alt="Hero illustration"
                className="w-full max-w-6xl h-auto object-contain mx-auto"
              />

              {/* Text overlay (centered inside image) */}
              <div className="absolute inset-0 flex flex-col items-center justify-start px-4">
                <h1
                  className="font-poppins font-semibold text-[#311267]
                text-lg sm:text-xl md:text-2xl lg:text-4xl 
                leading-snug tracking-tight max-w-1xl"
                >
                  The Future of SEO is AI Visibility
                </h1>

                <p
                  className="mt-3 font-poppins font-normal text-[#1D1D1D]
                text-sm sm:text-md md:text-lg lg:text-lg
                leading-relaxed tracking-tight md:max-w-lg sm:max-w-md max-w-sm"
                >
                  Be discovered in the answers that matter. Track, analyze, and grow
                  your brand presence across ChatGPT, Perplexity, Google Gemini, and
                  more.
                </p>

                {/* Buttons */}
                {/* {(!loginDashboard && !loginType) && (
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      className="px-6 py-3 bg-[#311267] text-white rounded-xl shadow-lg hover:bg-purple-700 transition"
                      onClick={handleChatOpen}
                    >
                      Start Free Trial → No Credit Card Required
                    </button>
                    <button className="px-6 py-3 border border-[#311267] text-[#311267] hover:text-white rounded-xl shadow-lg hover:bg-[#311267] transition">
                      See How It Works
                    </button>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        ) : (
          <div className="relative z-10 w-full max-w-10xl flex flex-col items-center text-center">
            {/* Image as container */}
            <div className="relative w-full flex items-center justify-center">
              <img
                src={MainLogo}
                alt="Hero illustration"
                className="w-full max-w-6xl h-auto object-contain mx-auto pt-25 sm:pt-20 md:pt-15 "
              />

              {/* Text overlay (centered inside image) */}
              <div className="absolute inset-0 flex flex-col items-center justify-start px-4">
                <h1
                  className="font-poppins font-semibold text-[#311267]
                text-lg sm:text-xl md:text-2xl lg:text-4xl 
                leading-snug tracking-tight max-w-1xl pt-25 sm:pt-20 md:pt-15  lg:pt-10"
                >
                  The Future of SEO is AI Visibility
                </h1>

                <p
                  className="mt-3 font-poppins font-normal text-[#1D1D1D]
                text-sm sm:text-md md:text-lg lg:text-lg
                leading-relaxed tracking-tight md:max-w-lg sm:max-w-md max-w-sm"
                >
                  Be discovered in the answers that matter. Track, analyze, and grow
                  your brand presence across ChatGPT, Perplexity, Google Gemini, and
                  more.
                </p>

                {/* Buttons */}
                {(!loginDashboard && !loginType) && (
                  <div className="mt-6 flex flex-col   items-center justify-center gap-4">
                    <button
                      className="px-6 py-3 bg-[#311267] text-white rounded-xl shadow-lg hover:bg-purple-700 transition"
                      onClick={handleChatOpen}
                    >
                      Start Free Trial → No Credit Card Required
                    </button>
                    <button className="px-6 py-3 border border-[#311267] text-[#311267] hover:text-white rounded-xl shadow-lg hover:bg-[#311267] transition">
                      See How It Works
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}


        {/* Search Bar */}
        {loginDashboard && (
          <div className="relative z-10 w-full max-w-2xl mt-10">
            <label className="block bg-[#D9D9D9] rounded-3xl px-4 sm:px-6 py-4 sm:py-5 shadow-2xl relative">
              {/* Close Button */}
              {loginDashboard && !loginType && (
                <button
                  onClick={handleChatClose}
                  className="absolute -top-3 -right-3 flex items-center justify-center
                  w-7 h-7 bg-white rounded-full shadow-md cursor-pointer"
                >
                  <CircleX className="w-5 h-5 text-gray-500" />
                </button>
              )}

              {/* Input */}
              <textarea
                placeholder="Write anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full min-h-[60px] sm:min-h-[80px] bg-transparent text-[#7C7C7C] 
                placeholder-gray-600 text-base sm:text-lg md:text-xl outline-none resize-none rounded-2xl p-2 sm:p-3"
              />

              {/* Buttons */}
              <div className="flex items-center justify-end mt-3">
                <div className="flex gap-3 sm:gap-5">
                  {/* <button className="p-2 text-[#7C7C7C] rounded-full border border-[#7C7C7C] hover:bg-gray-200">
                    <Mic className="w-6 h-6" />
                  </button> */}
                  <button
                    className="p-2 bg-white text-[#1E2749] rounded-full hover:bg-gray-100"
                    onClick={handleSend}
                    disabled={loading}
                  >
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
      {showLoginup && (
        <div className="fixed inset-0 z-50">
          <LoginPopup />
        </div>
      )}

      {/* after Login Popup */}
      {(loginType && showPopup) &&(
        <div className="fixed inset-0 z-50">
          <WelcomePopup 
          onGoToDashboard={handleGoToDashboard}
          onClose={handleClose}
           />
        </div>
      )}
    </>
  );
}

