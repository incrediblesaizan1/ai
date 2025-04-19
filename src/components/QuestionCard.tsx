"use client"

import React from 'react'
import { HoverEffect } from './ui/card-hover-effect';


interface Question {
  _id: string;
  question: string;
  date: string;
  response: string;
}

interface Props {
  recentQuestion: Question[];
  setSelectedQue:React.Dispatch<React.SetStateAction<Question[]>>
}

const QuestionCard = ({ recentQuestion , setSelectedQue }: Props) => {
  return (
    <div className="w-[80vw]">
      <HoverEffect items={recentQuestion} setSelectedQue={setSelectedQue} />
    </div>
  );
};

export default QuestionCard;