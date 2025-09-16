// import { Trophy, Medal, Award } from "lucide-react"

// import MainHoistoryRankingChatgpt from "../../../assets/mainHistory/MainHistoryRankingsChatgpt.svg";
// import MainHistoryRankingGemini from "../../../assets/mainHistory/MainHistoryRankingGemini.svg";
// import MainHistoryRankingPerplexity1 from "../../../assets/mainHistory/MainHistoryRankingPerplexity1.svg";
// import MainHistoryRankingPerplexity2 from "../../../assets/mainHistory/MainHistoryRankingPerplexity2.svg";

// interface Competitor {
//   id: number
//   name: string
//   isYou?: boolean
//   overallRank: number
//   rankings: {
//     chatGPT: number
//     gemini: number
//     perplexity1: number
//     perplexity2: number
//   }
// }

// const competitors: Competitor[] = [
//   {
//     id: 1,
//     name: "Competitor 1",
//     overallRank: 1,
//     rankings: { chatGPT: 1, gemini: 2, perplexity1: 3, perplexity2: 4 },
//   },
//   {
//     id: 2,
//     name: "Competitor 2",
//     overallRank: 2,
//     rankings: { chatGPT: 2, gemini: 1, perplexity1: 3, perplexity2: 4 },
//   },
//   {
//     id: 3,
//     name: "Competitor 3",
//     overallRank: 3,
//     rankings: { chatGPT: 3, gemini: 2, perplexity1: 1, perplexity2: 4 },
//   },
//   {
//     id: 4,
//     name: "Competitor 4",
//     overallRank: 4,
//     rankings: { chatGPT: 1, gemini: 2, perplexity1: 3, perplexity2: 4 },
//   },
//   {
//     id: 5,
//     name: "Competitor 5",
//     overallRank: 5,
//     rankings: { chatGPT: 2, gemini: 1, perplexity1: 3, perplexity2: 4 },
//   },
//   {
//     id: 6,
//     name: "Competitor 5",
//     overallRank: 5,
//     rankings: { chatGPT: 2, gemini: 1, perplexity1: 3, perplexity2: 4 },
//   },
//   {
//     id: 7,
//     name: "Competitor 5",
//     overallRank: 5,
//     rankings: { chatGPT: 2, gemini: 1, perplexity1: 3, perplexity2: 4 },
//   },
//   {
//     id: 8,
//     name: "Competitor 5 (You)",
//     isYou: true,
//     overallRank: 23,
//     rankings: { chatGPT: 2, gemini: 1, perplexity1: 3, perplexity2: 4 },
//   },
//   {
//     id: 9,
//     name: "Competitor 5",
//     overallRank: 24,
//     rankings: { chatGPT: 2, gemini: 1, perplexity1: 3, perplexity2: 4 },
//   },
//   {
//     id: 10,
//     name: "Competitor 5",
//     overallRank: 25,
//     rankings: { chatGPT: 2, gemini: 1, perplexity1: 3, perplexity2: 4 },
//   },
// ]

// function getRankingColor(rank: number): string {
//   switch (rank) {
//     case 1:
//       return "text-green-600"
//     case 2:
//       return "text-orange-500"
//     case 3:
//       return "text-red-500"
//     case 4:
//       return "text-blue-600"
//     default:
//       return "text-gray-600"
//   }
// }

// function formatRank(rank: number): string {
//   const suffix = rank === 1 ? "st" : rank === 2 ? "nd" : rank === 3 ? "rd" : "th"
//   return `${rank}${suffix}`
// }

// function getTrophyIcon(rank: number) {
//   if (rank === 1) return <Trophy className="w-4 h-4 text-yellow-500" />
//   if (rank === 2) return <Medal className="w-4 h-4 text-gray-400" />
//   if (rank === 3) return <Award className="w-4 h-4 text-amber-600" />
//   return null
// }

// function PlatformIcon({ type }: { type: "chatgpt" | "gemini" | "perplexity1" | "perplexity2" }) {
//   let iconSrc: string

//   switch (type) {
//     case "chatgpt":
//       iconSrc = MainHoistoryRankingChatgpt
//       break
//     case "gemini":
//       iconSrc = MainHistoryRankingGemini
//       break
//     case "perplexity1":
//       iconSrc = MainHistoryRankingPerplexity1
//       break
//     case "perplexity2":
//       iconSrc = MainHistoryRankingPerplexity2
//       break
//     default:
//       iconSrc = ""
//   }

//   return (
//     <div className="w-8 h-8 flex items-center justify-center">
//       {iconSrc ? (
//         <img src={iconSrc} alt={type} className="w-6 h-6 object-contain" />
//       ) : (
//         <span className="text-gray-800 text-xs font-bold">{type}</span>
//       )}
//     </div>
//   )
// }
// export function RankingsTable() {
//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
//       {/* Header row */}
//       <div className="grid grid-cols-[60px_minmax(150px,1fr)_80px_80px_80px_80px]
//                       md:grid-cols-[80px_1fr_100px_100px_100px_100px]
//                       lg:grid-cols-[80px_20%_120px_120px_120px_120px]
//                       gap-1 md:gap-2 p-4 border-b border-gray-200 bg-gray-50">
//         <div className="flex flex-col items-center justify-center gap-1 md:gap-2">
//           <span className="text-xl font-medium text-gray-700">Rankings</span>
//         </div>
//         <div></div>
//         <div className="flex flex-col items-center gap-1 md:gap-2">
//           <PlatformIcon type="chatgpt" />
//           <span className="text-xs font-medium text-gray-700">Chat GPT</span>
//         </div>
//         <div className="flex flex-col items-center gap-1 md:gap-2">
//           <PlatformIcon type="gemini" />
//           <span className="text-xs font-medium text-gray-700">Gemini</span>
//         </div>
//         <div className="flex flex-col items-center gap-1 md:gap-2">
//           <PlatformIcon type="perplexity1" />
//           <span className="text-xs font-medium text-gray-700">Perplexity</span>
//         </div>
//         <div className="flex flex-col items-center gap-1 md:gap-2">
//           <PlatformIcon type="perplexity2" />
//           <span className="text-xs font-medium text-gray-700">Perplexity</span>
//         </div>
//       </div>

//       {/* Scrollable rows */}
//       <div className="flex-1 overflow-y-auto divide-y divide-gray-200">
//         {competitors.map((competitor) => (
//           <div
//             key={competitor.id}
//             className={`grid grid-cols-[60px_minmax(150px,1fr)_80px_80px_80px_80px]
//                         md:grid-cols-[80px_1fr_100px_100px_100px_100px]
//                         lg:grid-cols-[80px_20%_120px_120px_120px_120px]
//                         gap-1 md:gap-2 p-4 items-center ${
//               competitor.isYou ? "bg-purple-50" : "hover:bg-gray-50"
//             }`}
//           >
//             {/* Rank */}
//             <div className="flex items-center">
//               <span className="text-sm font-medium text-gray-600">
//                 {formatRank(competitor.overallRank)}
//               </span>
//             </div>

//             {/* Competitor Info */}
//             <div className="flex items-center overflow-hidden">
//               <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded flex-shrink-0 mr-2"></div>
//               <span className="text-sm font-medium text-gray-900 truncate">
//                 {competitor.name}
//               </span>
//               {getTrophyIcon(competitor.overallRank) && (
//                 <div className="flex-shrink-0 ml-1">
//                   {getTrophyIcon(competitor.overallRank)}
//                 </div>
//               )}
//             </div>

//             {/* Rankings */}
//             <div className="text-center">
//               <span
//                 className={`text-sm font-medium ${getRankingColor(
//                   competitor.rankings.chatGPT
//                 )}`}
//               >
//                 {formatRank(competitor.rankings.chatGPT)}
//               </span>
//             </div>
//             <div className="text-center">
//               <span
//                 className={`text-sm font-medium ${getRankingColor(
//                   competitor.rankings.gemini
//                 )}`}
//               >
//                 {formatRank(competitor.rankings.gemini)}
//               </span>
//             </div>
//             <div className="text-center">
//               <span
//                 className={`text-sm font-medium ${getRankingColor(
//                   competitor.rankings.perplexity1
//                 )}`}
//               >
//                 {formatRank(competitor.rankings.perplexity1)}
//               </span>
//             </div>
//             <div className="text-center">
//               <span
//                 className={`text-sm font-medium ${getRankingColor(
//                   competitor.rankings.perplexity2
//                 )}`}
//               >
//                 {formatRank(competitor.rankings.perplexity2)}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

import { Trophy, Medal, Award } from "lucide-react"
import MainHoistoryRankingChatgpt from "../../../assets/mainHistory/MainHistoryRankingsChatgpt.svg";
import MainHistoryRankingGemini from "../../../assets/mainHistory/MainHistoryRankingGemini.svg";
import MainHistoryRankingPerplexity1 from "../../../assets/mainHistory/MainHistoryRankingPerplexity1.svg";
import MainHistoryRankingPerplexity2 from "../../../assets/mainHistory/MainHistoryRankingPerplexity2.svg";
import { useAuth } from "@/authContext/useAuth";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Rankings from "../../../components/ui/popup";

interface Competitor {
  name: string
  isYou?: boolean
  overallRank: number
  rankings: {
    openAI: number
    gemini: number
    perplexity1: number
  }
}

interface AggregatedData {
  sources: string[];
  avg_score: number;
  borda_points: number;
  source_count: number;
}

interface Ranking {
  product_name: string;
  final_rank: number;
  borda_score: number;
  total_mentions: number;
  source_count: number;
  average_individual_rank: string;
  aggregated_data: AggregatedData;
  openai_rank: number;
  perplexity_rank: number | null;
  gemini_rank: number | null;
}

interface RankingTableProps {
  optimizationRank: {
    query_id: number;
    rankings: Ranking[];
  },
  productVisible: boolean;
  productMatrices: (queryID: number, productName: string) => void;
  setProductVisible: (val: boolean) => void; 
}

function getRankingColor(rank: number): string {
  switch (rank) {
    case 1:
      return "text-green-600"
    case 2:
      return "text-orange-500"
    case 3:
      return "text-red-500"
    case 4:
      return "text-blue-600"
    default:
      return "text-gray-600"
  }
}

function formatRank(rank: number): string {
  const suffix = rank === 1 ? "st" : rank === 2 ? "nd" : rank === 3 ? "rd" : "th"
  return `${rank}${suffix}`
}

function getTrophyIcon(rank: number) {
  if (rank === 1) return <Trophy className="w-4 h-4 text-yellow-500" />
  if (rank === 2) return <Medal className="w-4 h-4 text-gray-400" />
  if (rank === 3) return <Award className="w-4 h-4 text-amber-600" />
  return null
}

function PlatformIcon({ type }: { type: "chatgpt" | "gemini" | "perplexity1" | "perplexity2" }) {
  let iconSrc: string

  switch (type) {
    case "chatgpt":
      iconSrc = MainHoistoryRankingChatgpt
      break
    case "gemini":
      iconSrc = MainHistoryRankingGemini
      break
    case "perplexity1":
      iconSrc = MainHistoryRankingPerplexity1
      break
    case "perplexity2":
      iconSrc = MainHistoryRankingPerplexity2
      break
    default:
      iconSrc = ""
  }

  return (
    <div className="w-8 h-8 flex items-center justify-center">
      {iconSrc ? (
        <img src={iconSrc} alt={type} className="w-6 h-6 object-contain" />
      ) : (
        <span className="text-gray-800 text-xs font-bold">{type}</span>
      )}
    </div>
  )
}

