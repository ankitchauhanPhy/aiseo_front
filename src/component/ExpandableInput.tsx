import React, { useState, useEffect, useRef } from "react";
import { SendHorizonal } from "lucide-react";

interface ExpandableInputProps {
  onSend: (text: string) => void;
}

 const ExpandableInput: React.FC<ExpandableInputProps> = ({
  onSend,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (expanded && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [expanded]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleSend = () => {
    if (value.trim()) {
      onSend(value.trim());
      setValue("");
      setExpanded(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFocus = () => {
    if (!expanded) {
      setExpanded(true);
    }
  };

  const handleBlur = () => {
    if (!value.trim()) {
      setExpanded(false);
    }
  };

  return (
    <div className="flex justify-center w-full p-4">
      <div
        className="flex items-end rounded-2xl border-1 border-[#7C3BED] bg-white shadow-xl hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden"
        style={{
          width: expanded ? "80%" : "40%",
          minHeight: "48px",
        }}
      >
        <div className="flex-1 flex flex-col">
          <textarea
            ref={textareaRef}
            placeholder={expanded ? "Type your message here... (Press Enter to send, Shift+Enter for new line)" : "Ask anything..."}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="flex-1 px-4 py-3 outline-none bg-transparent text-sm text-gray-800 placeholder-gray-400 resize-none leading-relaxed"
            style={{
              minHeight: expanded ? "60px" : "48px",
              maxHeight: "200px",
              transition: "all 0.2s ease",
            }}
            rows={expanded ? 3 : 1}
          />
        </div>
        
        <button
          onClick={handleSend}
          disabled={!value.trim()}
          className={`flex items-center justify-center p-2.5 rounded-xl m-2 transition-all duration-200 transform hover:scale-105 active:scale-95 ${
            value.trim() 
              ? 'bg-purple-600 hover:bg-purple-700 shadow-md' 
              : 'bg-gray-200 cursor-not-allowed'
          }`}
        >
          <SendHorizonal 
            className={`w-4 h-4 transition-colors duration-200 ${
              value.trim() ? 'text-white' : 'text-gray-400'
            }`} 
          />
        </button>
      </div>
    </div>
  );
};

export default ExpandableInput;




// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { SendHorizonal } from "lucide-react";
// import { motion } from "framer-motion";

// interface ExpandableInputProps {
//   onSend: (text: string) => void;
// }

// const ExpandableInput: React.FC<ExpandableInputProps> = ({
//   onSend,
// }) => {
//   const [expanded, setExpanded] = useState(false);
//   const [value, setValue] = useState("");
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   useEffect(() => {
//     if (expanded && inputRef.current) inputRef.current.focus();
//   }, [expanded]);

//   const handleSend = () => {
//     if (value.trim()) {
//       onSend(value.trim());
//       setValue("");
//     }
//   };

//   return (
//     <div className="flex justify-center w-full">
//       <motion.div
//         layout
//         transition={{ type: "spring", stiffness: 300, damping: 25 }}
//         className="flex items-center rounded-full border border-gray-300 bg-white overflow-hidden"
//         style={{
//           width: expanded ? "100%" : "40%", // 40% before click, 100% after click
//           padding: expanded ? "0.25rem 0.5rem" : "0.25rem",
//         }}
//         onClick={() => !expanded && setExpanded(true)}
//       >
//         <input
//           ref={inputRef}
//           type="text"
//           placeholder="Write something..."
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           className="flex-1 px-3 py-2 outline-none bg-transparent text-sm text-gray-800"
//           style={{
//             opacity: expanded ? 1 : 0.7,
//             width: "100%",
//           }}
//         />
//         <button
//           onClick={handleSend}
//           className="flex items-center justify-center p-2 rounded-full ml-1"
//           style={{ backgroundColor: "#7C3BED" }}
//         >
//           <SendHorizonal className="text-white w-4 h-4" />
//         </button>
//       </motion.div>
//     </div>
//   );
// };

// export default ExpandableInput;




// import { useState, useEffect } from 'react';
// import { ChevronRight, MessageCircle, X } from 'lucide-react';

// const ExpandableInput = ({ 
//   inputValue , 
//   setInputValue, 
//   handleSend, 
//   loading = false,
//   placeholder = "Write anything..." 
// }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const handleExpand = () => {
//     setIsExpanded(true);
//   };

//   const handleCollapse = () => {
//     setIsExpanded(false);
//   };

//   const onSend = () => {
//     if (inputValue && !loading) {
//       handleSend();
//       setIsExpanded(false);
//     }
//   };

//   // Auto-collapse when input is cleared externally
//   useEffect(() => {
//     if (!inputValue) {
//       setIsExpanded(false);
//     }
//   }, [inputValue]);

//   return (
//     <>
//       {!isExpanded ? (
//         // Collapsed state - compact button (replaces your input-box)
//         <div className="input-box p-6 flex-shrink-0 flex justify-center">
//           <button
//             onClick={handleExpand}
//             disabled={loading}
//             className={`flex items-center gap-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-full px-6 py-3 shadow-lg transition-all duration-200 hover:shadow-xl group ${
//               loading && "cursor-not-allowed opacity-75"
//             }`}
//           >
//             <MessageCircle className="w-5 h-5 text-[#7C3BED]" />
//             <span className="text-[#7C7C7C] font-medium">{placeholder}</span>
//             <ChevronRight className="w-5 h-5 text-[#7C7C7C] group-hover:text-[#7C3BED] transition-colors" />
//           </button>
//         </div>
//       ) : (
//         // Expanded state - your original input design enhanced
//         <div className={`input-box p-6 flex-shrink-0 ${loading && "cursor-not-allowed"}`}>
//           <div className="bg-[#D9D9D9] rounded-lg p-3 flex flex-col relative">
//             {/* Close button */}
//             <button
//               onClick={handleCollapse}
//               className="absolute top-2 right-2 p-1 hover:bg-gray-300 rounded-full transition-colors z-10"
//               disabled={loading}
//             >
//               <X className="w-4 h-4 text-[#7C7C7C]" />
//             </button>
            
//             <textarea
//               placeholder={placeholder}
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               className="flex-1 bg-transparent text-[#7C7C7C] placeholder-gray-600 outline-none w-full resize-none min-h-[80px] pr-8"
//               autoFocus
//               disabled={loading}
//             />
            
//             <div className="flex justify-between items-center mt-3">
//               <div className="text-xs text-[#7C7C7C]">
//                 {inputValue.length > 0 && `${inputValue.length} characters`}
//               </div>
              
//               <div className="flex justify-end gap-3">
//                 <button
//                   className="px-3 py-1 text-[#7C7C7C] hover:text-[#1E2749] text-sm font-medium transition-colors"
//                   onClick={handleCollapse}
//                   disabled={loading}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   className={`p-2 bg-white text-[#1E2749] rounded-full hover:bg-gray-100 transition-all duration-200 ${
//                     (!inputValue || loading) ? "cursor-not-allowed opacity-50" : "hover:shadow-md"
//                   }`}
//                   onClick={onSend}
//                   disabled={loading || !inputValue}
//                 >
//                   {loading ? (
//                     <div className="w-6 h-6 border-2 border-[#1E2749] border-t-transparent rounded-full animate-spin"></div>
//                   ) : (
//                     <ChevronRight className='w-6 h-6' />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ExpandableInput;