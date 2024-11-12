import { AiClient } from "@/lib/open-ai";

const generateIGDescription = async (parsedPrompt: string) =>
  await AiClient.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.5,
    messages: [
      {
        role: "system",
        content:
          "Actua como experto en redes sociales, crea la descripción perfecta y los hashtags adecuados para una publicación en instagram de restaurante local.",
      },
      {
        role: "user",
        content: parsedPrompt,
      },
    ],
  });
export default generateIGDescription;
