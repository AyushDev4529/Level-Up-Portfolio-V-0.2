import { GoogleGenAI } from "@google/genai";

export const handler = async (event: any) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { history, message } = JSON.parse(event.body || "{}");
        const apiKey = process.env.API_KEY || process.env.VITE_API_KEY;

        if (!apiKey) {
            console.error("API_KEY is missing in environment variables");
            return {
                import { GoogleGenAI } from "@google/genai";

                export const handler = async (event: any) => {
                    if (event.httpMethod !== "POST") {
                        return { statusCode: 405, body: "Method Not Allowed" };
                    }

                    try {
                        const { history, message } = JSON.parse(event.body || "{}");
                        const apiKey = process.env.API_KEY || process.env.VITE_API_KEY;

                        if (!apiKey) {
                            console.error("API_KEY is missing in environment variables");
                            return {
                                statusCode: 500,
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ error: "Server configuration error" }),
                            };
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

                        return {
                            statusCode: 200,
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ text }),
                        };
                    } catch (error: any) {
                        console.error("Error in chat function:", error);
                        return {
                            statusCode: 500,
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ error: error.message || String(error) }),
                        };
                    }
                };
