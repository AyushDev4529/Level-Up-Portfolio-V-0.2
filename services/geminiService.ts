import { ChatMessage } from '../types';

export const sendMessageToGemini = async (history: ChatMessage[], message: string): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        history: history.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          text: msg.text
        })),
        message
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "I'm having trouble connecting to my neural network right now. Please try again later.";
  }
};