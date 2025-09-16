import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Maximize2 } from "lucide-react"

import MainHistoryVisibilityLogo1 from "../../../assets/mainHistory/MainHistoryVisibilityLogo1.svg"
import MainHistoryVisibilityLogo2 from "../../../assets/mainHistory/MainHistoryVisibilityLogo2.svg"
import MainHistoryVisibilityLogo3 from "../../../assets/mainHistory/MainHistoryVisibilityLogo3.svg"
import MainHistoryVisibilityLogo4 from "../../../assets/mainHistory/MainHistoryVisibilityLogo4.svg"
import { useEffect, useState } from "react"



const data = [
  {
    name: "Metric 1",
    value: 102000,
    displayValue: "102k",
    color: "bg-blue-500",
    // icon: Search,
    icon: `${MainHistoryVisibilityLogo1}`,
    width: "41%", // 102k out of 250k max
  },
  {
    name: "Metric 2",
    value: 136200,
    displayValue: "136.2k",
    color: "bg-pink-500",
    // icon: Zap,
    icon: `${MainHistoryVisibilityLogo2}`,
    width: "54%", // 136.2k out of 250k max
  },
  {
    name: "Metric 3",
    value: 44000,
    displayValue: "44k",
    color: "bg-purple-500",
    // icon: Zap,
    icon: `${MainHistoryVisibilityLogo3}`,
    width: "18%", // 44k out of 250k max
  },
  {
    name: "Metric 4",
    value: 132500,
    displayValue: "132.5k",
    color: "bg-orange-500",
    // icon: Star,
    icon: `${MainHistoryVisibilityLogo4}`,
    width: "53%", // 132.5k out of 250k max
  },
]

export default function VisibilityChart() {
  const [isAnimated, setIsAnimated] = useState(false)


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="w-full  bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900">Visibility</CardTitle>
          <div className="flex items-center gap-2 ">
            <Button variant="outline" size="sm" className="text-sm bg-transparent cursor-not-allowed">
              <Calendar className="w-4 h-4 mr-2" />
              Jan 2024 - Dec 2024
            </Button>
            <Button variant="outline" size="sm" className="cursor-not-allowed" >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {/* Chart bars */}
          <div className="space-y-2 relative ">
            <div className="absolute inset-0 flex justify-between px-11 pointer-events-none">
              <div className="w-px h-full bg-[#BC95FF]"></div>
              <div className="w-px h-full bg-[#BC95FF]"></div>
              <div className="w-px h-full bg-[#BC95FF]"></div>
              <div className="w-px h-full bg-[#BC95FF]"></div>
              <div className="w-px h-full bg-[#BC95FF]"></div>
              <div className="w-px h-full bg-[#BC95FF]"></div>
              <div className="w-px h-full bg-[#BC95FF]"></div>
            </div>

            {data.map((item, index) => {
              // const IconComponent = item.icon
              return (
                <div key={index} className="flex items-center relative z-10">
                  <div className="w-10 h-10  flex items-center justify-center flex-shrink-0 transition-all duration-700 ease-out"
                    style={{
                      opacity: isAnimated ? 1 : 0,
                      transform: isAnimated ? "translateX(0)" : "translateX(-20px)",
                      transitionDelay: `${index * 150}ms`,
                    }}
                  >
                    {/* <IconComponent className="w-4 h-4 text-white" /> */}
                    <img src={item.icon} alt={item.name} className="w-full h-full object-contain" />
                  </div>

                  {/* Bar container */}
                  <div className="flex-1 relative">
                    <div
                      className={`h-8 ${item.color} rounded-lg flex items-center justify-center px-3 text-white font-semibold text-sm transition-all duration-1000 ease-out transform`}
                      // style={{ width: item.width }}
                      style={{
                        width: isAnimated ? item.width : "0%",
                        transitionDelay: `${index * 150 + 200}ms`,
                        opacity: isAnimated ? 1 : 0.8,
                      }}
                    >
                      <span className="transition-opacity duration-500"
                      style={{
                        opacity: isAnimated ? 1 : 0,
                          transitionDelay: `${index * 150 + 800}ms`,
                      }}
                      >
                        {item.displayValue}</span>
                      {/* <div className="w-4 h-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Info className="w-3 h-3 text-white" />
                      </div> */}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between text-xs text-gray-500  px-11">
            <span>0K</span>
            <span>25K</span>
            <span>50K</span>
            <span>100K</span>
            <span>150K</span>
            <span>200K</span>
            <span>250K</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


