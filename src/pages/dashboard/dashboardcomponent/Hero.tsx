import { ChevronRight, CircleX } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import SignUpPopup from "@/component/SignUp";
import LoginPopup from "@/component/Login";

import { useAuth } from "@/authContext/useAuth";
import { useNavigate } from "react-router-dom";
import { HistoryAPI } from "@/api";
import { WelcomePopup } from "@/component/freeTrialPopUp/WelcomePopup";
// import MainLogo from "../../../assets/dashboard/MainLogoDashboard.svg";
import MainLogo from "../../../assets/dashboard/MainDashboardLogo.svg";
import { toast } from "react-toastify";
import Loader from "@/component/loader/Loader";
import NoDataFound from "@/component/noDataFound/NoDataFound";


export default function HeroSection() {
  const [inputValue, setInputValue] = useState("");
  const [loginDashboard, setLoginDashboard] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState(false);

  // Pagination states
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // get context values
  const {
    showSignup,
    showLoginup,
    setShowLoginup,
    loginType,
    setLoginType,
    setFirstChatText,
    setConversationData,
    conversationData,
    freeTrialPopup,
    setFreeTrialPopup,
    firstChatText,
    setComparisonView,
    setIsVisible,
    setIsComparison,
    user_id
  } = useAuth();

  const nav = useNavigate();
  console.log("user_id", user_id);

  // async function getAllHistory(user_id: number) {
  //   if (!user_id) {
  //     toast.warning("UserId not have");
  //     return;
  //   }
  //   setLoading(true);
  //   try {
  //     const response = await HistoryAPI.getAllhistory(user_id, 1, 10);
  //     console.log("API Response:", response);
  //     if (response.statusText) {
  //       setConversationData(response.data);
  //       setLoading(false);
  //     }
  //   } catch (err: any) {
  //     setLoading(false);
  //     if (err.response) {
  //       toast.error(err.response.data.detail);
  //     } else {
  //       toast.error(err.message);
  //     }
  //     console.error("API Error:", err);
  //     const message = err instanceof Error ? err.message : "Something went wrong!";
  //     console.log("Error", message);
  //   }
  // }

  // ============ API Call ============
  const getAllHistory = useCallback(
    async (userId: number, pageNumber: number) => {
      if (!userId) {
        toast.warning("User ID not found");
        return;
      }

      setLoading(true);
      try {
        const response = await HistoryAPI.getAllhistory(userId, pageNumber, 10);
        if (response.statusText) {
          const newData = response.data?.conversations || [];

          if (pageNumber === 1) {
            setConversationData({ user_id: userId, conversations: newData });
          } else {
            setConversationData((prev) => {
              if (!prev) return { user_id: userId, conversations: newData };
              return {
                user_id: prev.user_id,
                conversations: [...prev.conversations, ...newData],
              };
            });
          }

          // If less than limit, no more data
          if (newData.length < 10) {
            setHasMore(false);
          }
        }
      } catch (err: any) {
        if (err.response) {
          setHasMore(false);
          toast.error(err.response.data.detail);
        } else {
          toast.error(err.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [setConversationData]
  );

  // Open history sidebar
  const handleOpenHistory = () => {
    setShowHistory(true);
    setPage(1);
    setHasMore(true);
    getAllHistory(user_id, 1);
  };

  useEffect(() => {
    const loginStatus = localStorage.getItem("login");
    if (loginStatus === "true") {
      setIsVisible(false);
      setIsComparison(false);
      setComparisonView(false);
      setLoginType(true);
      setFreeTrialPopup(false);
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
    if (!inputValue.trim()) {
      toast.warning("Please write something before sending!");
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

  };

  const handleGoToDashboard = () => {
    console.log('Redirecting to dashboard...');
    setLoginType(true);
    if (!firstChatText) {
      nav('/chathistory');
    } else if (firstChatText) {
      nav("/chathistory");
    }
  };

  useEffect(() => {
  if (showSignup || showLoginup || freeTrialPopup) {
    document.body.style.overflow = "hidden"; // disable background scroll
  } else {
    document.body.style.overflow = ""; // re-enable scroll
  }
}, [showSignup, showLoginup, freeTrialPopup]);


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

        {/* ===== Left Side "View History" Button & Sidebar ===== */}
        {loginDashboard && loginType && (
          <>
            <button
              className="fixed top-1/2 -left-22 transform -translate-y-1/2 rotate-[-90deg]
                         bg-white border border-gray-300 shadow-md px-15 py-2 rounded-lg text-md font-medium
                         hover:bg-gray-100 transition z-50"
              onClick={handleOpenHistory}
            >
              View History
            </button>

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
                {conversationData && conversationData?.conversations?.length > 0 ? (
                  <>
                    {conversationData.conversations.map((c: any) => (
                      <div
                        key={c.conversation_id}
                        className="p-3 bg-gray-100 rounded-md hover:bg-gray-300 cursor-pointer"
                        onClick={() =>
                          nav("/optimization", {
                            state: { userId: user_id, conversationId: c.conversation_id, pageNumberChat: page },
                          })
                        }
                      >
                        {c.last_user_query}
                      </div>
                    ))}

                    {/* ===== View More Button ===== */}
                    {console.log("hasMore", hasMore)}
                    {hasMore && (
                      <div className="flex justify-center mt-2">
                        <button
                          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition w-full"
                          onClick={() => {
                            const nextPage = page + 1;
                            setPage(nextPage);
                            getAllHistory(user_id, nextPage);
                          }}
                          disabled={loading}
                        >
                          {loading ? "Loading..." : "View More"}
                        </button>
                      </div>
                    )}

                    {!hasMore && (
                      <p className="text-center text-gray-500 text-sm mt-2">No more data</p>
                    )}
                  </>
                ) : loading ? (
                  <Loader />
                ) : (
                  <NoDataFound />
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
        <div className="popup-scroll fixed inset-0 z-50">
          <LoginPopup />
        </div>
      )}

      {/* after Login Popup */}
      {(freeTrialPopup) && (
        <div className="fixed inset-0 z-50">
          <WelcomePopup
            onGoToDashboard={handleGoToDashboard}
          // onClose={handleClose}
          />
        </div>
      )}


    </>
  );
}

