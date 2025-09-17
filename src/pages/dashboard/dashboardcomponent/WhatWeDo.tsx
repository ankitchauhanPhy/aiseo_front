import VisibilityBar from "../../../assets/VisibilityBar.png";
import Mentions from "../../../assets/Mentions.png";
import RankGapLeader from "../../../assets/RankGapLeader.png";
import WhatweDoBar from "../../../assets/WhatweDoBar.png";
import WhatweDoA from "../../../assets/WhatweDoA.png";
import WhatweDoBulb from "../../../assets/WhatweDoBulb.png";

const WhatWeDo = () => {
  return (
    <section className="relative bg-gradient-to-b from-white to-purple-50 py-20 px-6 md:px-16 ">
      <div className="absolute inset-y-0 left-0 flex justify-start overflow-hidden w-full lg:w-1/2 z-0">
        <div className="relative -ml-75 top-40">
          {/* Ring 1 - Outermost */}
          <div className="absolute w-[600px] h-[600px] border-2 border-purple-300 rounded-full opacity-60"></div>

          {/* Ring 2 */}
          <div className="absolute w-[500px] h-[500px] border-2 border-purple-300 rounded-full opacity-60 top-12 left-12"></div>

          {/* Ring 3 */}
          <div className="absolute w-[400px] h-[400px] border-2 border-purple-300 rounded-full opacity-70 top-24 left-24"></div>

          {/* Ring 4 */}
          <div className="absolute w-[300px] h-[300px] border-2 border-purple-300 rounded-full opacity-70 top-36 left-36"></div>

          {/* Ring 5 */}
          <div className="absolute w-[200px] h-[200px] border-2 border-purple-300 rounded-full opacity-80 top-48 left-48"></div>

          {/* Ring 6 - Innermost */}
          <div className="absolute w-[100px] h-[100px] border-2 border-purple-300 rounded-full opacity-90 top-60 left-60"></div>
        </div>
      </div>

      {/* Rings on Bottom-Center */}
      <div className="absolute -bottom-140 left-[40%] -translate-x-1/2 z-0 w-[600px] h-[600px]">
        <div className="relative flex items-center justify-center">
          {/* Ring 1 - Outermost*/}
          <div className="absolute w-[600px] h-[600px] border-2 border-purple-300 rounded-full opacity-60"></div>
          {/* Ring 2 */}
          <div className="absolute w-[520px] h-[520px] border-2 border-purple-300 rounded-full opacity-60"></div>
          {/* Ring 3 */}
          <div className="absolute w-[440px] h-[440px] border-2 border-purple-300 rounded-full opacity-70"></div>
          {/* Ring 4 */}
          <div className="absolute w-[360px] h-[360px] border-2 border-purple-300 rounded-full opacity-70"></div>
          {/* Ring 5 */}
          <div className="absolute w-[280px] h-[280px] border-2 border-purple-300 rounded-full opacity-80"></div>
          {/* Ring 6 */}
          <div className="absolute w-[200px] h-[200px] border-2 border-purple-300 rounded-full opacity-90"></div>
        </div>
      </div>


      <div className="relative z-10 max-w-full mx-auto flex flex-col items-center text-center gap-6">
        {/* Section Label */}
        <span className="bg-[#311267] text-white px-8 py-4 rounded-full text-sm font-medium mb-4">
          ✨  What we Offer - The Features
        </span>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#311267]">The AI SEO Platform for Forward-Thinking Brands</h2>

        <div className="flex flex-col lg:flex-row my-16 w-full gap-6 items-start">

          {/* Left Column: Big Number */}
          <div className="hidden flex flex-col justify-between h-full text-left w-[300px]">
            
            <div className="flex items-start gap-2">
              <span className="text-8xl md:text-9xl font-bold text-black leading-none">13</span>
              <span className="text-3xl md:text-4xl font-bold text-black mt-2 lg:mt-[75px]">m+</span>
            </div>

           
            <p className="text-xl md:text-[28px] font-bold text-[#1A1A1A] mt-8 text-star">
              <span className="block mb-2">Total Revenue</span>
              <span className="block">Increased this in Year <span className="font-extrabold">2025</span></span>
            </p>
          </div>


          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Paragraph above feature cards */}
            <p className="text-gray-600 text-lg mb-4">
            We make AI visibility measurable and actionable. Our platform gives you one place to:
            </p>

            {/* Feature Cards */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-6">
              {/* Card 1 */}
              <div className="flex-1 bg-white shadow-md rounded-xl p-6 text-center">
                <img src={WhatweDoBar} alt="WhatWeDoBar" className="mx-auto text-cyan-500 mb-4"/>
                <h3 className="font-semibold">Track Rankings & Visibility</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Know exactly where your brand.
                </p>
              </div>

              {/* Card 2 */}
              <div className="flex-1 bg-white shadow-md rounded-xl p-6 text-center">
                 <img src={WhatweDoA} alt="WhatWeDoA" className="mx-auto text-cyan-500 mb-4"/>
                <h3 className="font-semibold">Monitor Mentions & Citations</h3>
                <p className="text-sm text-gray-500 mt-2">
                  See when and how your brand is refrenced.
                </p>
              </div>

              {/* Card 3 */}
              <div className="flex-1 bg-white shadow-md rounded-xl p-6 text-center">
                 <img src={WhatweDoBulb} alt="WhatWeDoBulb" className="mx-auto text-cyan-500 mb-4"/>
                <h3 className="font-semibold">Benchmark Against Competitors</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Understand your position and identify growth opportunities.
                </p>
              </div>

              {/* Card 4 */}
              <div className="flex-1 bg-white shadow-md rounded-xl p-6 text-center">
                 <img src={WhatweDoBar} alt="WhatWeDoBulb" className="mx-auto text-cyan-500 mb-4"/>
                <h3 className="font-semibold">Get Actionable Recommendations</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Clear steps to improve your visibility and influence.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full flex flex-col items-center justify-center gap-2">
          {/* Left side (2 cols stacked in small, side-by-side in lg) */}
          <div className="flex flex-col lg:flex-row gap-2  max-w-[879px]">
            <img
              src={VisibilityBar}
              alt="VisibilityBar"
              //className="rounded-lg object-cover lg:w-full lg:h-full"
               className="w-full h-auto rounded-lg object-cover md:h-[290px]"
            />
            <img
              src={Mentions}
              alt="Mentions"
              //className="rounded-lg object-cover lg:w-full lg:h-full"
              className="w-full  h-auto rounded-lg object-cover md:h-[290px]"
            />
          </div>


          {/* Right side (full width in small, side in lg) */}

          <img src={RankGapLeader} alt="RankGapLeader" 
          //className="rounded-lg object-cover lg:w-[879px] lg:h-[290px]" 
          className="w-full lg:max-w-[879px] h-auto rounded-lg object-cover md:h-[290px]"/>

        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
