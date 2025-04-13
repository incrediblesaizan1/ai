import React from "react";
import { Cover } from "@/components/ui/cover";
import { IoIosFlower } from "react-icons/io";

export function HomeName() {
  return (
    <div>
      <h1 className="text-4xl cursor-pointer md:text-4xl lg:text-5xl font-semibold max-w-7xl mx-auto text-center relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
      <Cover className="flex items-center"><IoIosFlower className="text-6xl text-[#52ced6]" />{" "}{`SK'ask`}</Cover>
      </h1>
    </div>
  );
}
