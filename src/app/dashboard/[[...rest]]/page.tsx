"use client";
import React, { useEffect, useRef, useState } from "react";
import { Side } from "@/components/Side";
import { IoIosFlower } from "react-icons/io";
import { useUser } from "@clerk/nextjs";
// import { BackgroundLines } from "@/components/ui/background-lines";
import { cn } from "@/lib/utils";
import { generateResponse } from "@/helpers/gemini.service";
import axios from "axios";
import AppendResponse from "@/components/AppendResponse";
import { StepLoader } from "@/components/StepLoader";
import Image from "next/image";
import QuestionCard from "@/components/QuestionCard";

type questions = {
  text: string;
  type: "incoming" | "outgoing";
};

interface recentQuestion {
  _id: string;
  question: string;
  date: string;
  response: string;
}

const Page = () => {
  const user = useUser().user;

  const [greet, setGreet] = useState("");
  const [message, setMessage] = useState("");
  const [inputDown, setInputDown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<questions[]>([]);
  const [recentQuestion, setResetQuestion] = useState<recentQuestion[]>([]);
  const [selectedQue, setSelectedQue] = useState<recentQuestion[]>([])

  const messageBox = useRef(null);

  const greetfunc = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 0 && hour < 5) {
      setGreet("Good Late Night");
    } else if (hour >= 5 && hour < 12) {
      setGreet("Good Morning");
    } else if (hour >= 12 && hour < 17) {
      setGreet("Good Afternoon");
    } else if (hour >= 17 && hour < 20) {
      setGreet("Good Evening");
    } else {
      setGreet("Good Night");
    }
  };

  const fetchQuestions = async () => {
    const a = await axios.get("/api/questions");
    setResetQuestion(a.data.questions);
  };

  const send = async () => {
    setLoading(true);
    setInputDown(true);
    setQuestions((prev) => [...prev, { text: message, type: "outgoing" }]);

    const response = await generateResponse(message);

    setQuestions((prev) => [...prev, { text: response, type: "incoming" }]);

    setLoading(false);
    await axios.post("/api/questions", {
      question: message,
      answer: response,
    });
  };

  useEffect(() => {
    setLoading(true);
    greetfunc();
    fetchQuestions();
    setLoading(false);
  }, []);

  if (loading) return <StepLoader loading={loading} />;
  console.log(selectedQue)

  return (
    <div className="relative flex h-screen w-full bg-black">
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black" />

      <div className="relative z-10 w-[100vw] flex">
        <div className="absolute">
          <Side />
        </div>

        <div className="flex w-[100vw] items-center pt-10 flex-col overflow-y-auto ">

          <div>
            {!inputDown && (
              <div className=" flex items-center text-2xl md:text-3xl lg:text-5xl capitalize ">
                <IoIosFlower className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#52ced6]" />{" "}
                {greet}, {user && user.firstName}
              </div>
            )}
          </div>

          {inputDown && (
            <div
              ref={messageBox}
              className={`
                            "  h-[65vh] mx-auto mb-14",
                            !inputDown && "hidden"
                          `}
            >
              <div className=" p-2 pb-40 overflow-y-auto custom-scrollbar2 h-[93vh]">
                {questions.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-fit max-w-[90vw] md:max-w-[70vw] mb-6 lg:max-w-[52vw] p-2 mt-3 rounded-md",
                      msg.type === "outgoing"
                        ? "bg-[#060b25] self-start"
                        : "bg-[#27272a] self-start"
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
          )}

          <div
            className={` mt-10  z-50 bg-[#27272a] ${
              inputDown ? "fixed -bottom-3" : ""
            }  rounded-2xl  pr-12 p-1 relative`}
          >
            {message.trim() !== "" && (
              <button
                onClick={() => (send(), setInputDown(true), setMessage(""))}
              >
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
              className=" textinp bg-transparent resize-none text-justify rounded-xl p-2 w-[50vw] md:w-[60vw] lg:w-[50vw] outline-none custom-scrollbar2 min-h-20 md:min-h-28 max-h-96 overflow-y-auto "
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

              <div className="">
          {!inputDown && <div className="">  
                            <QuestionCard setSelectedQue={setSelectedQue} recentQuestion={[...recentQuestion].reverse().slice(0,6)} />
                        </div>}
              </div>


        </div>
      </div>
    </div>
  );
};

export default Page;
