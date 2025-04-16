"use client";

import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

export function PlaceholderInput() {
  const placeholders = [
    "What's a healthy meal plan for the week?",
    "Summarize this article in 3 bullet points.",
    "Fix this JavaScript bug for me.",
    "Write a catchy caption for my travel photo.",
    "What’s the best way to stay focused while studying?",
    "Generate social media content ideas for my business.",
    "Translate this message into professional German.",
    "How do I negotiate a higher salary?",
    "Create a to-do list app using React and Firebase.",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className="cursor-pointer">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
