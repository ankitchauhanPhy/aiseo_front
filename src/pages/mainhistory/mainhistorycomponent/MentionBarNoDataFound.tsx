
import Vector from "../../../assets/mainHistory/Vector.svg";

const MentionBarNoDataFound: React.FC = () => {

    return (
        <>
              <div className="relative bg-gray-50 rounded-lg border border-gray-200 p-6 h-full flex flex-col">
                {/* Left Heading at top-left */}
                <h2 className="text-[24px] font-medium text-[#1A1A1A] absolute top-6 left-6">
                    Mentions
                </h2>

                {/* Center Card Content */}
                <div className="flex flex-col items-center justify-center text-center flex-1">
                     <img src={Vector} alt="No Data" className="w-12 h-12 mb-4" />

                    <h3 className="text-[#7C3BED] font-semibold text-lg mb-2">
                        Nothing to see here… yet.​
                    </h3>

                    <p className="text-gray-500 mb-2">
                        We didn’t find data for this query - but your competitors are already showing up.​
                    </p>

                    <p className="text-gray-500 font-semibold">
                     Explore their analytics to see what’s working for them.​
And when you’re ready, we’ll help you turn “no data” into visibility.​
                    </p>
                </div>
            </div>
        </>
    )
}

export default MentionBarNoDataFound;




