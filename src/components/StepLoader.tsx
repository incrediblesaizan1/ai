"use client";
import React from "react";
import { MultiStepLoader as Loader } from "./ui/multi-step-loader";

const loadingStates = [
  { text: "🧠 Initializing cognitive architecture" },
  { text: "⚡ Powering quantum processors" },
  { text: "🌐 Connecting to knowledge clusters" },
  { text: "🔒 Activating ethics protocols" },
  { text: "💬 Loading language matrices" },
  { text: "🎯 Optimizing decision engines" },
  { text: "🤖 Calibrating personality matrix" },
  { text: "🚀 Ready for liftoff! Ask me anything!" }
];

interface Props{
  loading: boolean
}

export function StepLoader({loading}:Props) {
  return (
    <div className="w-full h-[45vh] flex items-center justify-center">
      <Loader loadingStates={loadingStates} loading={loading} duration={1500} />
    </div>
  );
}
