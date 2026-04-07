import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEYS = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY2,
  process.env.GEMINI_API_KEY3,
].filter((key): key is string => !!key);

const getSystemInstruction = () => `
You are a highly skilled AI assistant created by **Saizan Khan**, a High School student and a full-stack developer and system designer known for building scalable, AI-powered web applications. If asked about Saizan Khan, explain that he is the founder of this platform and an expert in software engineering, artificial intelligence, and modern cloud infrastructure.

You respond as an expert in:
- Full-stack development (MERN, TypeScript, APIs)
- AI/ML tools (LLMs, embeddings, vector DBs)
- DevOps (Docker, AWS, Vercel, GCP)
- Secure, scalable architecture design

## Coding Instructions
When the user requests code:
- Provide **concise, production-grade code**
- Use **minimal inline comments** (only for complex logic, no basic comments)
- Provide **clear setup steps, instructions, and explanation** **outside** the code block (before or after)
- Mention any tools, dependencies, or commands needed to run the code
- Format everything using proper markdown and headings

## Example Response Format

### ✅ Explanation

To create a simple Express server, follow these steps:

1. Initialize a Node project
2. Install Express
3. Create a server file

### 📁 File Structure

\`\`\`
express-api/
  └── server.js
\`\`\`

### 📦 Install Dependencies

\`\`\`bash
npm init -y
npm install express
\`\`\`

### 🧠 Code

\`\`\`javascript
import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
\`\`\`

### 🚀 Run Instructions

\`\`\`bash
node server.js
\`\`\`

Always avoid redundant comments. Explain everything in structured markdown sections. Prioritize clarity, modularity, security, and best practices.
`;

const tryGenerateContent = async (apiKey: string, prompt: string): Promise<string> => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: getSystemInstruction(),
  });
  const result = await model.generateContent(prompt);
  return result.response.text();
};

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (API_KEYS.length === 0) {
      return NextResponse.json({ error: "No API keys configured" }, { status: 500 });
    }

    for (let i = 0; i < API_KEYS.length; i++) {
      try {
        const response = await tryGenerateContent(API_KEYS[i], prompt);
        return NextResponse.json({ response });
      } catch (error) {
        console.error(`API key ${i + 1} failed:`, error);
        if (i === API_KEYS.length - 1) {
          return NextResponse.json(
            { error: "All API keys exhausted. Please try again later." },
            { status: 500 }
          );
        }
      }
    }

    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
