import React, { useEffect, useState } from 'react';
import { History, Mic, ChevronRight, Loader2 } from 'lucide-react';

import ChatHistoryLoading from "../../assets/chatHistory/ChatHistoryLoading.gif"
import { useAuth } from '@/authContext/useAuth';
// import { useNavigate } from 'react-router-dom';
import { ChatTextAPI } from '@/api';
// import ChatMessage from '@/component/ChatMessage';
import { useNavigate } from 'react-router-dom';
import ChatMessage from '@/component/ChatMessage';

interface ChatHistoryItem {
  title: string;
  timestamp: string;
}

interface ChatItem {
  id: string;
  title: string;
}


interface Step {
  id: number;
  text: string;
  badge?: string;
  completed: boolean;
  active: boolean;
}

const ChatHistory: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [checkProcessStep, setCheckProcessStep] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [chat, setChat] = useState<ChatItem[]>([]);

  const { firstChatText, queryID, setQueryID } = useAuth();
  const nav = useNavigate();

  const chatdata: ChatItem[] = [
    { id: "user", title: "Best runing shoes" },
    { id: "ai", title: "Best running shoes for overweight beginner male joggers in India under 3000 INR, suitable for road running, with good cushioning and support, wide fit, durable, breathable material, and reliable user reviews from the past year?" },
    { id: "user", title: "ok i try it when i will be free for that" },
    { id: "ai", title: "**Query Enhancement Analysis**\n\n**Current Query Strengths:**\n- The query clearly indicates an intent to find recommended running shoes.\n\n**Key Optimization Opportunities:**\n- Defining your running style (e.g., trail, road, treadmill)\n- Specifying your experience level (beginner, intermediate, advanced)\n- Adding any personal needs or constraints (e.g., foot type, budget, brands)\n\n**COMPREHENSIVE ENHANCEMENT CHECKLIST**\n\n**Intent & Purpose Deep-Dive**\n- What specific outcome do you want? (research, purchase decision, immediate use, sharing with others, comparison shopping, problem-solving)\n- What triggered this search? (specific need, curiosity, recommendation, problem to solve)\n- How will you use these results? (immediate action, future reference, decision-making, teaching others)\n- What would make this search \"successful\" for you?\n\n**Personal Context & Constraints**\n- What's your experience level? (complete beginner, some knowledge, experienced, expert)\n- Who's this for? (yourself, family member, professional use, gift recipient)\n- Age considerations? (child-friendly, teen-appropriate, adult-focused, senior-friendly)\n- Any accessibility needs or preferences?\n\n**Situational Specifics**\n- Geographic relevance? (local options, national brands, international availability, specific city/region)\n- Timing factors? (immediate need, seasonal considerations, specific date/event, ongoing research)\n- Budget parameters? (free options, budget-conscious, mid-range, premium/luxury, no budget constraints)\n- Quantity/scale? (single item, bulk purchase, small group, large event)\n\n**Preference & Quality Filters**\n- Specific features or characteristics that matter most?\n- Deal-breakers or things to avoid?\n- Brand preferences or restrictions?\n- Quality level expectations? (basic functional, good value, premium quality, luxury/artisanal)\n- Ethical considerations? (organic, sustainable, local business, fair trade, cruelty-free)\n\n**Information Format & Source Preferences**\n- What type of information is most helpful? (reviews, expert recommendations, comparison charts, video demos, step-by-step guides)\n- Preferred content depth? (quick overview, detailed analysis, comprehensive guide, technical specifications)\n- Source credibility needs? (peer-reviewed, professional reviews, user experiences, expert opinions, official sources)" }

  ]


  const chatHistory: ChatHistoryItem[] = [
    { title: 'Best Nike Shoes under 5000', timestamp: 'yesterday' },
    { title: 'Running shoes Under 5000', timestamp: '2 days ago' },
    { title: 'Casual Running Shoes', timestamp: '3 days ago' },
    { title: 'High Ankle Casual Shoes under 10,000', timestamp: '05/08/2025' },
    { title: 'Bestselling Nike Shoes in India', timestamp: '02/08/2025' }
  ];


  const [processSteps, setProcessSteps] = useState<Step[]>([
    { id: 1, text: 'Creating Queries', badge: 'Query 1', completed: false, active: true },
    { id: 2, text: 'Analysing based on queries', badge: 'Processing', completed: false, active: false },
    { id: 3, text: 'Getting Products Info', badge: 'Gathering Information', completed: false, active: false },
    { id: 4, text: 'Comparing Products', badge: 'Using AI', completed: false, active: false },
    { id: 5, text: 'Creating Reports', badge: 'Generating Report', completed: false, active: false },
    { id: 6, text: 'Done', completed: false, active: false },
  ]);

  console.log("error", error);
  // 🔹 Animate steps every 3s
  //  useEffect(() => {
  //   let currentStep = 0;

  //   const interval = setInterval(() => {
  //     setProcessSteps((prev) =>
  //       prev.map((step, index) => {
  //         if (index < currentStep) {
  //           return { ...step, completed: true, active: false }; // ✅ finished
  //         }
  //         if (index === currentStep) {
  //           return { ...step, completed: false, active: true }; // ⏳ processing
  //         }
  //         return { ...step, completed: false, active: false }; // ⏸ pending
  //       })
  //     );

  //     currentStep++;
  //     if (currentStep > processSteps.length) {
  //       clearInterval(interval);ChatMessage
  //     }
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);


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
          setChat(prev => [...prev, { id: "ai", title: response.data.message }]);
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
        }
        // Push AI response
        if (response.data.message) {
          setChat(prev => [...prev, { id: "ai", title: response.data.message }]);
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
      setChat(prev => [...prev, { id: "user", title: firstChatText }]);
      callChatTextAPI(firstChatText);
    } else {
      // alert("Please Write something !");
      // nav("/");
      setChat(chatdata);
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
    setChat(prev => [...prev, { id: "user", title: userMessage }]);
    setInputValue("");

    //callChatTextAPI(userMessage);
    callChatTextAPIPipeline(userMessage);
  };

  console.log("chathistory", chat, "firstChatText", firstChatText)

  return (
    <div className="flex bg-white pt-4 text-black md:flex-row flex-col h-[calc(100vh-80px)] md:overflow-hidden overflow-y-auto">
      {/* Sidebar */}

      <div className="ml-5 border border-gray-300 rounded-lg w-80 flex flex-col p-2 md:h-full h-[60%] md:overflow-hidden ">
        {/* Header */}
        <div className="p-4 border-b border-gray-300 flex-shrink-0">
          <div className="flex items-center gap-2 text-black-400 text-sm">
            <History className="w-4 h-4" />
            <span>History (5 Recent Chats)</span>
          </div>
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto">
          {chatHistory.map((item, index) => (
            <div
              key={index}
              className="p-4 hover:bg-gray-100 cursor-pointer"
            >
              <h3 className="text-black text-sm font-medium mb-1">
                {item.title}
              </h3>
              <p className="text-gray-500 text-xs">{item.timestamp}</p>
            </div>
          ))}
        </div>
      </div>


      {/* Main Content */}
      <div className="mr-5 ml-10 flex-1 rounded-lg flex flex-col h-full md:overflow-hidden ">
        {/* Header */}
        <div className="border-b p-3 border-gray-300 flex-shrink-0">
          <h1 className="text-xl font-medium">Best Nike Shoes under 5000</h1>
        </div>

        {/* Chat Messages Section (Scrollable) */}
        {/* <div className="flex-1 p-6 overflow-y-auto flex flex-col-reverse">
          <div className="space-y-4">
            {chat.map((item, index) => (
              <div
                key={index}
                className={`flex ${item.id === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl text-[14px] font-normal max-w-[75%] shadow-sm ${item.id === "user"
                      ? "bg-[#1E2749] text-white rounded-br-sm"   // user bubble
                      : "bg-white text-gray-900 rounded-bl-sm"    // AI bubble
                    }`}
                >
                  {item.id === "ai" ? (
                    <MarkdownResponse text={item.title} /> // ✅ AI with Markdown
                  ) : (
                    <span>{item.title}</span>              // ✅ User plain text
                  )}
                </div>
              </div>
            ))}

          </div>
        </div> */}


          <div className="flex-1 p-6 overflow-y-auto flex flex-col-reverse">
          <div className="space-y-6">
            {chat.map((item, index) => (
              <div
                key={index}
                className={`text-[15px] text-black font-normal ${
                  item.id === "user"
                    ? "self-end ml-auto bg-[#E4E4E4] px-4 py-2 rounded-lg w-fit max-w-md"
                    : "self-start mr-auto max-w-3xl" // assistant: no background, wider
                }`}
              >
                <ChatMessage text={item.title} />
              </div>
            ))}
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
        <div className={`p-6 flex-shrink-0 ${loading && "cursor-not-allowed"}`}>
          <div className="bg-[#D9D9D9] h-32 rounded-lg p-3 flex flex-col">
            <textarea
              placeholder="Write anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-transparent text-[#7C7C7C] placeholder-gray-600 outline-none w-full resize-none"
            />
            <div className="flex justify-end gap-3 mt-3">
              <button className={`p-2 text-[#7C7C7C] rounded-full border border-[#7C7C7C]`}>
                <Mic className="w-6 h-6" />
              </button>
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

      </div >
    </div >
  );
};

export default ChatHistory;
