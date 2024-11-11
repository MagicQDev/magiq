import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateAdvice(prompt: string): Promise<string | undefined> {
    try {
        const result = await model.generateContent(prompt);
        return result.response?.candidates?.[0]?.content?.parts?.[0]?.text || undefined;
    } catch (error) {
        console.error("Error generating advice:", error);
        return undefined;
    }
}
