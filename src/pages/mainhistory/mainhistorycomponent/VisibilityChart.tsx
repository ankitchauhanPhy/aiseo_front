import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Maximize2 } from "lucide-react"

import MainHistoryVisibilityLogo1 from "../../../assets/mainHistory/MainHistoryVisibilityLogo1.svg"
import MainHistoryVisibilityLogo2 from "../../../assets/mainHistory/MainHistoryVisibilityLogo2.svg"
import MainHistoryVisibilityLogo4 from "../../../assets/mainHistory/MainHistoryVisibilityLogo4.svg"
import { useEffect, useState } from "react"

interface VisibilityProps {
  setOpenVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const data = [
  {
    name: "Perplexity",
    value: 2,
    displayValue: "2",
    color: "bg-blue-500",
    icon: `${MainHistoryVisibilityLogo1}`,
  },
  {
    name: "Chat GPT",
    value: 3,
    displayValue: "3",
    color: "bg-pink-500",
    icon: `${MainHistoryVisibilityLogo2}`,
  },
  {
    name: "Gemini",
    value: 0,
    displayValue: "0",
    color: "bg-orange-500",
    icon: `${MainHistoryVisibilityLogo4}`,
  },
]

// helper: parse displayValue -> number
const parseDisplayValue = (str: string): number => {
  if (!str) return 0;
  if (str.toLowerCase().includes("k")) {
    return parseFloat(str.replace("k", "")) * 1000;
  }
  if (str.toLowerCase().includes("m")) {
    return parseFloat(str.replace("m", "")) * 1000000;
  }
  return parseFloat(str);
};

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return num.toString();
};

const VisibilityChart: React.FC<VisibilityProps> = ({ setOpenVisibility }) => {
  const [isAnimated, setIsAnimated] = useState(false)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null)

  // numeric values
  const numericData = data.map(d => parseDisplayValue(d.displayValue) || d.value);
  const maxValue = Math.max(...numericData);

  // Labels -> 5 steps
  const steps = 5;
  const xLabels = Array.from({ length: steps + 1 }, (_, i) => (maxValue / steps) * i);
  console.log("xLabels", xLabels);

  // convert to percentage
  const getPercentage = (val: number) => (val / maxValue) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="w-full bg-white relative h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900">Visibility</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-sm bg-transparent cursor-not-allowed">
              <Calendar className="w-4 h-4 mr-2" />
              Jan 2024 - Dec 2024
            </Button>
            <Button variant="outline" size="sm" className="cursor-not-allowed">
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-1">
          <div className="space-y-3 relative">
            {/* Grid lines */}
            <div className="absolute inset-0 pointer-events-none">
              {xLabels.map((val, idx) => (
                <div
                  key={idx}
                  className="absolute top-0 bottom-0 w-px bg-[#BC95FF]"
                  style={{ left: `${getPercentage(val)}%` }}
                  />
                ))}
              </div>

              {/* Bars */}
              {data.map((item, index) => {
                const actualValue = parseDisplayValue(item.displayValue) || item.value;
                return (
                  <div key={index} className="flex items-center relative z-10">
                    {/* Icon */}
                    <div
                      className="w-10 h-10 flex items-center justify-center flex-shrink-0 transition-all duration-700 ease-out"
                      style={{
                        opacity: isAnimated ? 1 : 0,
                        transform: isAnimated ? "translateX(0)" : "translateX(-20px)",
                        transitionDelay: `${index * 150}ms`,
                      }}
                    > 
                      <img src={item.icon} alt={item.name} className="w-full h-full object-contain" />
                    </div>

                    {/* Bar */}
                    <div className="flex-1 relative">
                      <div
                        className={`h-8 ${item.color} rounded-lg flex items-center justify-center px-3 text-white font-semibold text-sm transition-all duration-1000 ease-out transform cursor-pointer`}
                        style={{
                          width: isAnimated ? `${getPercentage(actualValue)}%` : "0%",
                          transitionDelay: `${index * 150 + 200}ms`,
                          opacity: isAnimated ? 1 : 0.8,
                        }}
                        onClick={() => setOpenVisibility(true)}
                        onMouseEnter={(e) => {
                          const rect = (e.target as HTMLElement).getBoundingClientRect();
                          setTooltip({
                            x: rect.left + rect.width / 2,
                            y: rect.top - 10,
                            text: `${item.name}: ${formatNumber(actualValue)}`,
                          });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                      >
                        <span
                          className="transition-opacity duration-500"
                          style={{
                            opacity: isAnimated ? 1 : 0,
                            transitionDelay: `${index * 150 + 800}ms`,
                          }}
                        >
                          {item.displayValue}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

          {/* X-axis labels */}
          <div className="relative mt-2 h-4">
            {xLabels.map((val, i) => (
              <span
                key={i}
                className="absolute text-xs text-gray-500"
                style={{
                  left: `${getPercentage(val)}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {formatNumber(val)}
              </span>
            ))}
          </div>
        </div>
      </CardContent>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-md"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
            pointerEvents: "none",
            zIndex: 50,
          }}
        >
          {tooltip.text}
        </div>
      )}
    </Card>
  )
}

export default VisibilityChart;




