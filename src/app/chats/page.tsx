"use client";
import { HoverCard } from "@/components/HoverCard";
import { StepLoader } from "@/components/StepLoader";
import { Spotlight } from "@/components/ui/spotlight-new";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineDelete } from "react-icons/md";
import { CardSpotlight } from "@/components/ui/card-spotlight";

const Page = () => {
  const router = useRouter();

  interface recentQuestion {
    _id: string;
    question: string;
    date: string;
    response: string;
  }

  const [loading, setLoading] = useState(false);
  const [recentQuestion, setRecentQuestion] = useState<recentQuestion[]>([]);

  const fetchQuestions = async () => {
    const a = await axios.get("/api/questions");
    setRecentQuestion(a.data.questions);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
   return date.getDate().toString().padStart(2, "0") +
      " " +
      date.toLocaleString("en-US", { month: "short" }).toUpperCase() +
      ", " +
      date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
  };

  const deleteMessage = async (id: string) => {
    setLoading(true);
    const a = await axios.get(`/api/post/${id}`);
    fetchQuestions();
    console.log(a)
    setLoading(false);
  };
  
  useEffect(() => {
    setLoading(true);
    fetchQuestions();
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <StepLoader loading={loading} />
      ) : (
        <div className="relative z-10 w-[100vw] flex overflow-hidden h-screen justify-center">
          <Spotlight />
          {/* <div className="flex w-[98vw] md:w-full items-center pt-10 flex-col overflow-y-auto custom-scrollbar2 overflow-x-hidden"> */}
          <div className="h-screen w-full overflow-auto custom-scrollbar text-white">
            <div className="text-center py-6">
              <div>
                {recentQuestion
                  ? [...recentQuestion].reverse().map((e) => (
                      <div
                        key={e._id}
                        className=" text-white cursor-pointer my-3 w-full md:w-2/4 h-16 text-start content-center px-6 rounded-2xl mx-auto"
                      >
                        {e.question.length > 32 ? (
                          <CardSpotlight className="w-full ">
                            <div className="relative z-20 flex items-center justify-between">
                              <h1
                                onClick={() => router.push(`/chats/${e._id}`)}
                                className="capitalize w-full text-xs md:text-base lg:text-lg flex items-center justify-between"
                              >
                                {e.question.trim().slice(0, 32)}...{" "}
                              </h1>
                              <MdOutlineDelete
                                className="text-red-500 w-12 h-5 hover:text-blue-300 cursor-pointer"
                                onClick={() => deleteMessage(e._id)}
                              />
                            </div>
                            <h3 className="text-xs text-slate-500 relative z-20">{formatDate(e.date)}</h3>
                          </CardSpotlight>
                        ) : (
                          <CardSpotlight className="w-full ">
                            <div className="relative z-20 flex items-center justify-between">
                              <h1
                                onClick={() => router.push(`/chats/${e._id}`)}
                                className="capitalize w-full text-xs md:text-base lg:text-lg flex items-center justify-between"
                              >
                                {e.question.trim()}{" "}
                              </h1>
                              <MdOutlineDelete
                                className="text-red-500 w-12 h-5 hover:text-blue-300 cursor-pointer"
                                onClick={() => deleteMessage(e._id)}
                              />
                            </div>
                            <h3 className="text-xs text-slate-500 relative z-20">{formatDate(e.date)}</h3>
                          </CardSpotlight>
                        )}

                      </div>
                    ))
                  : ""}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
