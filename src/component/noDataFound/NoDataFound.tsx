import { Database } from 'lucide-react';

export default function NoDataFound() {


  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Animated Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl  p-8 text-center border border-white/20 hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
          
          {/* Animated Icon Container */}
          <div className="relative mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Database className="w-12 h-12 text-white" />
            </div>
            
            {/* Floating particles */}
            {/* <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            <div className="absolute -bottom-1 -left-2 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
            <div className="absolute top-4 -left-4 w-2 h-2 bg-green-400 rounded-full animate-bounce delay-300"></div> */}
          </div>

          {/* Main Content */}
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              No Data Found
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}