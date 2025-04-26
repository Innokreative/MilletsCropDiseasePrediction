export type Language = 'english' | 'tamil' | 'hindi';

export interface Disease {
  id: string;
  name: string;
  confidence: number;
  description: string;
}

export interface Recommendation {
  text: string;
  preventionSteps: string[];
  treatmentSteps: string[];
}

export interface TranslatedContent {
  language: Language;
  text: string;
  preventionSteps: string[];
  treatmentSteps: string[];
}

export interface DetectionResult {
  originalImage: string;
  disease: Disease | null;
  recommendation: Recommendation | null;
  processingTime: number;
}