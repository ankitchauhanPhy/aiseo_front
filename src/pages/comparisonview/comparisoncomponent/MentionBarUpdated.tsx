
// import { Card } from "@/components/ui/card"
// import { Calendar, Maximize2 } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useEffect, useState } from "react"


// import MentionsPerplexity from "../../../assets/mainHistory/MentionPerplexity.svg";
// import MentionsChatgpt1 from "../../../assets/mainHistory/MentionChatgpt1.svg";
// import MentionsGemini from "../../../assets/mainHistory/MentionsGemini.svg";
// import { useAuth } from "@/authContext/useAuth";

// const platformData = [
//   {
//     name: "Perplexity",
//     // icon: (
//     //   <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
//     //     <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
//     //   </svg>
//     // ),
//     icon: `${MentionsPerplexity}`,
//     mentions: 0,
//     color: "bg-blue-500",
    
//   },
//   {
//     name: "Open AI",
//     // icon: (
//     //   <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
//     //     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
//     //   </svg>
//     // ),
//     icon: `${MentionsChatgpt1}`,
//     mentions: 0,
//     color: "bg-purple-500",
   
//   },
//   {
//     name: "Gemini",
//     // icon: (
//     //   <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
//     //     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
//     //   </svg>
//     // ),
//     icon: `${MentionsGemini}`,
//     mentions: 0,
//     color: "bg-orange-500",
//      },
// ]

// export default function MentionBar() {

//   const { productMatricesCompetitor } = useAuth();
//  console.log("54=====",productMatricesCompetitor)
//   const [isAnimated, setIsAnimated] = useState(false)
//   const totalMentions = productMatricesCompetitor[0].total_mentions ?? 0;

//   useEffect(() => {
//     if (productMatricesCompetitor.length > 0) {
//       platformData.map((item) => {
//         const temp = item.name.toLowerCase();

//         // dynamic key lookup
//         item.mentions = productMatricesCompetitor[0].mentions_by_platform[temp]
//           ? productMatricesCompetitor[0].mentions_by_platform[temp]
//           : 0 ;

//         return item;
//       });
//     }
//   }, [productMatricesCompetitor]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsAnimated(true)
//     }, 100)
//     return () => clearTimeout(timer)
//   }, [])

  

//   return (
//     <Card className="p-6 bg-white shadow-sm border border-gray-200 rounded-2xl h-full">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-semibold text-gray-900">Mentions</h2>
//         <div className="flex items-center gap-3">
//           <Button variant="outline" size="sm" className="text-sm bg-transparent cursor-not-allowed">
//             <Calendar className="w-4 h-4 mr-2" />
//             Jan 2024 - Dec 2024
//           </Button>
//           <Button variant="outline" size="sm" className="cursor-not-allowed">
//             <Maximize2 className="w-4 h-4" />
//           </Button>
//         </div>
//       </div>

//       {/* Total Mentions */}
//       <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:gap-4 ">
//         <div className="text-5xl font-bold text-gray-900 mb-2">{totalMentions}</div>
//         <div className="text-gray-600 font-medium">Total Mentions across platforms</div>
//       </div>

//       {/* Platform List */}
//       <div className="space-y-5">
//         {platformData.map((platform, index) => {
//           const progressPercent = (platform.mentions / totalMentions) * 100;
//           return (
//             <div key={index} className="flex items-center gap-4">
//               {/* Platform Icon */}
//               <div className="w-12 h-12  rounded-2xl flex items-center justify-center shadow-sm transition-all duration-700 ease-out"
//                 style={{
//                   opacity: isAnimated ? 1 : 0,
//                   transform: isAnimated ? "translateX(0)" : "translateX(-20px)",
//                   transitionDelay: `${index * 150}ms`,
//                 }}
//               >
//                 {/* {platform.icon} */}
//                 <img src={platform.icon} alt="Perplexity" className="w-full h-full object-contain" />
//               </div>

//               {/* Platform Name */}
//               <div className="w-20 text-sm font-normal text-gray-900 transition-all duration-500 ease-out"
//                 style={{
//                   opacity: isAnimated ? 1 : 0,
//                   transitionDelay: `${index * 150 + 100}ms`,
//                 }}
//               >
//                 {platform.name}</div>

