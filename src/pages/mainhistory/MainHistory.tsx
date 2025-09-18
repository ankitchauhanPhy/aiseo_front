import React, { useEffect, useState } from "react";
// import VisibilityChart from "./mainhistorycomponent/VisibilityChart";
import RankingsTable from "./mainhistorycomponent/RankingTable";
import MentionsBar from "./mainhistorycomponent/MentionBar";
import LightBulb from "../../assets/mainHistory/LightBulb.png";
import { useAuth } from "@/authContext/useAuth";
import ComparisonView from "../comparisonview/ComparisonView";
import ExampleVisibilityDetails from "@/component/VisibilityDetails";
import { HistoryAPI, OptimizationAPI } from "@/api";
import VisibilityNoDataFound from "./mainhistorycomponent/VisibilityNoDataFound";
import MentionBarNoDataFound from "./mainhistorycomponent/MentionBarNoDataFound";
import VisibilityChart2 from "./mainhistorycomponent/VisibilityChart2";
import { productMatrices } from "@/api/optimizationApi";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "@/component/loader/Loader";
import RankingPopup from "@/component/rankingPopUp/RankingPopup";


interface ChatItem {
  id: string;
  title: string;
  loading: boolean;
}

interface ApiConversation {
  role: "user" | "assistant";
  message: string;
}

