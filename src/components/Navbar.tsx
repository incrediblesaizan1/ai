"use client";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { IconUser } from "@tabler/icons-react";
export function Navbar() {
  const navItems = [

    {
      name: "Register",
      link: "/register",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },

  ];
  return (
    <div className="absolute  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