//               {/* Progress Bar */}
//               <div className="flex-1 mx-4">
//                 <div className="w-full bg-[#ECE0FF] rounded-full h-2.5">
//                   <div className={`h-2.5 rounded-full ${platform.color} transition-all duration-1000 ease-out`}
//                     // style={{ width: `${platform.progress}%` }} 
//                     style={{
//                       // width: isAnimated ? `${platform.progress}%` : "0%",
//                       width: isAnimated ? `${progressPercent}%` : "0%",
//                       transitionDelay: `${index * 150 + 200}ms`,
//                       opacity: isAnimated ? 1 : 0.8,
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Mentions Count */}
//               <div className="text-[14px] font-normal text-[#1D1D1D] w-8 text-right transition-opacity duration-500"
//                 style={{
//                   opacity: isAnimated ? 1 : 0,
//                   transitionDelay: `${index * 150 + 800}ms`,
//                 }}
//               >
//                 {platform.mentions}</div>
//             </div>
//           )
//         })}
//       </div>
//     </Card>
//   )
// }

import { Card } from "@/components/ui/card"
import { Calendar, Maximize2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useCallback } from "react"

import MentionsPerplexity from "../../../assets/mainHistory/MentionPerplexity.svg";
import MentionsChatgpt1 from "../../../assets/mainHistory/MentionChatgpt1.svg";
import MentionsGemini from "../../../assets/mainHistory/MentionsGemini.svg";
import { useAuth } from "@/authContext/useAuth";
import { OptimizationAPI } from "@/api";

interface PlatformData {
  name: string;
  icon: string;
  mentions: number;
  color: string;
  key: string; // Add key for API lookup
}

const initialPlatformData: PlatformData[] = [
  {
    name: "Perplexity",
    icon: MentionsPerplexity,
    mentions: 0,
    color: "bg-blue-500",
    key: "perplexity"
  },
  {
    name: "Open AI",
    icon: MentionsChatgpt1,
    mentions: 0,
    color: "bg-purple-500",
    key: "openai"
  },
  {
    name: "Gemini",
    icon: MentionsGemini,
    mentions: 0,
    color: "bg-orange-500",
    key: "gemini"
  },
]

