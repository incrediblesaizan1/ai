import React, { useState } from 'react';
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiClipboard, FiCheck } from "react-icons/fi"; 

interface Props {
  promptResponse: string;
}

const AppendResponse = ({ promptResponse }: Props) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="prose prose-invert max-w-full h-full markdown-body">
      {promptResponse ? (
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const codeText = String(children).replace(/\n$/, "");

              return match ? (
                <div className="relative">
                  <button
                    onClick={() => handleCopy(codeText)}
                    className="absolute top-2 right-2 bg-gray-700 text-white p-1 rounded opacity-100 cursor-pointer transition"
                  >
                    {copiedCode === codeText ? <FiCheck /> : <FiClipboard />}
                  </button>

                  <SyntaxHighlighter
                    style={dracula}
                    className="custom-scrollbar3"
                    language={match[1]}
                    PreTag="div"
                  >
                    {codeText}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {promptResponse}
        </ReactMarkdown>
      ) : null}
    </div>
  );
};

export default AppendResponse;
