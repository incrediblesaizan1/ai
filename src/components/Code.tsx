"use client";

import React from "react";

import { CodeBlock } from "@/components/ui/code-block";

interface Props {
  prompt: string;
}

export function Code({ prompt }: Props) {
  const code = `${prompt}`;

  return (
    <div className="max-w-3xl mx-auto w-full">
      <CodeBlock
        language="jsx"
        filename="DummyComponent.jsx"
        highlightLines={[9, 13, 14, 18]}
        code={code}
      />
    </div>
  );
}
