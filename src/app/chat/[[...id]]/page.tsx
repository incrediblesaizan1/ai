"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { StepLoader } from "@/components/StepLoader";
import { Side } from "@/components/Side";
import { cn } from "@/lib/utils";
import { generateResponse } from "@/helpers/gemini.service";
import AppendResponse from "@/components/AppendResponse";
import Image from "next/image";
import { Spotlight } from "@/components/ui/spotlight-new";

type questions = {
  text: string;
  type: "incoming" | "outgoing";
};

const Page = () => {
  const params = useParams<{ id?: string[] }>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [questions, setQuestions] = useState<questions[]>([]);

  const fetchQuestion = async () => {
    setLoading(true);

    const data = await axios.get(`/api/getpost/${params.id?.[0]}`);
    setQuestions(() => [{ text: data.data.find.question, type: "outgoing" }]);
    setQuestions((prev) => [
      ...prev,
      { text: data.data.find.response, type: "incoming" },
    ]);
    setLoading(false);
  };

  const messageBox = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messageBox.current) {
      messageBox.current.scrollTo({
        top: messageBox.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const send = async () => {
    setLoading(true);
    setQuestions((prev) => [...prev, { text: message, type: "outgoing" }]);

    const response = await generateResponse(message);

    setQuestions((prev) => [...prev, { text: response, type: "incoming" }]);

    setLoading(false);
    scrollToBottom();
    await axios.post("/api/questions", {
      question: message,
      answer: response,
    });
    scrollToBottom();
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  if (loading) return <StepLoader loading={loading} />;

  return (
    <>
      <div className="relative z-10 w-[100vw] flex overflow-hidden h-screen">
        <Spotlight />
        <div className="absolute z-100">
          <Side newChatClick={() => {}} />
        </div>

        <div className="flex w-[98vw] md:w-full items-center pt-10 flex-col overflow-y-auto custom-scrollbar2 overflow-x-hidden">
          <div
            className={`
                                  "  h-[65vh] mx-auto mb-14",
                                  !inputDown && "hidden"
                                `}
          >
            <div
              className=" p-2 pb-40 overflow-y-auto custom-scrollbar3 h-[93vh] w-[99vw] md:w-full"
              ref={messageBox}
            >
              {questions.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-fit max-w-[100vw] md:max-w-[70vw] mb-6 lg:max-w-[52vw] p-2 mt-3 rounded-md mx-auto md:mx-0",
                    msg.type === "outgoing"
                      ? "bg-[#060b25] self-start font-serif "
                      : "bg-[#19191d99] self-start"
                  )}
                >
                  {msg.type === "incoming" ? (
                    <AppendResponse promptResponse={msg.text} />
                  ) : (
                    msg.text
                  )}
                </div>
              ))}
            </div>
          </div>

          <div
            className={` mt-10  z-50 bg-[#0a0a11] "fixed -bottom-3"  rounded-2xl  pr-12 p-1 relative`}
          >
            {message.trim() !== "" && (
              <button onClick={() => (send(), setMessage(""))}>
                <Image
                  src="/arrow.svg"
                  alt="Arrow"
                  width={28}
                  height={28}
                  className=" bg-[#a3512b] p-2 rounded-xl cursor-pointer absolute top-3 right-3"
                />
              </button>
            )}
            <textarea
              value={message}
              placeholder="Ask anything"
              onChange={(e) => setMessage(e.target.value)}
              className=" font-serif textinp bg-transparent resize-none rounded-xl p-2 w-[50vw] md:w-[60vw] lg:w-[50vw] outline-none custom-scrollbar2 min-h-20 md:min-h-28 max-h-96 overflow-y-auto "
              ref={(el) => {
                if (el) {
                  el.style.height = "auto";
                  el.style.height = `${Math.max(
                    112,
                    Math.min(el.scrollHeight, 384)
                  )}px`;
                }
              }}
              onInput={(e) => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height = `${Math.max(
                  112,
                  Math.min(e.currentTarget.scrollHeight, 384)
                )}px`;
              }}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
