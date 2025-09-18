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

import Loader from "@/component/loader/Loader";
import NoDataFound from "@/component/noDataFound/NoDataFound";
import { toast } from "react-toastify";
// import RankingPopup from "@/component/rankingPopUp/RankingPopup";

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
  loading: boolean;
  noData: boolean;
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

const RankingsTable: React.FC<RankingTableProps> = ({ optimizationRank, productVisible, productMatrices, setProductVisible, loading, noData }) => {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [openDemo, setOpenDemo] = useState(false);
  const [rankingPopup, setRankingPopup] = useState<boolean>(false);
  const [yourProduct, setYourProduct] = useState<any>(null);

   const { setComparisonView,
    queryID,
    yourProductName, setYourProductName,
    setCompetitorProductName,
    isVisible, setIsVisible,
    isComparison, setIsComparison
  } = useAuth();


  const dummyName: string = "Reebok Performer";

  useEffect(()=>{
    if(isVisible && yourProductName){
      productMatrices(queryID,yourProductName)
      setYourProduct(yourProductName);
    }
  },[isVisible])

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
              {/* <div className="invisible flex items-center min-w-[150px] md:min-w-0 lg:w-[20%]">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded flex-shrink-0 mr-2"></div>
                <div className="flex items-center overflow-hidden">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {dummyName.split(" ").slice(0, 2).join(" ")}
                  </span>
                </div>
              </div> */}

              <div className="flex items-center justify-center min-w-[150px] md:min-w-0 lg:w-[20%]">
                {/* Name + Checkboxes */}
                <div className="flex flex-col">
                  {/* Checkboxes */}
                  <div className="flex flex-col gap-2 mt-1">
                    <label className="flex items-center gap-1 text-sm text-gray-700 font-semibold">
                      <input type="checkbox" className="accent-purple-600 mr-2"
                        checked={isVisible}
                        onChange={(e) => { setIsVisible(e.target.checked); setRankingPopup(true) }}
                      />
                      Visibility
                    </label>
                    {productVisible &&
                      <label className="flex items-center gap-1 text-sm text-gray-700 font-semibold">
                        <input type="checkbox" className="accent-purple-600 mr-2"
                          checked={isComparison}
                          onChange={((e) => { setIsComparison(e.target.checked) })}
                        />
                        Comparison
                      </label>
                    }
                  </div>
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
              {loading ? <Loader /> : (
                competitors.length > 0 &&
                competitors.map((competitor, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-1 md:gap-2 p-4 min-w-[600px] 
                             ${competitor.isYou || yourProduct === competitor.name ? "bg-purple-200" : "hover:bg-blue-300"} 
                              cursor-pointer rounded-xl`}
                    onClick={() => {
                      if (!productVisible && isVisible) {
                        setYourProduct(competitor.name)
                        setYourProductName(competitor.name)
                        setCompetitors(prev =>
                          prev.map((c, i) => ({
                            ...c,
                            isYou: i === index // only clicked competitor is true
                          }))
                        )
                        productMatrices(queryID, competitor.name)

                      } else if (!productVisible && !isVisible) {
                        toast.info("Firstly check the Visibility");
                      }
                      else if (productVisible && !isComparison) {
                        toast.info("Firstly Check The Comparison!");
                      }
                      else if (productVisible && isComparison) {
                        setComparisonView(true)
                        setOpenDemo(true)
                        setProductVisible(false)
                        setCompetitorProductName?.(competitor.name)
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
                ))
              )}
              {noData && <NoDataFound />}
            </div>
          </div>
        </div>
      </div>
      {/* {rankingPopup && 
        <RankingPopup openComparison={rankingPopup} setOpenComparison={setRankingPopup}
        optimizationRank={optimizationRank} productVisible={productVisible} 
        productMatrices={productMatrices} setProductVisible={setProductVisible} 
        loading={loading} noData={noData}/>
      } */}

    </>
  )
}

export default RankingsTable;

