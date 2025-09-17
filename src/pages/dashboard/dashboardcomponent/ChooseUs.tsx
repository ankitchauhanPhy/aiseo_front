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
              Trusted Expertise. Proven Vision.
            </h2>
            <p className="text-gray-300 text-sm md:text-base max-w-md">
              We're not just another SEO tool. Our team combines.
            </p>
          </div>

          {/* Right Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Box 1 */}
            <div className="bg-[#3a1570] rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold">Oxford AI Credentials</h3>
              <p className="text-gray-400 text-sm mt-2">
                Built out of Oxford University’s AI program, our foundation is rooted in research and innovation.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-[#3a1570] rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold">Industry Experience</h3>
              <p className="text-gray-400 text-sm mt-2">
                20+ years in digital marketing and e-commerce, guiding global brands and fast-growth startups.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-[#3a1570] rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold">Proven Growth Track Record</h3>
              <p className="text-gray-400 text-sm mt-2">
               From scaling online revenues to delivering AI transformation projects, we know how to turn vision into measurable results.
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-[#3a1570] rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold">Enterprise-Ready Platform</h3>
              <p className="text-gray-400 text-sm mt-2">
                Secure login, structured insights, and a roadmap designed for serious brands.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}