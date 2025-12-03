# DevQuest | Game Dev Portfolio

Welcome to **DevQuest**, a gamified portfolio website designed for Ayush Singh, an aspiring Indie Game Developer. This project showcases skills, projects, and a learning journey in a fun, interactive, and game-themed interface.

## 🎮 Overview

DevQuest transforms the traditional portfolio into an RPG-style experience. It features "Bit," an AI companion powered by Google's Gemini API, who acts as a guide and answers questions about Ayush's background and skills in a role-playing persona.

## ✨ Features

-   **Interactive AI Companion**: Chat with "Bit" to learn about the developer.
-   **Gamified UI**: Health bars, mana, skill trees, and quest logs.
-   **Responsive Design**: Optimized for desktop and mobile devices.
-   **Dynamic Content**: Real-time updates and interactive elements.
-   **Modern Tech Stack**: Built with performance and aesthetics in mind.

## 🛠️ Tech Stack

-   **Frontend**: [React](https://react.dev/) (v18)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **AI Integration**: [Google Generative AI SDK](https://www.npmjs.com/package/@google/genai)
-   **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Setup Instructions

Follow these steps to run the project locally:

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/AyushDev4529/Level-Up-Portfolio-V-0.2.git
    cd Level-Up-Portfolio-V-0.2
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure API Key**
    To enable the AI companion, you need a valid Google Gemini API Key.
    -   Open `index.html` and locate the `window.process` polyfill script.
    -   Replace the empty string `''` with your API key:
        ```javascript
        window.process = window.process || { env: { API_KEY: 'YOUR_API_KEY_HERE' } };
        ```
    -   *Note: For production, ensure you use a secure backend or environment variable handling.*

4.  **Run the Application**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
