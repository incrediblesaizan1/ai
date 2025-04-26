import React from "react";
import { Meteors } from "./ui/meteors";
import { useRouter } from "next/navigation";
// import { Button } from "./ui/button";
import { ButtonColorful } from "./ui/button-colorful";

export function MeteorCard() {
  const router = useRouter()
  const AceternityLogo = () => {
    return (
      <svg
        width="66"
        height="65"
        viewBox="0 0 66 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3 text-black dark:text-white"
      >
        <path
          d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
          stroke="currentColor"
          strokeWidth="15"
          strokeMiterlimit="3.86874"
          strokeLinecap="round"
        />
      </svg>
    );
  };
  
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[94vw] md:w-full max-w-xl max-h-xl">
        <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" />
        <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 px-4 py-8 pt-4 shadow-xl">
          <div className="flex mb-4 h-5 w-5 items-center justify-center rounded-full border border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-2 w-2 text-gray-300"
            > 
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>

          <h1 className="relative font-serif md:font-[cursive] z-50 mb-4 text-sm md:text-base lg:text-2xl font-bold text-white">
            Meteors because they&apos;re cool
          </h1>

          <p className="relative z-50 mb-4 font-sans md:font-[cursive] text-sm md:text-base lg:text-lg font-normal text-slate-500">
          Built for developers who move fast and build faster. From writing clean code to crafting content, solving problems, and streamlining your workflow — this AI assistant is built to help you do it all, effortlessly.
</p>


    <button onClick={()=>router.push("register")} className="cursor-pointer">
        {/* <Button variant={"outline"}  className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 cursor-pointer py-5 rounded-xl">
      <AceternityLogo />
      Start for free
      </Button> */}
    <ButtonColorful />
    </button>


          {/* Meaty part - Meteor effect */}
          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
}
