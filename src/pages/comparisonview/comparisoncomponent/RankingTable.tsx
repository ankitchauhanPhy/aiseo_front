import { Trophy, Medal, Award } from "lucide-react"

import MainHoistoryRankingChatgpt from "../../../assets/mainHistory/MainHistoryRankingsChatgpt.svg";
import MainHistoryRankingGemini from "../../../assets/mainHistory/MainHistoryRankingGemini.svg";
import MainHistoryRankingPerplexity1 from "../../../assets/mainHistory/MainHistoryRankingPerplexity1.svg";
import MainHistoryRankingPerplexity2 from "../../../assets/mainHistory/MainHistoryRankingPerplexity2.svg";

interface Competitor {
  id: number
  name: string
  isYou?: boolean
  overallRank: number
  rankings: {
    chatGPT: number
    gemini: number
    perplexity1: number
    perplexity2: number
  }
}

const competitors: Competitor[] = [
  {
    id: 1,
    name: "Competitor 1",
    overallRank: 1,
    rankings: { chatGPT: 1, gemini: 2, perplexity1: 3, perplexity2: 4 },
  },
  {
    id: 2,
    name: "Competitor 2",
    overallRank: 2,
    rankings: { chatGPT: 2, gemini: 1, perplexity1: 3, perplexity2: 4 },
  },
  {
    id: 3,
    name: "Competitor 3",
    overallRank: 3,
    rankings: { chatGPT: 3, gemini: 2, perplexity1: 1, perplexity2: 4 },
  },
  {
    id: 4,
    name: "Competitor 4",
    overallRank: 4,
    rankings: { chatGPT: 1, gemini: 2, perplexity1: 3, perplexity2: 4 },
  },
  {
    id: 5,
    name: "Competitor 5",
    overallRank: 5,
    rankings: { chatGPT: 2, gemini: 1, perplexity1: 3, perplexity2: 4 },
  },
  {
    id: 6,
    name: "Competitor 5",
    overallRank: 5,
    rankings: { chatGPT: 2, gemini: 1, perplexity1: 3, perplexity2: 4 },
  },
  {
    id: 7,
    name: "Competitor 5",
    overallRank: 5,
    rankings: { chatGPT: 2, gemini: 1, perplexity1: 3, perplexity2: 4 },
  },
  {
    id: 8,
    name: "Competitor 5 (You)",
    isYou: true,
    overallRank: 23,
    rankings: { chatGPT: 2, gemini: 1, perplexity1: 3, perplexity2: 4 },
  },
  {
    id: 9,
    name: "Competitor 5",
    overallRank: 24,
    rankings: { chatGPT: 2, gemini: 1, perplexity1: 3, perplexity2: 4 },
  },
  {
    id: 10,
    name: "Competitor 5",
    overallRank: 25,
    rankings: { chatGPT: 2, gemini: 1, perplexity1: 3, perplexity2: 4 },
  },
]

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
export function RankingsTable() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
      {/* Header row */}
      <div className="grid grid-cols-[60px_minmax(150px,1fr)_80px_80px_80px_80px]
                      md:grid-cols-[80px_1fr_100px_100px_100px_100px]
                      lg:grid-cols-[80px_20%_120px_120px_120px_120px]
                      gap-1 md:gap-2 p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col items-center justify-center gap-1 md:gap-2">
          <span className="text-xl font-medium text-gray-700">Rankings</span>
        </div>
        <div></div>
        <div className="flex flex-col items-center gap-1 md:gap-2">
          <PlatformIcon type="chatgpt" />
          <span className="text-xs font-medium text-gray-700">Chat GPT</span>
        </div>
        <div className="flex flex-col items-center gap-1 md:gap-2">
          <PlatformIcon type="gemini" />
          <span className="text-xs font-medium text-gray-700">Gemini</span>
        </div>
        <div className="flex flex-col items-center gap-1 md:gap-2">
          <PlatformIcon type="perplexity1" />
          <span className="text-xs font-medium text-gray-700">Perplexity</span>
        </div>
        <div className="flex flex-col items-center gap-1 md:gap-2">
          <PlatformIcon type="perplexity2" />
          <span className="text-xs font-medium text-gray-700">Perplexity</span>
        </div>
      </div>

      {/* Scrollable rows */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-200">
        {competitors.map((competitor) => (
          <div
            key={competitor.id}
            className={`grid grid-cols-[60px_minmax(150px,1fr)_80px_80px_80px_80px]
                        md:grid-cols-[80px_1fr_100px_100px_100px_100px]
                        lg:grid-cols-[80px_20%_120px_120px_120px_120px]
                        gap-1 md:gap-2 p-4 items-center ${
              competitor.isYou ? "bg-purple-50" : "hover:bg-gray-50"
            }`}
          >
            {/* Rank */}
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-600">
                {formatRank(competitor.overallRank)}
              </span>
            </div>

            {/* Competitor Info */}
            <div className="flex items-center overflow-hidden">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded flex-shrink-0 mr-2"></div>
              <span className="text-sm font-medium text-gray-900 truncate">
                {competitor.name}
              </span>
              {getTrophyIcon(competitor.overallRank) && (
                <div className="flex-shrink-0 ml-1">
                  {getTrophyIcon(competitor.overallRank)}
                </div>
              )}
            </div>

            {/* Rankings */}
            <div className="text-center">
              <span
                className={`text-sm font-medium ${getRankingColor(
                  competitor.rankings.chatGPT
                )}`}
              >
                {formatRank(competitor.rankings.chatGPT)}
              </span>
            </div>
            <div className="text-center">
              <span
                className={`text-sm font-medium ${getRankingColor(
                  competitor.rankings.gemini
                )}`}
              >
                {formatRank(competitor.rankings.gemini)}
              </span>
            </div>
            <div className="text-center">
              <span
                className={`text-sm font-medium ${getRankingColor(
                  competitor.rankings.perplexity1
                )}`}
              >
                {formatRank(competitor.rankings.perplexity1)}
              </span>
            </div>
            <div className="text-center">
              <span
                className={`text-sm font-medium ${getRankingColor(
                  competitor.rankings.perplexity2
                )}`}
              >
                {formatRank(competitor.rankings.perplexity2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

