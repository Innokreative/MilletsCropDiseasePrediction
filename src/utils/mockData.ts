import { Disease, Recommendation, Language } from '../types';

export const DISEASES: Disease[] = [
  {
    id: 'blast',
    name: 'Blast Disease',
    confidence: 0.94,
    description: 'A fungal disease that affects the leaves, stems, and nodes of millet crops, caused by Pyricularia grisea. It appears as diamond-shaped lesions with gray centers and brown margins.'
  },
  {
    id: 'downy-mildew',
    name: 'Downy Mildew',
    confidence: 0.89,
    description: 'A fungal disease that causes yellow or chlorotic lesions on leaf surfaces, caused by Sclerospora graminicola. The undersides of leaves develop white, downy growth.'
  },
  {
    id: 'rust',
    name: 'Rust Disease',
    confidence: 0.91,
    description: 'A fungal disease that appears as small, round, reddish-brown pustules mainly on leaves, caused by Puccinia species. Severe infections can cause leaves to dry and die prematurely.'
  },
  {
    id: 'smut',
    name: 'Smut Disease',
    confidence: 0.87,
    description: 'A fungal disease that replaces grain with black, powdery spore masses, caused by various smut fungi. It directly affects yield by converting grain to masses of spores.'
  },
  {
    id: 'healthy',
    name: 'Healthy Plant',
    confidence: 0.96,
    description: 'No disease detected. The plant appears to be healthy with normal growth patterns and coloration.'
  }
];

export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'rec-blast',
    diseaseId: 'blast',
    text: 'Blast disease is a serious fungal infection that requires immediate treatment to prevent spread to healthy plants.',
    preventionSteps: [
      'Use disease-free seeds from reliable sources',
      'Practice crop rotation with non-host crops',
      'Maintain optimal plant spacing for good air circulation',
      'Apply balanced fertilization (avoid excessive nitrogen)',
      'Plant resistant varieties when available'
    ],
    treatmentSteps: [
      'Apply fungicides containing tricyclazole or azoxystrobin at recommended doses',
      'Remove and destroy infected plant debris',
      'Avoid overhead irrigation to reduce humidity',
      'Ensure proper drainage in the field',
      'Follow up with preventive fungicide application after 10-14 days'
    ]
  },
  {
    id: 'rec-downy-mildew',
    diseaseId: 'downy-mildew',
    text: 'Downy mildew is a fast-spreading fungal disease that thrives in cool, humid conditions and can cause significant yield loss.',
    preventionSteps: [
      'Use disease-free seeds treated with metalaxyl or similar fungicides',
      'Adjust planting dates to avoid cool, wet weather during seedling stage',
      'Practice crop rotation for at least 3 years',
      'Ensure good field drainage and air circulation',
      'Use resistant varieties whenever possible'
    ],
    treatmentSteps: [
      'Apply systemic fungicides containing metalaxyl or fosetyl-aluminum',
      'Remove and destroy infected plants to reduce inoculum',
      'Improve field drainage to reduce humidity',
      'Avoid working in fields when plants are wet',
      'Apply foliar application of potassium phosphonate for additional protection'
    ]
  },
  {
    id: 'rec-rust',
    diseaseId: 'rust',
    text: 'Rust disease creates numerous small pustules on leaves and stems, reducing photosynthetic area and compromising plant vigor.',
    preventionSteps: [
      'Plant early in the season to avoid peak rust periods',
      'Use resistant varieties when available',
      'Practice proper field sanitation and crop rotation',
      'Apply preventive fungicides at early growth stages',
      'Monitor fields regularly for early detection'
    ],
    treatmentSteps: [
      'Apply fungicides containing triazoles or strobilurins at first sign of infection',
      'Ensure complete coverage of plant surfaces during fungicide application',
      'Remove heavily infected plants',
      'Adjust fertilization to promote plant recovery',
      'Apply secondary fungicide application after 7-10 days if infection persists'
    ]
  },
  {
    id: 'rec-smut',
    diseaseId: 'smut',
    text: 'Smut disease directly affects the grain, replacing it with spore masses, and can spread rapidly through contaminated soil and seeds.',
    preventionSteps: [
      'Use certified disease-free seeds',
      'Treat seeds with carboxin or thiram before planting',
      'Practice crop rotation with non-host crops for 2-3 years',
      'Avoid using manure from animals fed with infected plants',
      'Clean farm equipment when moving between fields'
    ],
    treatmentSteps: [
      'Remove and burn infected plants before spores are released',
      'Avoid harvesting infected crops for seed',
      'Deep plow fields after harvest to bury spores',
      'Solarize soil in heavily infected areas if feasible',
      'Apply fungicidal sprays containing carboxin to protect developing heads'
    ]
  },
  {
    id: 'rec-healthy',
    diseaseId: 'healthy',
    text: 'Your millet crop appears healthy! Continue these good practices to maintain crop health and maximize yield.',
    preventionSteps: [
      'Maintain current crop management practices',
      'Continue regular monitoring for early disease detection',
      'Rotate crops in subsequent seasons',
      'Practice good field sanitation',
      'Use quality seeds for future plantings'
    ],
    treatmentSteps: [
      'No treatment needed at this time',
      'Consider preventive fungicide application if disease pressure increases in the area',
      'Follow recommended fertilization schedule for optimal plant health',
      'Maintain optimal irrigation practices',
      'Continue regular scouting for pest and disease issues'
    ]
  }
];

// Mock translation dictionaries (simplified for demo purposes)
export const TAMIL_TRANSLATIONS: { [key: string]: string } = {
  'Blast Disease': 'பிளாஸ்ட் நோய்',
  'Downy Mildew': 'டவுனி மில்டியூ',
  'Rust Disease': 'துரு நோய்',
  'Smut Disease': 'கரி நோய்',
  'Healthy Plant': 'ஆரோக்கியமான தாவரம்',
  'Use disease-free seeds from reliable sources': 'நம்பகமான ஆதாரங்களிலிருந்து நோய் இல்லாத விதைகளைப் பயன்படுத்தவும்',
  'Apply fungicides containing tricyclazole': 'ட்ரைசிக்லாசோல் கொண்ட பூஞ்சைக்கொல்லிகளைப் பயன்படுத்தவும்',
  // Additional translations would go here in a real application
};

export const HINDI_TRANSLATIONS: { [key: string]: string } = {
  'Blast Disease': 'ब्लास्ट रोग',
  'Downy Mildew': 'आर्द्र फफूंदी',
  'Rust Disease': 'रतुआ रोग',
  'Smut Disease': 'कंड रोग',
  'Healthy Plant': 'स्वस्थ पौधा',
  'Use disease-free seeds from reliable sources': 'विश्वसनीय स्रोतों से रोग मुक्त बीजों का उपयोग करें',
  'Apply fungicides containing tricyclazole': 'ट्राइसाइक्लाज़ोल युक्त फफूंदीनाशक लगाएं',
  // Additional translations would go here in a real application
};

// Simulate translation function
export const translateText = (text: string, language: Language): string => {
  if (language === 'tamil' && TAMIL_TRANSLATIONS[text]) {
    return TAMIL_TRANSLATIONS[text];
  } else if (language === 'hindi' && HINDI_TRANSLATIONS[text]) {
    return HINDI_TRANSLATIONS[text];
  }
  return text; // Return original if no translation exists
};

// Mock function to translate an array of strings
export const translateArray = (items: string[], language: Language): string[] => {
  return items.map(item => translateText(item, language));
};