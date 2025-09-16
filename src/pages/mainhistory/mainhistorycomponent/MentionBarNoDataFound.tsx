
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
                        No Data Found!
                    </h3>

                    <p className="text-gray-500 mb-2">
                        You may still click on other competitors and view their Analytics
                    </p>

                    <p className="text-gray-500 font-semibold">
                        <span className="text-[#7C3BED]">Good News:</span> Optimization is
                        coming soon which will increase your visibility
                    </p>
                </div>
            </div>
        </>
    )
}

export default MentionBarNoDataFound;