export default function MentionBar() {
  const { queryID, competitorProductName } = useAuth();
  
  // Component state
  const [platformData, setPlatformData] = useState<PlatformData[]>(initialPlatformData)
  const [totalMentions, setTotalMentions] = useState(0)
  const [isAnimated, setIsAnimated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // API call function
  const fetchMentionData = useCallback(async () => {
    if (!queryID || !competitorProductName) {
      console.log('❌ MentionBar: Missing required parameters');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🚀 MentionBar: Fetching mention data');
      
      const response = await OptimizationAPI.productMatrices(queryID, competitorProductName);
      console.log('📡MentionBar comaprsion: API Response', response);

      if (response?.data && Array.isArray(response.data) && response.data.length > 0) {
        const productData = response.data[0];
        
        // Validate data structure
        if (!productData.mentions_by_platform) {
          throw new Error('mentions_by_platform not found in response');
        }

        const mentionsByPlatform = productData.mentions_by_platform;
        const total = productData.total_mentions ?? 0;

        console.log('📊 MentionBar: Processing data', {
          mentionsByPlatform,
          totalMentions: total
        });

        // Update platform data with API values
        const updatedPlatformData = initialPlatformData.map(platform => ({
          ...platform,
          mentions: mentionsByPlatform[platform.key] ?? 0
        }));

        console.log('✅ MentionBar: Data processed', updatedPlatformData);

        // Update state
        setPlatformData(updatedPlatformData);
        setTotalMentions(total);
        setLastUpdated(new Date());
        
        // Trigger animation after data is set
        setTimeout(() => setIsAnimated(true), 100);

      } else {
        throw new Error('Invalid or empty response data');
      }
    } catch (err) {
      console.error('❌ MentionBar: API Error', err);
      const message = err instanceof Error ? err.message : "Failed to load mention data";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [queryID, competitorProductName]);

  // Manual retry function
  const handleRetry = useCallback(() => {
    setIsAnimated(false); // Reset animation
    fetchMentionData();
  }, [fetchMentionData]);

  // Initial data fetch
  useEffect(() => {
    fetchMentionData();
  }, [queryID, competitorProductName]); // Don't include fetchMentionData to avoid infinite loop

  // Loading state
  if (isLoading && totalMentions === 0) {
    return (
      <Card className="p-6 bg-white shadow-sm border border-gray-200 rounded-2xl h-full">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-sm text-gray-600">Loading mention data...</p>
          </div>
        </div>
      </Card>
    );
  }

  // Error state
  if (error && totalMentions === 0) {
    return (
      <Card className="p-6 bg-white shadow-sm border border-gray-200 rounded-2xl h-full">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              <p className="font-medium">Error loading mentions</p>
              <p className="text-sm">{error}</p>
            </div>
            <Button onClick={handleRetry} className="bg-red-600 hover:bg-red-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white shadow-sm border border-gray-200 rounded-2xl h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold text-gray-900">Mentions</h2>
          {isLoading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="text-sm bg-transparent cursor-not-allowed">
            <Calendar className="w-4 h-4 mr-2" />
            Jan 2024 - Dec 2024
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRetry}
            disabled={isLoading}
            className="hover:bg-gray-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Status indicator */}
      {lastUpdated && (
        <div className="mb-2 text-xs text-gray-400">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}

      {/* Error banner (if error but we have cached data) */}
      {error && totalMentions > 0 && (
        <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700">
          ⚠️ {error} (showing cached data)
        </div>
      )}

      {/* Total Mentions */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <div 
          className="text-5xl font-bold text-gray-900 mb-2 transition-all duration-700 ease-out"
          style={{
            opacity: isAnimated ? 1 : 0,
            transform: isAnimated ? "scale(1)" : "scale(0.8)",
          }}
        >
          {totalMentions}
        </div>
        <div 
          className="text-gray-600 font-medium transition-opacity duration-700 ease-out"
          style={{
            opacity: isAnimated ? 1 : 0,
            transitionDelay: "200ms",
          }}
        >
          Total Mentions across platforms
        </div>
      </div>

      {/* Platform List */}
      <div className="space-y-5">
        {platformData.map((platform, index) => {
          const progressPercent = totalMentions > 0 ? (platform.mentions / totalMentions) * 100 : 0;
          return (
            <div key={platform.key} className="flex items-center gap-4">
              {/* Platform Icon */}
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-700 ease-out"
                style={{
                  opacity: isAnimated ? 1 : 0,
                  transform: isAnimated ? "translateX(0)" : "translateX(-20px)",
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <img 
                  src={platform.icon} 
                  alt={platform.name} 
                  className="w-full h-full object-contain" 
                />
              </div>

              {/* Platform Name */}
              <div 
                className="w-20 text-sm font-normal text-gray-900 transition-all duration-500 ease-out"
                style={{
                  opacity: isAnimated ? 1 : 0,
                  transitionDelay: `${index * 150 + 100}ms`,
                }}
              >
                {platform.name}
              </div>

              {/* Progress Bar */}
              <div className="flex-1 mx-4">
                <div className="w-full bg-[#ECE0FF] rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${platform.color} transition-all duration-1000 ease-out`}
                    style={{
                      width: isAnimated ? `${progressPercent}%` : "0%",
                      transitionDelay: `${index * 150 + 200}ms`,
                      opacity: isAnimated ? 1 : 0.8,
                    }}
                  />
                </div>
              </div>

              {/* Mentions Count */}
              <div 
                className="text-[14px] font-normal text-[#1D1D1D] w-8 text-right transition-opacity duration-500"
                style={{
                  opacity: isAnimated ? 1 : 0,
                  transitionDelay: `${index * 150 + 800}ms`,
                }}
              >
                {platform.mentions}
              </div>
            </div>
          )
        })}
      </div>

      {/* Debug info - remove in production */}
      {/* {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-2 bg-gray-100 rounded text-xs text-gray-600">
          <div>Query ID: {queryID || 'Not set'}</div>
          <div>Competitor: {competitorProductName || 'Not set'}</div>
          <div>Total API Mentions: {totalMentions}</div>
          <div>Platform breakdown: {platformData.map(p => `${p.name}: ${p.mentions}`).join(', ')}</div>
        </div>
      )} */}
    </Card>
  )
}