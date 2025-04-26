"use client";
import { StepLoader } from "@/components/StepLoader";
import { Spotlight } from "@/components/ui/spotlight-new";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineDelete } from "react-icons/md";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";


const Page = () => {
  const router = useRouter();
  const [search, setSearch] = useState("")

  interface recentQuestion {
    _id: string;
    question: string;
    date: string;
    response: string;
  }

  const [loading, setLoading] = useState(false);
  const [filteredResults, setFilteredResults] = useState<recentQuestion[]>([])
  const [allQuestions, setAllQuestions] = useState<recentQuestion[]>([])

  const fetchQuestions = async () => {
    setLoading(true);
    const a = await axios.get("/api/questions");
    setFilteredResults(a.data.questions)
    setAllQuestions(a.data.questions)
    setLoading(false);
  };

  const searchResults = () => {
    if (search.trim() === "") {
      setFilteredResults(filteredResults);
      return;
    }
    
    const filtered = allQuestions.filter((e) => {
      return e.question.toLowerCase().includes(search.toLowerCase());
    });
    

    setFilteredResults(filtered);


  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.getDate().toString().padStart(2, "0") +
      " " +
      date.toLocaleString("en-US", { month: "short" }).toUpperCase() +
      ", " +
      date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    );
  };

  const deleteMessage = async (id: string) => {
    setLoading(true);
    await axios.get(`/api/post/${id}`);
    fetchQuestions();
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
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
            <div className="flex items-center p-3 w-full justify-between px-4 sticky top-0 bg-[#242429]">
              <div className="flex gap-16 items-center">
                <div className="flex items-center gap-2 text-2xl">
                  <IoChatbubblesOutline className="text-3xl" />
                  Your Chat history
                </div>
              </div>

              <div>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="flex items-center px-3 py-1 text-lg cursor-pointer text-black gap-1 bg-[#52ced6] rounded-lg"
                >
                  {" "}
                  <IoIosAddCircleOutline className="text-2xl" /> Start New Chat
                </button>
              </div>
            </div>
            <div className="text-center py-6">
            <div className="bg-[#242429] px-2 text-white w-2/4 flex rounded-lg items-center mx-auto h-12">
              <CiSearch className="text-2xl" />
              <input
                type="text"
                value={search}
                onChange={(e) => (setSearch(e.target.value),searchResults())}
                className=" w-full bg-transparent outline-none px-2 "
                placeholder="Search your chats..."
              />
            </div>
              <div>
                {filteredResults
                  ? [...filteredResults].reverse().map((e) => (
                      <div
                        key={e._id}
                        className=" text-white cursor-pointer my-3 w-full md:w-2/4 h-16 text-start content-center px-6 rounded-2xl mx-auto"
                      >
                        {e.question.length > 32 ? (
                          <CardSpotlight className="w-full ">
                            <div className="relative z-20 flex items-center justify-between">
                              <h1
                                onClick={() => router.push(`/chat/${e._id}`)}
                                className="capitalize w-full text-xs md:text-base lg:text-lg flex items-center justify-between"
                              >
                                {e.question.trim().slice(0, 32)}...{" "}
                              </h1>
                              <MdOutlineDelete
                                className="text-red-500 w-12 h-5 hover:text-blue-300 cursor-pointer"
                                onClick={() => deleteMessage(e._id)}
                              />
                            </div>
                            <h3 className="text-xs text-slate-500 relative z-20">
                              {formatDate(e.date)}
                            </h3>
                          </CardSpotlight>
                        ) : (
                          <CardSpotlight className="w-full ">
                            <div className="relative z-20 flex items-center justify-between">
                              <h1
                                onClick={() => router.push(`/chat/${e._id}`)}
                                className="capitalize w-full text-xs md:text-base lg:text-lg flex items-center justify-between"
                              >
                                {e.question.trim()}{" "}
                              </h1>
                              <MdOutlineDelete
                                className="text-red-500 w-12 h-5 hover:text-blue-300 cursor-pointer"
                                onClick={() => deleteMessage(e._id)}
                              />
                            </div>
                            <h3 className="text-xs text-slate-500 relative z-20">
                              {formatDate(e.date)}
                            </h3>
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
