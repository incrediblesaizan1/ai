"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { LuMessageSquareDiff } from "react-icons/lu";
import {
  IconBrandTabler,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IoIosFlower } from "react-icons/io";
import { UserButton, useUser } from "@clerk/nextjs";

interface Props {
  newChatClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export function Side({newChatClick}:Props) {

    const user = useUser().user

  const links = [

    {
        label: "Start new chat",
        href: "/dashboard",
        icon: (
          <LuMessageSquareDiff className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
        onclick: newChatClick
      },
    {
      label: "Chats",
      href: "/chats",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },

 
   
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mr-auto flex z-50 lg:w-[18vw] xl:w-[15vw] flex-1 flex-col overflow-hidden  md:flex-row bg-transparent",
        "h-screen",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink className="hover:bg-slate-600 px-2 rounded-lg" key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            {/* <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            /> */}
            <div className="flex items-center justify-start gap-2">
            <UserButton /> <span className={`${!open && "hidden"} -mt-1`}>{user?.fullName}</span>
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <IoIosFlower className="text-[#52ced6] text-4xl" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        {`SK'ask`}
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return ( 
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <IoIosFlower className="text-[#52ced6] text-4xl" />
    </Link>
  );
};

