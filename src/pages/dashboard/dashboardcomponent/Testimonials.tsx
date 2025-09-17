import TestimonialRocket from "../../../assets/Testimonial-Rocket.png";
import TestimonialRocketBg from "../../../assets/TestimonialRocket-bg.png"
import TestimonialContentBg from "../../../assets/TestimoniaContent-bg.png"

const LandingPage = () => {
  return (
    <div className="w-full">
      {/* ================= Rocket Section ================= */}

      <div className="w-full py-20 px-6"
        style={{
          backgroundImage: `url(${TestimonialContentBg}), url(${TestimonialRocketBg})`,
          backgroundPosition: "left top, right bottom",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundSize: "auto, auto",
        }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">

          {/* Left */}
          <div className="p-6 rounded-2xl bg-no-repeat bg-cover bg-left-top flex flex-col items-start justify-start gap-6">
            <div className="inline-block rounded-full bg-[#311267] px-4 py-1 text-sm mb-4 text-white">
              🚀 Why It Matters
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Win the New  <br /> Search Game
            </h3>
            <p className="text-gray-800 leading-relaxed">
              Traditional SEO no longer guarantees visibility. AI-powered answer engines are now the starting point for billions of searches every day. If your brand isn’t showing up in these AI-generated results, you’re invisible when customers are asking questions, comparing products, and making buying decisions.<br/>
              <span className="relative font-bold before:content-['•'] before:mr-2 before:font-bold">Be discovered</span> where purchase decisions happen.<br/>
              <span className="relative font-bold before:content-['•'] before:mr-2 before:font-bold">Protect your reputation</span> in AI-driven answers.<br/>
              <span className="relative font-bold before:content-['•'] before:mr-2 before:font-bold">Stay ahead of competitors</span> with faster insights
            </p>
          </div>

          {/* Right */}
          <div className="flex justify-center  p-6 rounded-2xl ">
            <img
              src={TestimonialRocket}
              alt="Rocket"
              className="w-72 md:w-96"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
