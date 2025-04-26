import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY
});

export async function getDiseaseRecommendations(diseaseInfo: string) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are an agricultural expert specializing in millet cultivation. Provide detailed, practical recommendations for disease management in bullet points."
      },
      {
        role: "user",
        content: `The detected disease is: ${diseaseInfo}. Provide prevention steps (numbered) and treatment steps (numbered). Use simple language suitable for farmers.`
      }
    ],
    model: "deepseek-r1-distill-llama-70b",
    temperature: 0.4,
    max_tokens: 1024
  });

  return chatCompletion.choices[0].message.content;
}

export async function translateContent(text: string, targetLanguage: string) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a professional translator. Translate the following agricultural text to ${targetLanguage} while maintaining technical accuracy.`
      },
      {
        role: "user",
        content: text
      }
    ],
    model: "deepseek-r1-distill-llama-70b",
    temperature: 0.2,
    max_tokens: 1024
  });

  return chatCompletion.choices[0].message.content;
}