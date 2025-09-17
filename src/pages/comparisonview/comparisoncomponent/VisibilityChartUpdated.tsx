import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Maximize2 } from "lucide-react"
import MainHistoryVisibilityLogo1 from "../../../assets/mainHistory/MainHistoryVisibilityLogo1.svg"
import MainHistoryVisibilityLogo2 from "../../../assets/mainHistory/MainHistoryVisibilityLogo2.svg"
import MainHistoryVisibilityLogo3 from "../../../assets/mainHistory/MainHistoryVisibilityLogo3.svg"
import MainHistoryVisibilityLogo4 from "../../../assets/mainHistory/MainHistoryVisibilityLogo4.svg"
import { useEffect, useState } from "react"
import BarMain from "@/pages/chart/BarMain"
import BarMainUpdated from "@/pages/chart/BarMainUpdated"




interface VisibilityProps {
  setOpenVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setVisibilityData: React.Dispatch<React.SetStateAction<string>>;
}

// const data = [
//   {
//     name: "Perplexity",
//     value: 2,
//     displayValue: "2",
//     color: "bg-blue-500",
//     icon: `${MainHistoryVisibilityLogo1}`,
//   },
//   {
//     name: "Chat GPT",
//     value: 3,
//     displayValue: "3",
//     color: "bg-pink-500",
//     icon: `${MainHistoryVisibilityLogo2}`,
//   },
//   {
//     name: "Gemini",
//     value: 0,
//     displayValue: "0",
//     color: "bg-orange-500",
//     icon: `${MainHistoryVisibilityLogo4}`,
//   },
// ]



const VisibilityChartUpdated: React.FC<VisibilityProps> = ({ setOpenVisibility, setVisibilityData }) => {

  return (
    <Card className="w-full bg-white relative lg:h-[40%] h-[50%]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900">Visibilityss</CardTitle>
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
        <BarMainUpdated setOpenVisibility={setOpenVisibility} setVisibilityData={setVisibilityData}/>
      </CardContent>
    </Card>
  )
}

export default VisibilityChartUpdated;




