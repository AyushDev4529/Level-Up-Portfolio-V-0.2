import { GoogleGenAI } from "@google/genai";

export default async (req: Request) => {
    if (req.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
    }

    try {
        const { history, message } = await req.json();
        const apiKey = process.env.API_KEY || process.env.VITE_API_KEY;

        if (!apiKey) {
            console.error("API_KEY is missing in environment variables");
            return new Response(JSON.stringify({ error: "Server configuration error" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        const genAI = new GoogleGenAI({ apiKey });
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const chat = model.startChat({
            history: history.map((msg: any) => ({
                role: msg.role,
                parts: [{ text: msg.text }],
            })),
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return new Response(JSON.stringify({ text }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error in chat function:", error);
        return new Response(JSON.stringify({ error: "Failed to process request" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};

export const config = {
    path: "/.netlify/functions/chat",
};
