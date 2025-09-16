import { Shield, AlertCircle, Sparkles } from "lucide-react";

export default function MainHistoryPopup() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 max-w-md w-full mx-auto relative">
        {/* Shield Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Shield className="w-16 h-16 text-purple-600 fill-purple-100" />
            <AlertCircle className="w-6 h-6 text-purple-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl font-bold text-purple-600 text-center mb-4">Oops!</h1>

        {/* Subtitle */}
        <p className="text-purple-600 text-center mb-6 font-medium">
          We may see that currently your brand/product isn't visible.
        </p>

        {/* Explanation Section */}
        <div className="mb-8">
          <p className="text-gray-800 font-medium mb-3">This might be possible due to:</p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-gray-700 text-sm">Your Visibility on LLM may not be good enough.</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-gray-700 text-sm">You might require SEO Ranking on various LLM.</span>
            </li>
          </ul>
        </div>

        {/* Bottom Purple Section */}
        <div className="bg-purple-600 rounded-xl p-6">
          <div className="flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5 mr-2" style={{ color: "#fde047" }} />
            <span className="font-semibold" style={{ color: "#fde047" }}>
              Optimization
            </span>
            <span className="ml-1 font-semibold text-white">
              feature is Coming Soon!
            </span>
          </div>

          <p className="font-semibold text-center mb-3 text-white">
            But, Don't Worry! You have arrived at the right place!
          </p>

          <p className="text-sm text-center leading-relaxed text-white opacity-95">
            Our Optimization feature will enable the brands to Rank their products/services and increase the Visibilities
            and Mention among different LLMs
          </p>
        </div>
      </div>
    </div>
  );
}
