// import React from "react";
// import ReactMarkdown from "react-markdown";

// interface ChatMessageProps {
//   text: string;
// }

// const ChatMessage: React.FC<ChatMessageProps> = ({ text }) => {
//   return (
//     <div className="prose max-w-none">
//       <ReactMarkdown>{text}</ReactMarkdown>
//     </div>
//   );
// };

// export default ChatMessage;



import React from "react";
import ReactMarkdown from "react-markdown";
 
interface ChatMessageProps {
  text: string;
}
 
const ChatMessage: React.FC<ChatMessageProps> = ({ text }) => {
  return (
    <div className="prose max-w-none prose-headings:mt-6 prose-headings:mb-3 prose-p:mb-3 prose-ul:mb-3 prose-ol:mb-3">
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="mt-6 mb-3 text-2xl font-bold" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="mt-5 mb-2 text-xl font-semibold" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="mt-4 mb-2 text-lg font-semibold" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-3 leading-relaxed" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 mb-3 space-y-1" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 mb-3 space-y-1" {...props} />
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};
 
export default ChatMessage;