const MainHistory: React.FC = () => {

  const [openVisibility, setOpenVisibility] = useState(false);
  const [visibilityData, setVisibilityData] = useState("");
  const [optimizationRank, setOptimizationRank] = useState({
    query_id: 0,
    product_visible: true,
    rankings: []
  })
  const [productVisible, setProductVisible] = useState(false);
  const [chat, setChat] = useState<ChatItem[]>([]);
  const [singleConversationId, setSingleConversationId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
 const  [noData, setNoData] = useState<boolean>(false);

  const nav = useNavigate();
  const location = useLocation();

  const { userId, conversationId } = location.state || {};

  const { comparisonView, queryID, setQueryID, setProductMatricesData, conversationData, setConversationData, setIsVisible, setIsComparison } = useAuth();


  async function singleHistory(userId: number, conversationId: number) {
    try {
      setLoading(true);
      const response = await HistoryAPI.getSinglehistory(userId, conversationId);
      console.log("API Response:", response);
      if (response.statusText) {
        setLoading(false);
        setSingleConversationId(conversationId);
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
          setQueryID(response.data.final_query_id);
        }
      }
    } catch (err: any) {
      setLoading(false);
      if (err.response) {
        toast.error(err.response.data.detail);
      } else {
        toast.error(err.message);
      }

    }
  }

  async function getAllHistory() {
    setLoading(true);
    try {
      const response = await HistoryAPI.getAllhistory(1);
      console.log("API Response:", response);
      if (response.statusText) {
        setLoading(false);
        setConversationData(response.data);
        if (!userId && !conversationId) {
          singleHistory(1, response.data.conversations[0]?.conversation_id);
        }
      }
    } catch (err: any) {
      setLoading(false);
      if (err.response) {
        toast.error(err.response.data.detail);
      } else {
        toast.error(err.message);
      }
    }
  }

  useEffect(() => {
    if (userId && conversationId) {
      singleHistory(userId, conversationId);
      getAllHistory();
    } else {
      getAllHistory();
    }
  }, [])

  async function productMetrices(queryID: number, productName: string) {
    try {
      const response = await OptimizationAPI.productMatrices(queryID, productName);
      console.log("API Response:", response);

      if (response.statusText) {
        setProductVisible(true);
        setProductMatricesData(response.data);
      }

    } catch (err: any) {

      if (err.response) {
        toast.error(err.response.data.detail);
      } else {
        toast.error(err.message)
      }
    }
  }

  useEffect(() => {
    if (!queryID) return;

    const fetchPipeline = async () => {
      setLoading(true);
      try {
        const response = await OptimizationAPI.rankedQuery(queryID);
        console.log("API Response:", response);

        if (response.statusText) {
          setLoading(false);
          setOptimizationRank(response.data);
          if(response.data.rankings.length === 0){
            setNoData(true);
          }
          if (response.data.product_visible) {
            setProductVisible(true);
          }
        }
      } catch (err: any) {
        setLoading(false);
        if (err.response) {
          toast.error(err.response.data.detail);
        } else {
          toast.error(err.message);
        }
      }
    };

    fetchPipeline();
  }, [queryID])

  console.log("userId conversationId", userId, conversationId);

  return (
    <>
      {!comparisonView ? (
        <div className="h-[calc(100vh-75px)] bg-white text-black flex lg:overflow-hidden overflow-y-auto">
          {/* Main Content */}
          <div className="p-4 flex gap-4 flex flex-col lg:flex-row w-full max-h-screen">

            {/* Left Column */}
            <div className="flex flex-col w-full lg:w-[25%] xl:w-[350px] gap-2 h-full">
              {/* Query Box */}
              <div className="flex lg:items-start items-center justify-center lg:justify-start pb-3 pt-0">
                <div className="w-full rounded-2xl shadow-xl bg-white border border-gray-200 p-4 text-black">
                  {/* Header */}
                  <div className="relative flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
                    <h2 className="text-sm font-semibold text-gray-700">Your Query</h2>
                    <button className="text-md text-purple-400 hover:text-purple-700 cursor-pointer"
                      onClick={() => { nav("/chathistory") }}
                    >
                      Start New
                    </button>
                  </div>

                  {/* Chat messages */}
                  <div className="relative space-y-4 h-64 overflow-y-auto pr-2">
                    {loading ? <Loader /> : (
                      chat.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex ${msg.id === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`px-4 py-3 rounded-lg text-sm max-w-[80%] leading-relaxed ${msg.id === "user"
                              ? "bg-gray-100 text-black" // user message style
                              : "bg-[#7C3BED] text-white" // assistant message style
                              }`}
                          >
                            {msg.title}
                          </div>
                        </div>
                      ))
                    )}

                  </div>

                  <div className="flex flex-row gap-3 mt-5">
                    <img
                      src={LightBulb}
                      alt="Example"
                      className="w-6 h-6 object-cover rounded-lg"
                    />
                    <p className="text-sm text-gray-500">Thinking...</p>
                  </div>

                </div>
              </div>

              {/* History Box */}
              <div className="flex lg:items-start items-center justify-center lg:justify-start flex-1 overflow-hidden">
                <div className="w-full rounded-2xl shadow-xl bg-white border border-gray-200 p-4 text-black flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
                    <h2 className="text-sm font-semibold text-black">
                      History
                      {/* <span className="text-black text-[12px] font-normal">(5 Recent Chats)</span> */}
                    </h2>
                  </div>

                  {/* Chats list scrollable */}
                  <div className=" relative divide-y divide-gray-200 flex-1 overflow-y-auto">
                    {loading ? <Loader /> : (
                      (conversationData?.conversations && conversationData.conversations.length > 0) && conversationData.conversations.map((c, index) => (
                        <div
                          key={index}
                          className={`px-4 py-3 ${conversationId ? (c.conversation_id === conversationId ? "bg-gray-600 text-white" : "")
                            : (singleConversationId === c.conversation_id) ? "bg-gray-600 text-white" : ""} hover:bg-gray-400 hover:text-white rounded-lg cursor-pointer transition`}
                          onClick={() => { singleHistory(1, c.conversation_id); setIsVisible(false); setIsComparison(false) }}
                        >
                          <p className="text-sm font-medium">{c.last_user_query}</p>
                        </div>
                      ))
                    )}

                  </div>

                  {/* Footer stays at bottom */}
                  <button className="w-full py-3 text-center text-sm font-medium text-white bg-gray-800 hover:bg-[#7C3BED] rounded-b-2xl transition">
                    View More
                  </button>
                </div>
              </div>
            </div>


            {/* Middle Column */}
            <div className="flex flex-col gap-4 lg:w-[30%] flex-1">

              {/* Visibility */}
              {productVisible ? (
                <>
                  <VisibilityChart2 setOpenVisibility={setOpenVisibility} setVisibilityData={setVisibilityData} />
                  <MentionsBar />
                </>
              ) : (
                <>
                  <VisibilityNoDataFound />
                  <MentionBarNoDataFound />
                </>
              )}
            </div>

            {/* Right Column (Rankings) */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[100%] flex flex-col w-full lg:w-[40%] xl:w-[50%] ">
              <RankingsTable optimizationRank={optimizationRank} productVisible={productVisible} productMatrices={productMetrices} setProductVisible={setProductVisible} 
              loading={loading} noData={noData} 
              />
            </div>
          </div>
        </div>
      ) : (
        <ComparisonView optimizationRank={optimizationRank} productVisible={productVisible} productMatrices={productMatrices} setProductVisible={setProductVisible} setOpenVisibility={setOpenVisibility} setVisibilityData={setVisibilityData} />
      )}
      {openVisibility && (
        <ExampleVisibilityDetails openVisibility={openVisibility} setOpenVisibility={setOpenVisibility} visibilityData={visibilityData} />
      )}

      

    </>
  );
};

export default MainHistory;
