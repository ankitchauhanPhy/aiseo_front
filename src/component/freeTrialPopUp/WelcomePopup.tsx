import { ArrowRight, Eye, TrendingUp, Users } from 'lucide-react';

interface WelcomePopupProps {
  onGoToDashboard: () => void;
  onClose?: () => void;
}

export const WelcomePopup: React.FC<WelcomePopupProps> = ({ onGoToDashboard}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

      {/* Overlay with blur */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto relative">
        
        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#A270F5] to-[#7C3BED] rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to Your AI SEO Dashboard
            </h2>
            <p className="text-[#A270F5] font-medium">
              You're all set! Your free trial has started.
            </p>
          </div>
 
          {/* Body */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#A270F5]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Eye className="w-4 h-4 text-[#7C3BED]" />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Start tracking your brand's visibility across ChatGPT, Perplexity, and Google Gemini.
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#A270F5]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Users className="w-4 h-4 text-[#7C3BED]" />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Explore mentions, rankings, and competitor gaps — all from your secure dashboard.
              </p>
            </div>
          </div>
 
          {/* CTA Button */}
          <button
            onClick={onGoToDashboard}
            className="w-full bg-[#7C3BED] hover:bg-[#6B32D6] text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 group"
          >
            Go to My Dashboard
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};