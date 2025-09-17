
import { Card } from "@/components/ui/card"
import { Calendar, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"


import MentionsPerplexity from "../../../assets/mainHistory/MentionPerplexity.svg";
import MentionsChatgpt1 from "../../../assets/mainHistory/MentionChatgpt1.svg";
import MentionsGemini from "../../../assets/mainHistory/MentionsGemini.svg";
import { useAuth } from "@/authContext/useAuth";

const platformData = [
  {
    name: "Perplexity",
    // icon: (
    //   <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
    //     <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    //   </svg>
    // ),
    icon: `${MentionsPerplexity}`,
    mentions: 0,
    color: "bg-blue-500",
    
  },
  {
    name: "Open AI",
    // icon: (
    //   <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
    //     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    //   </svg>
    // ),
    icon: `${MentionsChatgpt1}`,
    mentions: 0,
    color: "bg-purple-500",
   
  },
  {
    name: "Gemini",
    // icon: (
    //   <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
    //     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    //   </svg>
    // ),
    icon: `${MentionsGemini}`,
    mentions: 0,
    color: "bg-orange-500",
     },
]

export default function MentionBar() {

  const { productMatricesData } = useAuth();

  const [isAnimated, setIsAnimated] = useState(false)
  const totalMentions = productMatricesData[0].total_mentions ?? 0;

  useEffect(() => {
    if (productMatricesData.length > 0) {
      platformData.map((item) => {
        const temp = item.name.toLowerCase();

        // dynamic key lookup
        item.mentions = productMatricesData[0].mentions_by_platform[temp]
          ? productMatricesData[0].mentions_by_platform[temp]
          : 0 ;

        return item;
      });
    }
  }, [productMatricesData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  

  return (
    <Card className="p-6 bg-white shadow-sm border border-gray-200 rounded-2xl h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Mentions</h2>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="text-sm bg-transparent cursor-not-allowed">
            <Calendar className="w-4 h-4 mr-2" />
            Jan 2024 - Dec 2024
          </Button>
          <Button variant="outline" size="sm" className="cursor-not-allowed">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Total Mentions */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:gap-4 ">
        <div className="text-5xl font-bold text-gray-900 mb-2">{totalMentions}</div>
        <div className="text-gray-600 font-medium">Total Mentions across platforms</div>
      </div>

      {/* Platform List */}
      <div className="space-y-5">
        {platformData.map((platform, index) => {
          const progressPercent = (platform.mentions / totalMentions) * 100;
          return (
            <div key={index} className="flex items-center gap-4">
              {/* Platform Icon */}
              <div className="w-12 h-12  rounded-2xl flex items-center justify-center shadow-sm transition-all duration-700 ease-out"
                style={{
                  opacity: isAnimated ? 1 : 0,
                  transform: isAnimated ? "translateX(0)" : "translateX(-20px)",
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                {/* {platform.icon} */}
                <img src={platform.icon} alt="Perplexity" className="w-full h-full object-contain" />
              </div>

              {/* Platform Name */}
              <div className="w-20 text-sm font-normal text-gray-900 transition-all duration-500 ease-out"
                style={{
                  opacity: isAnimated ? 1 : 0,
                  transitionDelay: `${index * 150 + 100}ms`,
                }}
              >
                {platform.name}</div>

              {/* Progress Bar */}
              <div className="flex-1 mx-4">
                <div className="w-full bg-[#ECE0FF] rounded-full h-2.5">
                  <div className={`h-2.5 rounded-full ${platform.color} transition-all duration-1000 ease-out`}
                    // style={{ width: `${platform.progress}%` }} 
                    style={{
                      // width: isAnimated ? `${platform.progress}%` : "0%",
                      width: isAnimated ? `${progressPercent}%` : "0%",
                      transitionDelay: `${index * 150 + 200}ms`,
                      opacity: isAnimated ? 1 : 0.8,
                    }}
                  />
                </div>
              </div>

              {/* Mentions Count */}
              <div className="text-[14px] font-normal text-[#1D1D1D] w-8 text-right transition-opacity duration-500"
                style={{
                  opacity: isAnimated ? 1 : 0,
                  transitionDelay: `${index * 150 + 800}ms`,
                }}
              >
                {platform.mentions}</div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

