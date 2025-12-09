import { GoogleGenAI } from "@google/genai";
import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
    if (req.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
    }

    try {
        const { history, message } = await req.json();
        const apiKey = Netlify.env.get("API_KEY") || Netlify.env.get("VITE_API_KEY");

        if (!apiKey) {
            console.error("API_KEY is missing in environment variables");
            return new Response(JSON.stringify({ error: "Server configuration error" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        const ai = new GoogleGenAI({ apiKey });

        // Construct the prompt with history
        const contents = history.map((msg: any) => ({
            role: msg.role,
            parts: [{ text: msg.text }],
        }));

        // Add the new message
        contents.push({
            role: "user",
            parts: [{ text: message }],
        });

        const { response } = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: contents,
        });

        const text = response.text();

        return new Response(JSON.stringify({ text }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        console.error("Error in chat function:", error);
        return new Response(JSON.stringify({ error: error.message || String(error) }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};

export const config = {
    path: "/api/chat",
};
