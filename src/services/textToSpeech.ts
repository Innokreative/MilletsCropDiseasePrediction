import { Language } from '../types';

// Map of languages to voice names for Edge TTS
const VOICE_MAP = {
  english: 'en-US-ChristopherNeural',
  tamil: 'ta-IN-PallaviNeural',
  hindi: 'hi-IN-MadhurNeural'
};

// Simulate TTS processing delay
const simulateTtsDelay = (): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.floor(Math.random() * 1000) + 500);
  });
};

// Mock function to simulate text-to-speech conversion
// In a real app, this would call the Edge TTS API
export const textToSpeech = async (text: string, language: Language): Promise<void> => {
  console.log(`Converting to speech: "${text}" in ${language} using voice ${VOICE_MAP[language]}`);
  
  // Simulate processing delay
  await simulateTtsDelay();
  
  // In a real implementation, we would:
  // 1. Send the text to Edge TTS API
  // 2. Receive audio data back
  // 3. Play the audio using the Web Audio API
  
  // For this mock version, we'll use the browser's built-in speech synthesis
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language based on selected language
    switch (language) {
      case 'tamil':
        utterance.lang = 'ta-IN';
        break;
      case 'hindi':
        utterance.lang = 'hi-IN';
        break;
      default:
        utterance.lang = 'en-US';
    }
    
    window.speechSynthesis.speak(utterance);
  } else {
    console.error('Speech synthesis not supported in this browser');
    alert('Speech synthesis is not supported in your browser');
  }
};