const RankingTable: React.FC<RankingTableProps> = ({ optimizationRank, productVisible, productMatrices, setProductVisible }) => {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const { setComparisonView, queryID, yourProductName } = useAuth();
  const [openDemo, setOpenDemo] = useState(false);
  const [yourProduct, setYourProduct] = useState<any>(null);

  const dummyName: string = "Reebok Performer";

  useEffect(() => {
    if (optimizationRank?.rankings) {
      const formatted: Competitor[] = optimizationRank.rankings.map((r) => ({
        name: r.product_name,
        overallRank: r.final_rank,
        isYou: false,
        rankings: {
          openAI: r.openai_rank,
          gemini: r.gemini_rank ?? 0,
          perplexity1: r.perplexity_rank ?? 0,
        },
      }));
      setCompetitors(formatted);
    }
  }, [optimizationRank]);
console.log("Your Product:", yourProduct);
  return (
    <>   
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[100%] flex flex-col ">
        {/* Shared Scroll Container */}
        <div className="overflow-x-auto flex-1 flex flex-col">
          <div className="min-w-[600px]  flex flex-col h-[100%] ">

            {/* Column Headers - fixed */}
            <div className="flex items-center gap-1 md:gap-2 p-4 border-b border-gray-200 bg-gray-50  min-w-[600px] sticky top-0 z-10">
              {/* Rankings */}
              <div className="flex items-center justify-center w-[60px] md:w-[80px] lg:w-[80px]">
                <span className="text-xl font-medium text-gray-700">Rankings</span>
              </div>

              {/* Competitor Name Placeholder */}
              <div className="invisible flex items-center min-w-[150px] md:min-w-0 lg:w-[20%]">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded flex-shrink-0 mr-2"></div>
                <div className="flex items-center overflow-hidden">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {dummyName.split(" ").slice(0, 2).join(" ")}
                  </span>
                </div>
              </div>

              {/* Platforms */}
              <div className="flex flex-col items-center gap-1 md:gap-2 w-[80px] md:w-[100px] lg:w-[120px]">
                <PlatformIcon type="chatgpt" />
                <span className="text-xs font-medium text-gray-700">Open AI</span>
              </div>
              <div className="flex flex-col items-center gap-1 md:gap-2 w-[80px] md:w-[100px] lg:w-[120px]">
                <PlatformIcon type="gemini" />
                <span className="text-xs font-medium text-gray-700">Gemini</span>
              </div>
              <div className="flex flex-col items-center gap-1 md:gap-2 w-[80px] md:w-[100px] lg:w-[120px]">
                <PlatformIcon type="perplexity1" />
                <span className="text-xs font-medium text-gray-700">Perplexity</span>
              </div>
            </div>

            {/* Competitor Rows - scrollable */}
            <div className="divide-y divide-gray-200 overflow-y-auto flex-1">
              {competitors.map((competitor, index) => (
                <div
                  key={index}
               className={`flex items-center gap-1 md:gap-2 p-4 min-w-[600px] 
  ${competitor.isYou || yourProductName === competitor.name ? "bg-purple-200" : "hover:bg-purple-200"} 
  cursor-pointer`}

                  onClick={() => {
                    
                    if (!productVisible) {
                      setYourProduct(competitor.name)
                      setCompetitors(prev =>
                      prev.map((c, i) => ({
                        ...c,
                        isYou: i === index // only clicked competitor is true
                      }))
                    )
                      productMatrices(queryID, competitor.name)

                    } else if (productVisible) {
                      
                      setComparisonView(true)
                       setOpenDemo(true)
                       setProductVisible(false)
                    }
                  }}
                >
                  {/* Overall Rank */}
                  <div className="flex items-center justify-center w-[60px] md:w-[80px] lg:w-[80px]">
                    <span className="text-sm font-medium text-gray-600">
                      {formatRank(competitor.overallRank)}
                    </span>
                  </div>

                  {/* Competitor Info */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center min-w-[150px] md:min-w-0 lg:w-[20%] overflow-hidden cursor-pointer">
                          {/* Avatar with first letter */}
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700 flex-shrink-0 mr-2">
                            {competitor.name.charAt(0).toUpperCase()}
                          </div>

                          {/* Name + Trophy */}
                          <div className="flex items-center overflow-hidden">
                            <span className="text-sm font-medium text-gray-900 truncate">
                              {competitor.name.split(" ").slice(0, 2).join(" ")}
                            </span>
                            {getTrophyIcon(competitor.overallRank) && (
                              <div className="flex-shrink-0 ml-1">
                                {getTrophyIcon(competitor.overallRank)}
                              </div>
                            )}
                          </div>
                        </div>
                      </TooltipTrigger>

                      {/* Tooltip Content → full name */}
                      <TooltipContent side="top">
                        <p>{competitor.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>


                  {/* Platform Rankings */}
                  <div className="w-[80px] md:w-[100px] lg:w-[120px] text-center">
                    <span className={`text-sm font-medium ${getRankingColor(competitor.rankings.openAI)}`}>
                      {competitor.rankings.openAI
                        ? formatRank(competitor.rankings.openAI)
                        : "-"}
                    </span>
                  </div>
                  <div className="w-[80px] md:w-[100px] lg:w-[120px] text-center">
                    <span className={`text-sm font-medium ${getRankingColor(competitor.rankings.gemini)}`}>
                      {competitor.rankings.gemini
                        ? formatRank(competitor.rankings.gemini)
                        : "-"}
                    </span>
                  </div>
                  <div className="w-[80px] md:w-[100px] lg:w-[120px] text-center">
                    <span className={`text-sm font-medium ${getRankingColor(competitor.rankings.perplexity1)}`}>
                      {competitor.rankings.perplexity1
                        ? formatRank(competitor.rankings.perplexity1)
                        : "-"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Rankings open={openDemo} onOpenChange={setOpenDemo} competitor={""} />
    </>
  )
}

export default RankingTable;


