import { useState, useEffect } from 'react';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import ResultsDisplay from './components/ResultsDisplay';
import RecommendationPanel from './components/RecommendationPanel';
import TranslationControls from './components/TranslationControls';
import TechInfoPanel from './components/TechInfoPanel';
import WeatherWidget from './components/WeatherWidget';
import WelcomePanel from './components/WelcomePanel';
import SustainableFarmingTips from './components/SustainableFarmingTips';
import Footer from './components/Footer';
import { DetectionResult, Language, TranslatedContent } from './types';
import { detectDisease } from './services/diseaseDetection';
import { translateRecommendation } from './services/translation';
import { textToSpeech } from './services/textToSpeech';

function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('english');
  const [translatedContent, setTranslatedContent] = useState<TranslatedContent | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processImage = async (file: File) => {
      setIsProcessing(true);
      setError(null);
      setDetectionResult(null);
      setTranslatedContent(null);

      try {
        const result = await detectDisease(file);
        setDetectionResult(result);
        setCurrentLanguage('english');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to process image');
        console.error('Detection error:', err);
      } finally {
        setIsProcessing(false);
      }
    };

    if (selectedImage) processImage(selectedImage);
  }, [selectedImage]);

  const handleLanguageChange = async (language: Language) => {
    if (!detectionResult?.recommendation || currentLanguage === language) return;

    setIsTranslating(true);
    setError(null);

    try {
      const translated = await translateRecommendation(
        detectionResult.recommendation,
        language
      );
      setTranslatedContent(translated);
      setCurrentLanguage(language);
    } catch (err) {
      setError('Translation failed. Please try again.');
      console.error('Translation error:', err);
      setCurrentLanguage('english');
      setTranslatedContent(null);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSpeakText = async () => {
    if (!detectionResult?.recommendation) return;

    try {
      const text = translatedContent?.text || detectionResult.recommendation.text;
      await textToSpeech(text, currentLanguage);
    } catch (err) {
      setError('Text-to-speech failed. Check audio permissions.');
      console.error('TTS error:', err);
    }
  };

  const isHealthy = detectionResult?.disease?.id === 'healthy';

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center max-w-md bg-red-50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Application Error</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Reload Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <WeatherWidget />
            <ImageUpload 
              onImageSelected={setSelectedImage} 
              isProcessing={isProcessing} 
            />
            
            {detectionResult?.recommendation && (
              <TranslationControls 
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
                isLoading={isTranslating}
              />
            )}
            
            <TechInfoPanel />
          </div>
          
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {isProcessing || detectionResult ? (
                <>
                  <ResultsDisplay 
                    result={detectionResult} 
                    isProcessing={isProcessing} 
                  />
                  
                  {detectionResult?.recommendation && (
                    <RecommendationPanel 
                      recommendation={detectionResult.recommendation}
                      translatedContent={translatedContent}
                      // onSpeakText={handleSpeakText}
                      isHealthy={isHealthy}
                    />
                  )}
                </>
              ) : (
                <>
                  <WelcomePanel />
                </>
              )}
              <SustainableFarmingTips />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;