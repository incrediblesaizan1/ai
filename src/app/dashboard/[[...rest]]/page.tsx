"use client";
import React, { useEffect, useState } from "react";
import { Side } from "@/components/Side";
import { IoIosFlower } from "react-icons/io";
import { useUser } from "@clerk/nextjs";
// import { BackgroundLines } from "@/components/ui/background-lines";
import { cn } from "@/lib/utils";
import { PlaceholderInput } from "@/components/PlaceholderInput";

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
      {/* <BackgroundLines className=""> */}
      <div className="relative flex w-full items-center justify-center bg-white dark:bg-black">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
          )}
        />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

        <Side />
        <div className="absolute top-12 md:top-6 min-w-fit">
          <div className="">
            <div className="w-full mx-auto flex justify-center items-center py-4 md:py-8 lg:py-10 xl:p-14">
              <div className="flex w-full justify-center items-center text-2xl md:text-3xl lg:text-5xl capitalize whitespace-nowrap px-4">
                <IoIosFlower className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#52ced6]" />{" "}
                {greet}, {user && user.firstName}
              </div>
            </div>
          </div>

          <div className="mt-20 md:mt-0">
          <PlaceholderInput />
          </div>

        </div>
      </div>
      {/* </BackgroundLines> */}
    </div>
  );
};

export default Page;
