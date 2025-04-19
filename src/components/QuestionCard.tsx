"use client";

import React from "react";
import { HoverEffect } from "./ui/card-hover-effect";

interface Question {
  _id: string;
  question: string;
  date: string;
  response: string;
}
type questions = {
  text: string;
  type: "incoming" | "outgoing";
};

interface Props {
  recentQuestion: Question[];
  setSelectedQue: React.Dispatch<React.SetStateAction<Question[]>>;
  setQuestions: React.Dispatch<React.SetStateAction<questions[]>>;
  setInputDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestionCard = ({
  recentQuestion,
  setSelectedQue,
  setQuestions,
  setInputDown
}: Props) => {
  return (
    <div className="w-[80vw]">
      <HoverEffect
        items={recentQuestion}
        setSelectedQue={setSelectedQue}
        setQuestions={setQuestions}
        setInputDown={setInputDown}
      />
    </div>
  );
};

export default QuestionCard;
