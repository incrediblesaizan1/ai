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

type SS = {
  text: string;
  type: "incoming" | "outgoing";
};

const Page = () => {
  const user = useUser().user;

  const [greet, setGreet] = useState("");
  const [message, setMessage] = useState("");
  const [inputDown, setInputDown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<SS[]>([]);

  const submitRef = useRef(null);
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
    console.log(a);
  };

  const send = async () => {
    setLoading(true)
    setInputDown(true);
    setQuestions((prev) => [...prev, { text: message, type: "outgoing" }]);

    const response = await generateResponse(message);

    setQuestions((prev) => [...prev, { text: response, type: "incoming" }]);

    setLoading(false)
    console.log("delivered")
    await axios.post("/api/questions", {
      question: message,
      answer: response,
    });
    console.log("data added")
  };

  useEffect(() => {
    setLoading(true)
    greetfunc();
    fetchQuestions();
    setLoading(false)
  }, []);

  if(loading) return <StepLoader loading={loading} />

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

      <div className="relative z-10 w-full">
        <div>
          <Side />
        </div>

        <div className="flex items-center justify-center ">
          <div className="absolute top-12 md:top-6 min-w-fit">
            {!inputDown && (
              <div className="">
                <div className="w-full mx-auto flex justify-center items-center py-4 md:py-8 lg:py-10 xl:p-14">
                  <div className="flex w-full justify-center items-center text-2xl md:text-3xl lg:text-5xl capitalize whitespace-nowrap px-4">
                    <IoIosFlower className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#52ced6]" />{" "}
                    {greet}, {user && user.firstName}
                  </div>
                </div>
              </div>
            )}

            <div
              ref={messageBox}
              className={`
    "absolute w-full h-[65vh] mx-auto",
    inputDown ? "block" : "hidden"
  `}
            >
              <div className="flex flex-col gap-2 p-2 overflow-y-auto custom-scrollbar2 h-[83vh]">
                {questions.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-fit max-w-[90vw] md:max-w-[70vw] lg:max-w-[52vw] p-2 mt-3 rounded-md",
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

            <div
              className={` mt-12 z-50 bg-[#27272a] flex items-center justify-center fixed  ${
                inputDown
                  ? "-bottom-3"
                  : "top-20 md:top-30 lg:top-40"
              }  rounded-2xl  pr-12 p-1`}
            >
              {message.trim() !== "" && (
                <button
                  onClick={() => (send(), setInputDown(true), setMessage(""))}
                >
                  <Image
                    ref={submitRef}
                    src="/arrow.svg"
                    alt=""
                    className="absolute right-3 bg-[#a3512b] p-2 rounded-xl cursor-pointer top-2"
                  />
                </button>
              )}
              <textarea
                value={message}
                placeholder="Ask anything"
                onChange={(e) => setMessage(e.target.value)}
                className=" textinp bg-transparent resize-none text-justify rounded-xl p-2 w-[70vw] lg:w-[50vw] outline-none custom-scrollbar2 min-h-20 md:min-h-28 max-h-96 overflow-y-auto"
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
      </div>
    </div>
  );
};

export default Page;
