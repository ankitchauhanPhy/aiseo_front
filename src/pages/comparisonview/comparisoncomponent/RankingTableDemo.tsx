import { Trophy, Medal, Award } from "lucide-react"

import MainHoistoryRankingChatgpt from "../../../assets/mainHistory/MainHistoryVisibilityLogo3.svg";
import MainHistoryRankingGemini from "../../../assets/mainHistory/MainHistoryRankingGemini.svg";
import MainHistoryRankingPerplexity1 from "../../../assets/mainHistory/MainHistoryRankingPerplexity1.svg";
import MainHistorySerpAPI from "../../../assets/mainHistory/MainHistorySerpAPI.svg";
import MainHistoryTavily from "../../../assets/mainHistory/MainHistoryTavily.svg";


import { useAuth } from "@/authContext/useAuth";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Loader from "@/component/loader/Loader";
import NoDataFound from "@/component/noDataFound/NoDataFound";
// import Rankings from "../../../components/ui/popup";
// import { ChevronLeft, ChevronRight } from "lucide-react";

interface Competitor {
  name: string;
  isYou?: boolean;
  overallRank: number;
  rankings: {
    openAI: number;
    gemini: number;
    perplexity1: number;
  };
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
  };
  productVisible: boolean;
  productMatrices: (queryID: number, productName: string) => void;
  setProductVisible: (val: boolean) => void;
  loadingRank: boolean;
}

function getRankingColor(rank: number): string {
  switch (rank) {
    case 1:
      return "text-green-600";
    case 2:
      return "text-orange-500";
    case 3:
      return "text-red-500";
    case 4:
      return "text-blue-600";
    default:
      return "text-gray-600";
  }
}


function formatRank(rank: number): JSX.Element {
  const lastDigit = rank % 10;
  const lastTwoDigits = rank % 100;

  const suffix =
    lastTwoDigits === 11 || lastTwoDigits === 12 || lastTwoDigits === 13
      ? "th"
      : lastDigit === 1
        ? "st"
        : lastDigit === 2
          ? "nd"
          : lastDigit === 3
            ? "rd"
            : "th";
  return (
    <span className="inline-block w-8 text-right">
      {rank}
      <sup className="text-xs">{suffix}</sup>
    </span>
  );
}

function getTrophyIcon(rank: number) {
  if (rank === 1) return <Trophy className="w-4 h-4 text-yellow-500" />;
  if (rank === 2) return <Medal className="w-4 h-4 text-gray-400" />;
  if (rank === 3) return <Award className="w-4 h-4 text-amber-600" />;
  return null;
}

function PlatformIcon({
  type,
}: {
  type: "chatgpt" | "gemini" | "perplexity1" | "tavily" | "serpApi";
}) {
  let iconSrc: string;

  switch (type) {
    case "chatgpt":
      iconSrc = MainHoistoryRankingChatgpt;
      break;
    case "gemini":
      iconSrc = MainHistoryRankingGemini;
      break;
    case "perplexity1":
      iconSrc = MainHistoryRankingPerplexity1;
      break;
    case "tavily":
      iconSrc = MainHistoryTavily;
      break;
    case "serpApi":
      iconSrc = MainHistorySerpAPI;
      break;
    default:
      iconSrc = "";
  }

  return (
    <div className="w-15 h-10 flex items-center justify-center">
      {iconSrc ? (
        <img src={iconSrc} alt={type} className="w-6 h-6 object-contain" />
      ) : (
        <span className="text-gray-800 text-xs font-bold">{type}</span>
      )}
    </div>
  );
}

