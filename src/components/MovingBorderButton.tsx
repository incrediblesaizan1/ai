"use client";
import React from "react";
import { Button } from "./ui/moving-border";

interface Props {
    title: string
    bgColor: string
}

export function MovingBorderButton({title, bgColor}: Props) {
  return (
    <div>
      <Button
        borderRadius="1.75rem"
        className={`${bgColor} text-white border-slate-800 cursor-pointer`}
      >
        {title}
      </Button>
    </div>
  );
}
