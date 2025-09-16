// src/components/LandingPage.tsx

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Eye,
  Gauge,
  MessageSquare,
  Brain,
  Settings,
} from "lucide-react";
import { RiDoubleQuotesR } from "react-icons/ri";
import TestimonialRocket from "../../../assets/Testimonial-Rocket.png";
import TestimonialRocketBg from "../../../assets/TestimonialRocket-bg.png"
import TestimonialContentBg from "../../../assets/TestimoniaContent-bg.png"

const LandingPage = () => {
  // --- Testimonials Slider ---
  const [index, setIndex] = useState(0);

  const testimonials = [
    {
      name: "Cameron Williamson",
      role: "Web Designer",
      text: "Rerum ipsum dolor sit amet consectetur. Ac quam sem mi nibh volutpat enim pellentesque. Proin iaculis nisi et neque sed fermentum sollicitudin lectus.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Esther Howard",
      role: "Web Developer",
      text: "At viverra enim enim sed turpis orci cursus. Imperdiet eros mauris sed sodales nisi interdum eu. Eu congue quis egestas donec lectus.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Jenny Wilson",
      role: "UI/UX Designer",
      text: "Sed ut diam amet accumsan in. Elementum lorem aliquam venenatis amet sit posuere sed sit. Aliquet suspendisse vitae placerat donec.",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // --- Ranking Analysis ---
  const features = [
    {
      icon: <BarChart3 className="w-8 h-8 text-[#311267]" />,
      title: "Track Rankings",
      desc: "Know Ranking of your product across different LLMs. Get your product Ranking on every LLM and Overall Product Ranking.",
    },
    {
      icon: <Eye className="w-8 h-8 text-[#311267]" />,
      title: "Visibility Score",
      desc: "Understand where your brand stands in the AI ecosystem and enhance your presence on emerging platforms.",
    },
    {
      icon: <Gauge className="w-8 h-8 text-[#311267]" />,
      title: "Performance Dashboard",
      desc: "Gain real-time insights into your brand’s visibility across AI Answer Engines like ChatGPT and Google Gemini.",
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-[#311267]" />,
      title: "Sentiment Analysis",
      desc: "Monitor and improve how your brand is perceived in AI-generated responses.",
    },
    {
      icon: <Brain className="w-8 h-8 text-[#311267]" />,
      title: "Analyze AI Responses",
      desc: "Understand what AI is saying about your brand and topics.",
    },
    {
      icon: <Settings className="w-8 h-8 text-[#311267]" />,
      title: "Optimization Hub Score",
      desc: "Identify opportunities and actionable recommendations to take control of your brand’s AI narrative.",
    },
  ];

  return (
    <div className="w-full">
      {/* ================= Testimonials Section ================= */}
      <div className="w-full bg-white py-16 px-6 text-center">
        {/* Tag */}
        <div className="inline-block rounded-full bg-[#311267] px-4 py-1 text-sm mb-4 text-white">
          ✨ Testimonials
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#311267]">
          What our users say
        </h2>
        <p className="text-[#1D1D1D] max-w-2xl mx-auto mb-10">
          Get your Product or Service Insights, Reports, Ranking and Visibility
          across different LLM’s along with Suggestion.
        </p>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[50px] max-w-6xl  mx-auto mb-8">
          {testimonials.map((t, i) => (
            <div key={i} className="relative flex justify-center">
              {/* Stand Under Card */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 lg:w-[390px] lg:h-[90px] bg-[linear-gradient(to_right,#8542EB,#8B52E5,#4263EC)] rounded-xl z-10"></div>
              {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6
                                lg:w-[390px] lg:h-[90px] 
                                rounded-xl z-10 
                                bg-[linear-gradient(to_bottom,rgba(65,98,236,1),rgba(65,98,236,0)),
                                    linear-gradient(to_bottom,rgba(133,65,235,1),rgba(133,65,235,0)),
                                    linear-gradient(to_bottom,rgba(165,80,226,1),rgba(165,80,226,0))] 
                                bg-[length:33.33%_100%] bg-[position:0_0,50%_0,100%_0] bg-no-repeat">
              </div> */}
              {/* Testimonial Card */}
              <div
                className={`bg-[#311267] text-white rounded-xl shadow-lg p-6 relative z-10 ${i === index ? "block" : "hidden md:block"
                  }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-sm"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold">{t.name}</h4>
                    <p className="text-sm text-[#8F9BB7]">{t.role}</p>
                  </div>
                </div>

                <RiDoubleQuotesR className="absolute top-4 right-4 text-white" size={50} />

                <p className="text-sm leading-relaxed">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Arrows */}
        <div className="flex justify-center gap-4 mt-20 mb-16">
          <button
            onClick={handlePrev}
            className="p-2 bg-[#311267] text-white hover:bg-purple-200 transition rounded-sm"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className="p-2  bg-[#311267] text-white hover:bg-purple-200 transition rounded-sm"
          >
            <ArrowRight />
          </button>
        </div>
      </div>



      



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
          <div className="p-6 rounded-2xl bg-no-repeat bg-cover bg-left-top">
            <div className="inline-block rounded-full bg-[#311267] px-4 py-1 text-sm mb-4 text-white">
              🚀 The Future of Search
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              The New Frontier for <br /> Organic Growth
            </h3>
            <p className="text-gray-600 leading-relaxed">
              LLM visibility is the new digital shelf where brands rush to get
              surfaced. AI Answer Engines are used by billions daily to shape
              perspectives, help make buying decisions and answer questions
              about your brand and industry.
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


      {/* ================= Ranking Analysis Section ================= */}
      <div className="w-full bg-white py-16 px-6 text-center">
        {/* Tag */}
        <div className="inline-block rounded-full bg-[#311267] px-4 py-1 text-sm mb-4 text-white">
          ✨ Features
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#311267]">
          Ranking Analysis
        </h2>
        <p className="text-[#1D1D1D] max-w-3xl mx-auto mb-12">
          Our AI Analyzes your product ranking on various LLM’s and give you
          detailed report, with suggestion to improve your visibility
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white border border-[#D9D9D9] shadow-md rounded-xl p-6 text-center hover:shadow-lg transition"
            >
              <div className="mb-4 flex justify-center">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-[#311267]">
                {f.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