const RankingTableDemo: React.FC<RankingTableProps> = ({
  optimizationRank,
  productVisible,
  productMatrices,
  setProductVisible,
  loadingRank
}) => {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const { setComparisonView, queryID, setQueryID, setCompetitorProductName, yourProductName, competitorProductName } = useAuth();
  const [yourProduct, setYourProduct] = useState<any>(null);

  // const dummyName: string = "Reebok Performer";

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
  console.log("Competitor", competitors, "optimizationRank", optimizationRank);
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[100%] flex flex-col ">
        {/* Shared Scroll Container */}
        <div className="overflow-auto flex-1 flex flex-col">
          <table className="table-auto w-full border-collapse min-w-[500px] ">
            <thead className="bg-gray-50 sticky top-0 z-10 border-b border-gray-200">
              <tr>
                <th className="px-4 py-8 text-xl font-semibold text-gray-700 flex flex-row items-center " colSpan={2} >
                  <span>Rankings</span>
                  {/* <th className="px-4 py-2 text-sm font-semibold text-gray-700 flex items-center justify-center"> */}
                  <div className="flex flex-row  items-center justify-center gap-5">

                  </div>
                </th>
                <th className="px-4 py-2 text-sm font-normal text-gray-700 text-center ">
                  <div className="flex flex-col items-center justify-center">
                    <PlatformIcon type="chatgpt" />
                    <span className="text-xs mt-1">OpenAI</span>
                  </div>
                </th>
                <th className="px-4 py-2 text-sm font-normal text-gray-700 text-center ">
                  <div className="flex flex-col items-center justify-center">
                    <PlatformIcon type="gemini" />
                    <span className="text-xs mt-1">Gemini</span>
                  </div>
                </th>
                <th className="px-4 py-2 text-sm font-normal text-gray-700 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <PlatformIcon type="perplexity1" />
                    <span className="text-xs mt-1">Perplexity</span>
                  </div>
                </th>
                <th className="px-4 py-2 text-sm font-normal text-gray-700 text-center">
                  <div className="flex flex-col items-center justify-center mt-3">
                    <PlatformIcon type="tavily" />
                    <span className="text-xs mt-1">Tavily</span>
                    <span className="text-[10px] text-gray-400">Coming Soon</span>
                  </div>
                </th>
                <th className="px-4 py-2 text-sm font-normal text-gray-700 text-center">
                  <div className="flex flex-col items-center justify-center mt-3 ">
                    <PlatformIcon type="serpApi" />
                    <span className="text-xs mt-1">SerpApi</span>
                    <span className="text-[10px] text-gray-400">Coming Soon</span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {loadingRank ? (
                <tr>
                  <td colSpan={5} className="text-center py-6"><Loader /></td>
                </tr>
              ) : competitors.length > 0 ? (
                competitors.map((competitor, index) => (
                  <tr
                    key={index}
                    className={`relative cursor-pointer ${competitor.isYou || yourProductName === competitor.name ? "bg-purple-200" : competitorProductName === competitor.name ? "bg-purple-200"
                      : "hover:bg-blue-200"} `}
                    onClick={() => {
                      if (yourProductName !== competitor.name) {
                        setQueryID(optimizationRank.query_id);
                        setCompetitorProductName?.(competitor.name);
                      }
                      if (!productVisible) {
                        setYourProduct(competitor.name);
                        setCompetitors((prev) =>
                          prev.map((c, i) => ({
                            ...c,
                            isYou: i === index,
                          }))
                        );
                        productMatrices(queryID, competitor.name);
                      } else if (productVisible) {
                        setComparisonView(true);
                        setProductVisible(false);
                      }
                    }}
                  >

                    {/* LEFT overlay arrow for your product */}
                    {yourProductName === competitor.name && (
                      <div className="absolute -left-[10px] top-1/2 right-9 -translate-y-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-10 h-8 text-blue-600"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M16 5v14l-11-7z" />
                        </svg>
                      </div>
                    )}

                    {/* RIGHT overlay arrow for competitor product */}
                    {competitorProductName === competitor.name && (
                      <div className="absolute -right-[10px] top-1/2 -translate-y-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-10 h-8 text-blue-600"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}

                    {/* Rank */}
                    <td className="px-4 py-2  text-md flex flex-row items-center" colSpan={2}>
                      <span>
                        
                        {formatRank(competitor.overallRank)}
                      </span>
                      <span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-2 overflow-hidden ml-6">
                                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-md font-normal text-gray-700 flex-shrink-0">
                                  {competitor.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-md font-medium text-gray-900 whitespace-normal break-words ml-3">
                                  {competitor.name}
                                </span>

                                {/* Trophy icon */}
                                <span className="flex-shrink-0">
                                  {getTrophyIcon(competitor.overallRank)}
                                </span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              {competitor.name}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </span>
                    </td>



                    {/* Platform Ranks */}
                    <td className="px-4 py-2 text-center">
                      <span className={`text-sm font-medium ${getRankingColor(competitor.rankings.openAI)}`}>
                        {competitor.rankings.openAI ? formatRank(competitor.rankings.openAI) : "-"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span className={`text-sm font-medium ${getRankingColor(competitor.rankings.gemini)}`}>
                        {competitor.rankings.gemini ? formatRank(competitor.rankings.gemini) : "-"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center ">
                      <span className={`text-sm font-medium ${getRankingColor(competitor.rankings.perplexity1)}`}>
                        {competitor.rankings.perplexity1 ? formatRank(competitor.rankings.perplexity1) : "-"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span className={`text-sm font-medium`}>
                        {/* {competitor.rankings.travily ? formatRank(competitor.rankings.travily) : "-"} */}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span className={`text-sm font-medium`}>
                        {/* {competitor.rankings.serpApi ? formatRank(competitor.rankings.serpApi) : "-"} */}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-6"><NoDataFound /></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RankingTableDemo;
