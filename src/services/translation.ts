import { Groq } from 'groq-sdk';
import { Recommendation, TranslatedContent, Language } from '../types';

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true // Add this option
});

export const translateRecommendation = async (
  recommendation: Recommendation,
  targetLanguage: Language
): Promise<TranslatedContent> => {
  const prompt = `Translate this agricultural recommendation to ${targetLanguage} maintaining:
  1. Technical terms in original language
  2. Numbered list formatting
  3. Precise measurements
  4. Professional tone
  
  Return JSON: {
    "text": "translated summary",
    "preventionSteps": [],
    "treatmentSteps": []
  }`;

  const response = await groq.chat.completions.create({
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: JSON.stringify(recommendation) }
    ],
    model: "deepseek-r1-distill-llama-70b",
    temperature: 0.3,
    response_format: { type: "json_object" }
  });

  const content = response.choices[0]?.message?.content;
  
  if (!content) {
    throw new Error('No translation content received from API');
  }

  try {
    const translated = JSON.parse(content);
    return {
      ...translated,
      language: targetLanguage
    };
  } catch (error) {
    console.error('Failed to parse translation response:', content);
    throw new Error('Invalid translation response format');
  }
};