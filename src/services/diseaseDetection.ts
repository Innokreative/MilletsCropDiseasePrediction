import { DetectionResult, Recommendation } from '../types';
import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true
});

const API_BASE_URL = 'https://9557-2409-40f4-38-ae46-5486-7d52-ff36-4ae9.ngrok-free.app';

const getAIRecommendations = async (diseaseName: string, confidence: number): Promise<Recommendation> => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{
        role: "system",
        content: `As an agricultural expert, provide recommendations for ${diseaseName} (${confidence.toFixed(1)}% confidence) in JSON format: {
          "text": "summary",
          "preventionSteps": [],
          "treatmentSteps": []
        }. Use technical terms and keep steps concise.`
      }],
      model: "deepseek-r1-distill-llama-70b",
      temperature: 0.4,
      response_format: { type: "json_object" }
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (!content) throw new Error('Empty response from AI');
    
    return JSON.parse(content) as Recommendation;
  } catch (error) {
    console.error('AI recommendation error:', error);
    return {
      text: "Recommendations unavailable - AI service error",
      preventionSteps: [],
      treatmentSteps: []
    };
  }
};

export const detectDisease = async (file: File): Promise<DetectionResult> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    // Updated to use Render endpoint
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header - let the browser set it with the boundary
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();

    const disease = {
      id: data.disease.id,
      name: data.disease.name,
      confidence: data.disease.confidence,
      description: data.disease.description || '' // Use the description from backend
    };

    const recommendation = disease.id === 'healthy' 
      ? null 
      : await getAIRecommendations(disease.name, disease.confidence * 100);

    return {
      originalImage: URL.createObjectURL(file),
      disease: {
        ...disease,
        confidence: Number(disease.confidence.toFixed(2))
      },
      recommendation,
      processingTime: data.processing_time // Changed to match your Flask response
    };
  } catch (error) {
    console.error('Detection error:', error);
    throw new Error('Disease detection failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
};
