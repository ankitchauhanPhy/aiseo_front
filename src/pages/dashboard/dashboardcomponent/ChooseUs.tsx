// import { Rocket } from "lucide-react";

import Rocket from "../../../assets/Vector.png";

export default function ChooseUs() {
  return (
    <>
      <section className="bg-[#2b0b5b] text-white py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* <Rocket size={28} className="text-purple-300" /> */}
              <img src={Rocket}  alt="Rocket"/>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Why Choose us?
            </h2>
            <p className="text-gray-300 text-sm md:text-base max-w-md">
              Dive deep into future technology concepts with our research section.
            </p>
          </div>

          {/* Right Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Box 1 */}
            <div className="bg-[#3a1570] rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold">13+ million revenue</h3>
              <p className="text-gray-400 text-sm mt-2">
                500+ research articles for in-depth understanding.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-[#3a1570] rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold">12x Visibility</h3>
              <p className="text-gray-400 text-sm mt-2">
                Visual aids and infographics to enhance comprehension.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-[#3a1570] rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold">x4 Mentions</h3>
              <p className="text-gray-400 text-sm mt-2">
                Explore emerging trends in future technology research.
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-[#3a1570] rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold">89.3L New Signup</h3>
              <p className="text-gray-400 text-sm mt-2">
                Contributions from tech researchers and academics.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}