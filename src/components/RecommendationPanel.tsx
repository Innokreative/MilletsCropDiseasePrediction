import React from 'react';
import { Award, ShieldCheck, AlertCircle } from 'lucide-react';

interface Recommendation {
  text: string;
  preventionSteps: string[];
  treatmentSteps: string[];
}

interface TranslatedContent {
  text?: string;
  preventionSteps?: string[];
  treatmentSteps?: string[];
}

interface RecommendationPanelProps {
  recommendation: Recommendation | null;
  translatedContent: TranslatedContent | null;
  isHealthy: boolean;
  language?: string;
}

const RecommendationPanel: React.FC<RecommendationPanelProps> = ({
  recommendation,
  translatedContent,
  isHealthy,
}) => {
  if (!recommendation) return null;

  const displayText = translatedContent?.text || recommendation.text;
  const preventionSteps = translatedContent?.preventionSteps || recommendation.preventionSteps;
  const treatmentSteps = translatedContent?.treatmentSteps || recommendation.treatmentSteps;

  return (
    <div className="border rounded-xl overflow-hidden bg-white mb-8 shadow-md">
      <div className={`h-1 w-full ${isHealthy ? 'bg-emerald-400' : 'bg-indigo-400'}`}></div>
      <div className="p-6">
        <div className="flex items-center mb-5">
          <Award className={`h-6 w-6 mr-2 ${isHealthy ? 'text-emerald-600' : 'text-indigo-600'}`} />
          <h3 className="text-xl font-semibold text-gray-800">Expert Recommendations</h3>
        </div>

        <div className="mb-6">
          <div className="p-5 rounded-lg bg-gradient-to-r from-slate-50 to-indigo-50 border border-indigo-100">
            <p className="text-gray-700">{displayText}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
            <div className={`p-3 flex items-center ${isHealthy ? 'bg-emerald-100' : 'bg-indigo-100'}`}>
              <ShieldCheck className={`h-5 w-5 mr-2 ${isHealthy ? 'text-emerald-700' : 'text-indigo-700'}`} />
              <h4 className={`font-medium ${isHealthy ? 'text-emerald-800' : 'text-indigo-800'}`}>
                {isHealthy ? 'Best Practices' : 'Prevention Steps'}
              </h4>
            </div>
            <ul className="p-4 space-y-3">
              {preventionSteps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full mr-2 flex items-center justify-center text-xs ${
                    isHealthy ? 'bg-emerald-100 text-emerald-800' : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
            <div className={`p-3 flex items-center ${isHealthy ? 'bg-emerald-100' : 'bg-blue-100'}`}>
              <AlertCircle className={`h-5 w-5 mr-2 ${isHealthy ? 'text-emerald-700' : 'text-blue-700'}`} />
              <h4 className={`font-medium ${isHealthy ? 'text-emerald-800' : 'text-blue-800'}`}>
                {isHealthy ? 'Monitoring Tips' : 'Treatment Steps'}
              </h4>
            </div>
            <ul className="p-4 space-y-3">
              {treatmentSteps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full mr-2 flex items-center justify-center text-xs ${
                    isHealthy ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPanel;