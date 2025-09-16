import React, { useEffect, useState } from "react";
// import VisibilityChart from "./mainhistorycomponent/VisibilityChart";
import RankingsTable from "./mainhistorycomponent/RankingTable";
import MentionsBar from "./mainhistorycomponent/MentionBar";
import LightBulb from "../../assets/mainHistory/LightBulb.png";
import { useAuth } from "@/authContext/useAuth";
import ComparisonView from "../comparisonview/ComparisonView";
import ExampleVisibilityDetails from "@/component/VisibilityDetails";
import { OptimizationAPI } from "@/api";
import VisibilityNoDataFound from "./mainhistorycomponent/VisibilityNoDataFound";
import MentionBarNoDataFound from "./mainhistorycomponent/MentionBarNoDataFound";
import VisibilityChart2 from "./mainhistorycomponent/VisibilityChart2";

type ChatItem = {
  text: string;
  time: string;
};

const MainHistory: React.FC = () => {
  const [openVisibility, setOpenVisibility] = useState(false);
  const [visibilityData, setVisibilityData] = useState("");
  const [optimizationRank, setOptimizationRank] = useState({
    query_id: 0,
    product_visible: true,
    rankings: []
  })
  const [productVisible, setProductVisible] = useState(false);
  const { comparisonView, queryID, setProductMatricesData} = useAuth();




  console.log("queryID mainhistory", queryID);
  console.log("visibilityData", visibilityData, "openVisibility", openVisibility);

  const chats: ChatItem[] = [
    { text: "Best Nike Shoes under 5000", time: "yesterday" },
    { text: "Running shoes Under 5000", time: "2 days ago" },
    { text: "Casual Running Shoes", time: "3 days ago" },
    { text: "High Ankle Casual Shoes under 10,000", time: "06/08/2025" },
    { text: "Bestselling Nike Shoes in India", time: "02/09/2025" },
  ];

  async function productMetrices(queryID: number, productName: string) {
    try {
      const response = await OptimizationAPI.productMatrices(queryID, productName);
      console.log("API Response:", response);

      if (response.statusText) {
        setProductVisible(true);
        setProductMatricesData(response.data);

      }

    } catch (err: unknown) {
      console.error("API Error:", err);
      const message = err instanceof Error ? err.message : "Something went wrong!";
      console.log("message mainhistory error", message);
    }
  }

  useEffect(() => {
    if (!queryID) return;

    const fetchPipeline = async () => {
      try {
        const response = await OptimizationAPI.rankedQuery(queryID);
        console.log("API Response:", response);

        if (response.statusText) {
          setOptimizationRank(response.data);
          if (response.data.product_visible) {
            setProductVisible(true);
          }
        }
      } catch (err: unknown) {
        console.error("API Error:", err);
        const message = err instanceof Error ? err.message : "Something went wrong!";
        console.log("message mainhistory error", message);
      }
    };

    fetchPipeline();
  }, [queryID])

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
                    <button className="text-xs text-purple-400 hover:text-purple-500">
                      Start New
                    </button>
                  </div>

                  {/* Chat messages */}
                  <div className="space-y-4">
                    {/* Example messages */}
                    <div className="flex justify-end">
                      <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm">
                        Best Nike Shoes
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-[#7C3BED] px-4 py-3 rounded-lg text-sm text-white leading-relaxed max-w-[80%]">
                        <p>Do you want to search any specific shoes?</p>
                        <p className="mt-2 font-semibold">Shoes type:</p>
                        <p>Running, Sports, Casuals, etc</p>
                        <p className="mt-2 font-semibold">Price Range:</p>
                        <p>1000-2000, 2000-5000, etc</p>
                      </div>
                    </div>
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
                      History <span className="text-black text-[12px] font-normal">(5 Recent Chats)</span>
                    </h2>
                  </div>

                  {/* Chats list scrollable */}
                  <div className="divide-y divide-gray-200 flex-1 overflow-y-auto">
                    {chats.map((chat, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition"
                      >
                        <p className="text-sm font-medium">{chat.text}</p>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer stays at bottom */}
                  <button className="w-full py-3 text-center text-sm font-medium text-gray-300 bg-gray-100 hover:bg-gray-200 rounded-b-2xl transition">
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
                  <VisibilityChart2 setOpenVisibility={setOpenVisibility} setVisibilityData={setVisibilityData}/>
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
              <RankingsTable optimizationRank={optimizationRank} productVisible={productVisible} productMatrices={productMetrices} setProductVisible={setProductVisible} />
            </div>
          </div>
        </div>
      ) : (
        <ComparisonView optimizationRank={optimizationRank} productVisible={productVisible} productMatrices={productMetrices} setProductVisible={setProductVisible} setOpenVisibility={setOpenVisibility} setVisibilityData={setVisibilityData}/>
      )}
      {openVisibility && (
        <ExampleVisibilityDetails openVisibility={openVisibility} setOpenVisibility={setOpenVisibility} visibilityData={visibilityData}/>
      )}

    </>
  );
};

export default MainHistory;
