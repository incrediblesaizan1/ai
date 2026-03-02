import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

import { useState } from "react";

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

export const HoverEffect = ({
  items,
  className,
  setSelectedQue,
  setQuestions,
  setInputDown
}: {
  items: {
    question: string;
    date: string;
    response: string;
    _id: string;
  }[];
  className?: string;
  setSelectedQue: React.Dispatch<React.SetStateAction<Question[]>>;
  setQuestions: React.Dispatch<React.SetStateAction<questions[]>>;
  setInputDown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleSelect = (item: Question) => {
    setSelectedQue([item]);
    setInputDown(true)
    setQuestions([{text: item.question, type: "outgoing"}])
    setQuestions((prev)=>[...prev, {text: item.response, type: "incoming"}])
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  pt-8",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item?._id}
          onClick={() => handleSelect(item)}
          className="relative group  block p-2 h-full w-full cursor-pointer"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            {item.question.length > 32 ? (
              <CardTitle>{item.question.slice(0, 32)}...</CardTitle>
            ) : (
              <CardTitle>{item.question}</CardTitle>
            )}

            {item.response.length > 65 ? (
              <CardDescription>
                {item.response.slice(0, 65)} .....
              </CardDescription>
            ) : (
              <CardDescription>{item.response}</CardDescription>
            )}
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
