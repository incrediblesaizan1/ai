import axios from "axios";

export const generateResponse = async (prompt: string): Promise<string> => {
  try {
    const { data } = await axios.post("/api/generate", { prompt });
    return data.response;
  } catch (error) {
    console.error("Failed to generate response:", error);
    return "Sorry, something went wrong. Please try again.";
  }
};