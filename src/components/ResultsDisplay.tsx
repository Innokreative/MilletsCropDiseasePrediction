import React from 'react';
import { Check, AlertCircle, Loader2 } from 'lucide-react';

interface DiseaseResult {
  id: string;
  name: string;
  confidence: number;
  description: string;
}

interface ResultsDisplayProps {
  result: {
    disease: DiseaseResult | null;
    processingTime: number;
  } | null;
  isProcessing: boolean;
  onRescan?: () => void;
  onSaveReport?: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  result, 
  isProcessing
}) => {
  if (isProcessing) {
    return (
      <div className="border rounded-xl overflow-hidden bg-gradient-to-br from-white to-indigo-50 p-8 text-center shadow-lg">
        <div className="flex flex-col items-center justify-center py-10">
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 rounded-full bg-indigo-100 animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-indigo-800 mb-3">AI Analysis in Progress</h3>
          <p className="text-indigo-700 max-w-md text-lg">
            Our advanced neural network is analyzing your crop image to detect any diseases.
          </p>
          <div className="w-full max-w-md mt-8">
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-3 bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600 rounded-full animate-pulse"></div>
            </div>
            <p className="text-indigo-500 text-sm mt-3 font-medium">Please wait while we process your image...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!result || !result.disease) {
    return null;
  }

  const isHealthy = result.disease.id === 'healthy';
  
  // Get appropriate colors based on disease type or confidence
  const getColors = () => {
    if (isHealthy) {
      return {
        bg: 'bg-emerald-100',
        border: 'border-emerald-200',
        text: 'text-emerald-800',
        gradient: 'from-emerald-50 to-emerald-100/60',
        iconBg: 'bg-emerald-100',
        iconText: 'text-emerald-600',
        headerBg: 'bg-gradient-to-r from-emerald-400 to-emerald-600',
        badgeBg: 'bg-emerald-100',
        badgeText: 'text-emerald-800',
        buttonBg: 'bg-emerald-100',
        buttonHover: 'hover:bg-emerald-200',
        buttonText: 'text-emerald-700',
        buttonBorder: 'border-emerald-200'
      };
    } else {
      // Use color scheme based on confidence level
      const confidence = result.disease ? result.disease.confidence : 0;
      
      if (confidence < 0.6) {
        // Lower confidence - use amber/orange
        return {
          bg: 'bg-amber-100',
          border: 'border-amber-200',
          text: 'text-amber-800',
          gradient: 'from-amber-50 to-amber-100/60',
          iconBg: 'bg-amber-100',
          iconText: 'text-amber-600',
          headerBg: 'bg-gradient-to-r from-amber-400 to-amber-600',
          badgeBg: 'bg-amber-100',
          badgeText: 'text-amber-800',
          buttonBg: 'bg-amber-100',
          buttonHover: 'hover:bg-amber-200',
          buttonText: 'text-amber-700',
          buttonBorder: 'border-amber-200'
        };
      } else {
        // Higher confidence - use red
        return {
          bg: 'bg-red-100',
          border: 'border-red-200',
          text: 'text-red-800',
          gradient: 'from-red-50 to-red-100/60',
          iconBg: 'bg-red-100',
          iconText: 'text-red-600',
          headerBg: 'bg-gradient-to-r from-red-400 to-red-600',
          badgeBg: 'bg-red-100',
          badgeText: 'text-red-800',
          buttonBg: 'bg-red-100',
          buttonHover: 'hover:bg-red-200',
          buttonText: 'text-red-700',
          buttonBorder: 'border-red-200'
        };
      }
    }
  };
  
  const colors = getColors();

  // Sample description for testing (replace with real data in production)
  const getDescription = () => {
    if (!result.disease || !result.disease.description || result.disease.description.trim() === '') {
      if (result.disease && result.disease.id === 'rust') {
        return "Rust is a fungal disease that appears as orange-brown pustules on leaves and stems. It weakens the plant by reducing photosynthetic area and causing premature leaf drop. Early detection is crucial for effective management through fungicide application.";
      } else if (isHealthy) {
        return "Your crop appears healthy with no signs of disease or pest damage. Continue with your current management practices and monitor regularly for any changes.";
      } else {
        return "This disease affects plant tissues and may reduce yield if left untreated. Consider appropriate treatment options based on the confidence level of this diagnosis.";
      }
    }
    return result.disease.description;
  };

  return (
    <div className="border rounded-xl overflow-hidden bg-white mb-8 shadow-lg transition-all hover:shadow-xl duration-300">
      <div className={`h-3 w-full ${colors.headerBg}`}></div>
      <div className="p-8">
        <div className="flex items-start mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-5 ${colors.iconBg} border-2 ${colors.border} shadow-md`}>
            {isHealthy ? (
              <Check className={`h-8 w-8 ${colors.iconText}`} />
            ) : (
              <AlertCircle className={`h-8 w-8 ${colors.iconText}`} />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800">
              {result.disease.name.toUpperCase()}
            </h3>
            <p className="text-gray-600 mt-1">
              {isHealthy
                ? 'Good news! No disease detected in your millet crop.'
                : 'Our AI has detected disease patterns in your crop sample.'}
            </p>
          </div>
          <div className="ml-4">
            <span className={`inline-flex items-center ${colors.badgeBg} ${colors.badgeText} ring-1 ring-opacity-50 ring-current text-sm px-4 py-2 rounded-full font-semibold`}>
              {(result.disease.confidence * 100).toFixed(1)}% confidence
            </span>
          </div>
        </div>

        {/* Disease information */}
        <div className={`mb-6 p-6 rounded-xl bg-gradient-to-br ${colors.gradient} border ${colors.border}`}>
          <p className="text-gray-700 leading-relaxed">
            {getDescription()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;