"use client";
import React, { useEffect, useState } from "react";
import { Side } from "@/components/Side";
import { IoIosFlower } from "react-icons/io";
import { useUser } from "@clerk/nextjs";

const Page = () => {
  const user = useUser().user;

  const [greet, setGreet] = useState("");

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

  useEffect(() => {
    greetfunc();
  }, []);

  return (
    <div className="flex overflow-hidden w-full">
      <Side />
      <div className="absolute left-1/2 top-12 md:top-6 transform -translate-x-1/2 flex justify-center items-center min-w-fit">
        <div className="w-full mx-auto flex flex-col justify-center items-center py-4 md:py-8 lg:py-10 xl:p-14">
        <div className="flex w-full justify-center items-center text-2xl md:text-3xl lg:text-5xl capitalize whitespace-nowrap px-4">
            <IoIosFlower className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#52ced6]" />{" "}
            {greet}, {user && user.firstName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
