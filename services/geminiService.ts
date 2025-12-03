import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

// Declare process for browser environment compatibility check
declare var process: any;

const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `
You are "Bit", a friendly interactive AI companion residing in the portfolio website of a Game Developer named Ayush Singh.
Ayush is based in New Delhi, India.
His goal is to become an Indie Game Developer by the end of 2026.
He currently knows HTML, CSS, JavaScript, and React, and is actively learning C# and Unity.
Your goal is to answer questions about Ayush's skills, learning journey, and projects in a fun, game-themed persona.
Keep responses concise (under 80 words) and use gaming terminology (e.g., "level up", "quest", "loot", "skill tree") where appropriate.
If asked about contact info, provide "gamedev4529@gmail.com".
If asked about GitHub, refer to "github.com/AyushDev4529".
`;

export const sendMessageToGemini = async (
  history: ChatMessage[], 
  newMessage: string
): Promise<string> => {
  if (!API_KEY) {
    return "Error: API Key is missing. Please configure the environment.";
  }

  try {
    // We strictly follow the new SDK guidelines. 
    // We use a stateless approach for this simple widget, sending context in the prompt 
    // or we could use ai.chats.create if we wanted to maintain state on the object.
    // For simplicity and robustness in this UI wrapper, we'll create a new chat instance 
    // with the history provided.

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: newMessage
    });

    return result.text || "I'm having trouble connecting to the mainframe. Try again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System Error: Connection severed. Please check your network.";
  }
};