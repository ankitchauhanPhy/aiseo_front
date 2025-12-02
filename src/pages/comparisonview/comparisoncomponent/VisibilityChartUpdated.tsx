import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Maximize2 } from "lucide-react"
import BarMainUpdated from "@/pages/chart/BarMainUpdated"

interface VisibilityProps {
  setOpenVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setVisibilityData: React.Dispatch<React.SetStateAction<string>>;
}
const VisibilityChartUpdated: React.FC<VisibilityProps> = ({ setOpenVisibility, setVisibilityData }) => {

  return (
    <Card className="w-full bg-white relative lg:h-[40%] h-[50%]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900">Competitor Visibility</CardTitle>
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




