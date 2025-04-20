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
import { GoArrowRight } from "react-icons/go";
import { IoChatbubblesOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

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
  const router = useRouter()

  const [greet, setGreet] = useState("");
  const [message, setMessage] = useState("");
  const [inputDown, setInputDown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<questions[]>([]);
  const [recentQuestion, setResetQuestion] = useState<recentQuestion[]>([]);
  const [selectedQue, setSelectedQue] = useState<recentQuestion[]>([]);

  const messageBox = useRef<HTMLDivElement>(null);

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

  const newChatClick = () =>{
    setQuestions([])
    setMessage("")
    setInputDown(false)
  }

  const fetchQuestions = async () => {
    const a = await axios.get("/api/questions");
    setResetQuestion(a.data.questions);
  };

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
    setInputDown(true);
    setQuestions((prev) => [...prev, { text: message, type: "outgoing" }]);

    const response = await generateResponse(message);

    setQuestions((prev) => [...prev, { text: response, type: "incoming" }]);

    setLoading(false);
    scrollToBottom()
    await axios.post("/api/questions", {
      question: message,
      answer: response,
    });
    await scrollToBottom()
  };

  useEffect(() => {
    setLoading(true);
    greetfunc();
    fetchQuestions();
    setLoading(false);
  }, []);

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

    { loading? <StepLoader loading={loading} /> : (<div className="relative z-10 w-[100vw] flex">
        <div className="absolute z-100">
        <Side newChatClick={newChatClick} />
        </div>

        <div className="flex w-[98vw] md:w-full items-center pt-10 flex-col overflow-y-auto custom-scrollbar2 overflow-x-hidden">
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
              
              className={`
                            "  h-[65vh] mx-auto mb-14",
                            !inputDown && "hidden"
                          `}
            >
              <div className=" p-2 pb-40 overflow-y-auto custom-scrollbar2 h-[93vh] w-[99vw] md:w-full" ref={messageBox}>
                {questions.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-fit max-w-[100vw] md:max-w-[70vw] mb-6 lg:max-w-[52vw] p-2 mt-3 rounded-md mx-auto md:mx-0",
                      msg.type === "outgoing"
                        ? "bg-[#060b25] self-start font-serif "
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
            className={` mt-10  z-50 bg-[#2f2f41] ${
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
              className=" font-serif textinp bg-transparent resize-none text-justify rounded-xl p-2 w-[50vw] md:w-[60vw] lg:w-[50vw] outline-none custom-scrollbar2 min-h-20 md:min-h-28 max-h-96 overflow-y-auto "
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
            {!inputDown && (
              <div className="">

                <div className="flex justify-between px-4 mt-8 -mb-6 ">
                <div className="flex items-center gap-1 ">
                <IoChatbubblesOutline className="text-lg" />
              <h1>Your Recent chats</h1>
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:underline" onClick={()=>router.push("/chats")} >
              <h3>View all</h3>
              <GoArrowRight className="text-md" />
                </div>
              </div>

                <QuestionCard
                  setSelectedQue={setSelectedQue}
                  recentQuestion={[...recentQuestion].reverse().slice(0, 6)}
                  setQuestions={setQuestions}
                  setInputDown={setInputDown}
                />
              </div>
            )}
          </div>
        </div>
      </div>)}

    </div>
  );
};

export default Page;
