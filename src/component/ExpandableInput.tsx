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