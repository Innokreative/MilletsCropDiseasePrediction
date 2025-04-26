import React from 'react';
import { Globe } from 'lucide-react';

interface TranslationControlsProps {
  currentLanguage: 'english' | 'tamil' | 'hindi';
  onLanguageChange: (lang: 'english' | 'tamil' | 'hindi') => void;
  isLoading: boolean;
}

const TranslationControls: React.FC<TranslationControlsProps> = ({
  currentLanguage,
  onLanguageChange,
  isLoading,
}) => {
  return (
    <div className="border rounded-xl overflow-hidden bg-white mb-8 shadow-md">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="bg-purple-100 p-1.5 rounded-full mr-2">
            <Globe className="h-5 w-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Translation & Accessibility</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onLanguageChange('english')}
            disabled={isLoading || currentLanguage === 'english'}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentLanguage === 'english'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            English
          </button>

          <button
            onClick={() => onLanguageChange('tamil')}
            disabled={isLoading || currentLanguage === 'tamil'}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentLanguage === 'tamil'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            தமிழ் (Tamil)
          </button>

          <button
            onClick={() => onLanguageChange('hindi')}
            disabled={isLoading || currentLanguage === 'hindi'}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentLanguage === 'hindi'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            हिंदी (Hindi)
          </button>
        </div>

        {isLoading && (
          <div className="mt-2 text-sm text-gray-500 flex items-center">
            <div className="animate-spin h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full mr-2"></div>
            Translating content...
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslationControls;