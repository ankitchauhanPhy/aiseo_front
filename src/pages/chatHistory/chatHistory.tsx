import React, { useEffect, useState } from 'react';
import { History, ChevronRight, Loader2 } from 'lucide-react';
import { Step } from 'react-joyride';

import ChatHistoryLoading from "../../assets/chatHistory/ChatHistoryLoading.gif"
import { useAuth } from '@/authContext/useAuth';
// import { useNavigate } from 'react-router-dom';
import { ChatTextAPI, HistoryAPI } from '@/api';
// import ChatMessage from '@/component/ChatMessage';
import { useLocation, useNavigate } from 'react-router-dom';
import ChatMessage from '@/component/ChatMessage';
import { useOnboarding } from '@/context/OnboardingProvider';
import ExpandableInput from '@/component/ExpandableInput';

interface ChatItem {
  id: string;
  title: string;
  loading: boolean;
}
interface StepProcess {
  id: number;
  text: string;
  badge?: string;
  completed: boolean;
  active: boolean;
}
interface ApiConversation {
  role: "user" | "assistant";
  message: string;
}

const ChatHistory: React.FC = () => {

  // Joyride states
  const { startTour } = useOnboarding();
  // const [run, setRun] = useState(true);

  const steps: Step[] = [
    {
      target: ".nav-bar",
      content: "Use the navigation bar to move between Home, Dashboard, and Settings.",
    },
    {
      target: ".history-sidebar",
      content: "Here you'll find your previous searches and suggestions.",
    },
    {
      target: ".chat-area",
      content: "This is where AI shows you product rankings and insights.",
    },
    {
      target: ".input-box",
      content: "Type your question or product search here and press Enter.",
    },
  ];

  const [inputValue, setInputValue] = useState('');
  
  const [loading, setLoading] = useState<boolean>(false);
  const [checkProcessStep, setCheckProcessStep] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [chat, setChat] = useState<ChatItem[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");

  const { firstChatText, queryID, setQueryID, conversationData, setConversationData } = useAuth();

  const nav = useNavigate();
  const location = useLocation();
  const { userId, conversationId } = location.state || {};

  console.log("userId52", userId, "conversationId", conversationId);

  console.log("error", error);
  const [processSteps, setProcessSteps] = useState<StepProcess[]>([
    { id: 1, text: 'Creating Queries', badge: 'Query 1', completed: false, active: true },
    { id: 2, text: 'Analysing based on queries', badge: 'Processing', completed: false, active: false },
    { id: 3, text: 'Getting Products Info', badge: 'Gathering Information', completed: false, active: false },
    { id: 4, text: 'Comparing Products', badge: 'Using AI', completed: false, active: false },
    { id: 5, text: 'Creating Reports', badge: 'Generating Report', completed: false, active: false },
    { id: 6, text: 'Done', completed: false, active: false },
  ]);

  async function singleHistory(userId: number, conversationID: number) {
    try {
      const response = await HistoryAPI.getSinglehistory(userId, conversationID);
      console.log("API Response:", response);
      if (response.statusText) {
        if (response?.data.conversation && Array.isArray(response.data.conversation)) {

          // ✅ Remove last 3
          const withoutLastThree = response.data.conversation.slice(0, -3);

          // Transform API conversation → ChatItem[]
          const formattedChat: ChatItem[] = withoutLastThree.map((c: ApiConversation) => ({
            id: c.role,            // "user" | "assistant"
            title: c.message,      // message text
            loading: false         // always false here
          }));

          setChat(formattedChat);
        }
      }
    } catch (err: Error | unknown) {
      console.error("API Error:", err);
      const message = err instanceof Error ? err.message : "Something went wrong!";
      console.log("Error in Single history", message);
    } finally {
      setLoading(false);
    }
  }

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
    getAllHistory();
  }, [])

  useEffect(() => {
  if (!localStorage.getItem("chatHistoryTourDone")) {
    const timer = setTimeout(() => {
      startTour(steps);
      localStorage.setItem("chatHistoryTourDone", "true");
    }, 500);

    return () => clearTimeout(timer);
  }
}, []);


  const handleSelectHistory = (userId: number, conversationId: number) => {
    singleHistory(userId, conversationId);
    setSelectedConversationId(conversationId);
  };

  // Polling for query status when process step starts
  useEffect(() => {
    if (!checkProcessStep || !queryID) return;

    const interval = setInterval(async () => {
      try {
        const response = await ChatTextAPI.getQueryStatus(queryID); // 👈 new API call
        console.log("Status Poll Response:", response);

        if (response?.data.status) {
          const { sub_queries_generated, openai_response_generated, perplexity_response_generated,
            gemini_response_generated, individual_ranking_calculated, final_ranking_calculated } = response.data.status;

          // 🔹 Map API status to steps
          setProcessSteps([
            {
              id: 1,
              text: "Creating queries",
              badge: "Query 1",
              completed: sub_queries_generated,
              active: !sub_queries_generated,
            },
            {
              id: 2,
              text: "Analysing based on queries",
              badge: "Processing",
              completed: openai_response_generated,
              active: !openai_response_generated && sub_queries_generated,
            },
            {
              id: 3,
              text: "Getting Products Info",
              badge: "Gathering Information",
              completed: perplexity_response_generated,
              active: !perplexity_response_generated && openai_response_generated,
            },
            {
              id: 4,
              text: "Comparing Products",
              badge: "Using AI",
              completed: gemini_response_generated,
              active: !gemini_response_generated && perplexity_response_generated,
            },
            {
              id: 5,
              text: "Creating Reports",
              badge: "Generating Report",
              completed: individual_ranking_calculated,
              active: !individual_ranking_calculated && gemini_response_generated,
            },
            {
              id: 6,
              text: "Done",
              completed: final_ranking_calculated,
              active: !final_ranking_calculated && individual_ranking_calculated,
            },
          ]);

          // ✅ Stop polling when complete
          if (response.data.is_complete) {
            clearInterval(interval);
            setCheckProcessStep(false);
            nav("/optimization");
          }
        }
      } catch (err) {
        console.error("Polling error:", err);
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [queryID]);

  async function callChatTextAPI(userMessage: string) {
    setLoading(true);
    setError("");
    try {
      const response = await ChatTextAPI.sendCheckQuery(userMessage);
      console.log("API Response:", response);
      if (response.statusText) {
        setLoading(false);
        if (response.data.query_id) {
          setQueryID(response.data.query_id);
          setCheckProcessStep(true);
        }
        // Push AI response
        if (response.data.message) {
          // setChat(prev => [...prev, { id: "assistant", title: response.data.message }]);
          setChat(prev => prev.map(item =>
            item.id === "assistant" && item.loading
              ? { id: "assistant", title: response.data.message, loading: false } // replace placeholder
              : item
          ));
        }
      }
    } catch (err: Error | unknown) {
      setLoading(false);
      console.error("API Error:", err);
      const message = err instanceof Error ? err.message : "Something went wrong!";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  console.log("chat205 chatHistory", chat);

  async function callChatTextAPIPipeline(userMessage: string) {
    setLoading(true);
    setError("");
    try {
      const response = await ChatTextAPI.sendPipelineQuery(userMessage);
      console.log("API Response:", response);
      if (response.statusText) {
        setLoading(false);
        if (response.data.query_id) {
          setQueryID(response.data.query_id);
          setCheckProcessStep(true);
          setChat(prev => prev.map(item =>
            item.id === "assistant" && item.loading
              ? { id: "assiatant", title: response.data.message, loading: false } // replace placeholder
              : item
          ));
        }
        // Push AI response
        if (response.data.message) {
          //setChat(prev => [...prev, { id: "assistant", title: response.data.message }]);
        }
      }
    } catch (err: Error | unknown) {
      setLoading(false);
      // setCheckInputArea(false);
      console.error("API Error:", err);
      const message = err instanceof Error ? err.message : "Something went wrong!";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  // --------------------------
  // On First Render → add user input and call API
  // --------------------------
  useEffect(() => {
    if (firstChatText && chat.length === 0) {
      // Push initial user chat
      setChat(prev => [...prev, { id: "user", title: firstChatText, loading: false }]);
      // Push AI placeholder
      setChat(prev => [...prev, { id: "assistant", title: "", loading: true }]);
      callChatTextAPI(firstChatText);
    } else {
      // alert("Please Write something !");
      // nav("/");
      // setChat(chatdata);
    }
  }, [])

  // --------------------------
  // Handle User Send Message
  // -------------------------
  const handleSend = async () => {
    if (!inputValue.trim()) {
      alert("Write Something!");
      return;
    }

    // setCheckInputArea(true);
    const userMessage = inputValue.trim();

    // Push user message
    setChat(prev => [...prev, { id: "user", title: userMessage, loading: false }]);
    setInputValue("");
    // Push AI placeholder
    setChat(prev => [...prev, { id: "assistant", title: "", loading: true }]);
    //callChatTextAPI(userMessage);
    callChatTextAPIPipeline(userMessage);
  };

  console.log("chathistory", chat, "firstChatText", firstChatText)
  console.log("conversationData chathostoryPage", conversationData);
  console.log("loading chathistory", loading);

  return (
    <div className="flex bg-white pt-4 text-black md:flex-row flex-col h-[calc(100vh-80px)] md:overflow-hidden overflow-y-auto">

      {/* Sidebar */}
      <div className="history-sidebar ml-5 border border-gray-300 rounded-lg w-80 flex flex-col p-2 md:h-full h-[60%] md:overflow-hidden ">
        {/* Header */}
        <div className="p-4 border-b border-gray-300 flex-shrink-0">
          <div className="flex items-center gap-2 text-black-400 text-sm">
            <History className="w-4 h-4" />
            {/* <span>History (5 Recent Chats)</span> */}
            <span>History</span>
          </div>
        </div>

        {/* Chat History List */}
        {/* Scrollable Conversation History */}
        <div className="overflow-y-auto h-[calc(100%-56px)]">
          {conversationData?.conversations && conversationData.conversations.length > 0 ? (
            conversationData.conversations.map((c) => (
              <div
                key={c.conversation_id}
                className={`p-4 hover:bg-gray-300 rounded-lg cursor-pointer  ${selectedConversationId === c.conversation_id ? "bg-gray-400" : ""}`}
                // onClick={() => { singleHistory(1, c.conversation_id); setSelectedHistory(true); setSelectedConversationId(c.conversation_id) }}
                onClick={() => { handleSelectHistory(1, c.conversation_id); setTitle(c.last_user_query) }}
              >
                <h3 className="text-black text-sm font-medium mb-1">
                  {c.last_user_query}
                </h3>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm text-center py-4">No Data Found</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="chat-area mr-5 ml-10 flex-1 rounded-lg flex flex-col h-full md:overflow-hidden ">
        {/* Header */}
        <div className="border-b p-3 border-gray-300 flex-shrink-0">
          <h1 className="text-xl font-medium">{title ? title : "Chat History"}</h1>
        </div>

        <div className="flex-1 p-6 overflow-y-auto flex flex-col-reverse">
          <div className="space-y-6">
            {chat.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`text-[15px] text-black font-normal ${item.id === "user"
                    ? "self-end ml-auto bg-[#E4E4E4] px-4 py-2 rounded-lg w-fit max-w-md"
                    : "self-start mr-auto max-w-3xl"
                    }`}
                >
                  {item.loading ? (
                    <div className="flex items-center gap-2 text-gray-500 italic">
                      {/* Spinner */}
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      Loading...
                    </div>
                  ) : (
                    // <ChatMessage text={item.loading ? "Typing": item.title} />
                    // AFTER (fixed):
                    item.id === "user" ? (
                      <div>{item.title}</div>
                    ) : (
                      <ChatMessage text={item.title} />
                    )
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Animation + Steps (Fixed inside content) */}
        {processSteps && queryID ? (
          <div className="p-6 flex-shrink-0 ">
            <div className="flex gap-6 items-center justify-center">
              {/* Left side - Animation */}
              <div className="flex items-center justify-center">
                <img
                  src={ChatHistoryLoading} // place your gif inside public/ folder
                  alt="Loading..."
                  className="w-50 h-50 object-contain"
                />
              </div>

              <div className="flex-1 space-y-2 overflow-y-auto max-h-40">
                {processSteps.map((step) => (
                  <div key={step.id} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${step.completed
                        ? "border-green-500 bg-green-500"
                        : step.active
                          ? "border-blue-500"
                          : "border-gray-600"
                        }`}
                    >
                      {step.completed ? (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : step.active ? (
                        <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
                      ) : null}
                    </div>
                    <span
                      className={`text-sm ${step.completed
                        ? "text-green-600"
                        : step.active
                          ? "text-black font-medium"
                          : "text-gray-500"
                        }`}
                    >
                      {step.text}
                    </span>
                    {step.active && step.badge && (
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-700">
                        {step.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : ""}

        {/* Input Area (Fixed bottom) */}
        <div className={`input-box p-6 flex-shrink-0 ${loading && "cursor-not-allowed"}`}>
          <div className="bg-[#D9D9D9] h-32 rounded-lg p-3 flex flex-col">
            <textarea
              placeholder="Write anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-transparent text-[#7C7C7C] placeholder-gray-600 outline-none w-full resize-none"
            />
            <div className="flex justify-end gap-3 mt-3">
              {/* <button className={`p-2 text-[#7C7C7C] rounded-full border border-[#7C7C7C]`}>
                <Mic className="w-6 h-6" />
              </button> */}
              <button className={`p-2 bg-white text-[#1E2749] rounded-full hover:bg-gray-100 ${(!inputValue) ? "cursor-not-allowed" : ""}`}
                onClick={() => { if (inputValue) { handleSend() } }}
                disabled={loading}
              >
                {/* <Send className="w-5 h-5" /> */}
                <ChevronRight className='w-6 h-6' />
              </button>
            </div>
          </div>
        </div>
        {/* <ExpandableInput/> */}

      </div >
    </div >
  );
};

export default ChatHistory;