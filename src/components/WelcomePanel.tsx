import { Info, AlertCircle, Camera } from 'lucide-react';
import milletsImage from '../assets/millets.png';

const WelcomePanel = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 mb-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-blue-500/20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        <img
          src={milletsImage}
          alt="Millet crop field"
          className="w-full h-52 md:h-64 object-cover"
        />
        <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs px-2.5 py-1.5 rounded-md font-medium">
          AI-Powered
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-indigo-800 mb-5 flex items-center">
          <span>Millet Crop Disease Detection</span>
          <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs px-2.5 py-1 rounded-full">v2.5</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-lg border border-indigo-100 shadow-sm">
            <h3 className="text-lg font-semibold text-indigo-800 mb-3 flex items-center">
              <div className="bg-indigo-100 p-1.5 rounded-lg mr-2">
                <Info className="h-4 w-4 text-indigo-600" />
              </div>
              How It Works
            </h3>
            <ol className="list-decimal list-inside text-indigo-900/80 space-y-2.5 ml-1">
              <li className="flex items-baseline">
                <span className="text-indigo-800 font-medium mr-1.5">1.</span>
                <span>Upload a clear image of your millet crop</span>
              </li>
              <li className="flex items-baseline">
                <span className="text-indigo-800 font-medium mr-1.5">2.</span>
                <span>Our AI analyzes the image for disease patterns</span>
              </li>
              <li className="flex items-baseline">
                <span className="text-indigo-800 font-medium mr-1.5">3.</span>
                <span>View detection results and confidence level</span>
              </li>
              <li className="flex items-baseline">
                <span className="text-indigo-800 font-medium mr-1.5">4.</span>
                <span>Get customized treatment recommendations</span>
              </li>
            </ol>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-100 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
              <div className="bg-blue-100 p-1.5 rounded-lg mr-2">
                <AlertCircle className="h-4 w-4 text-blue-600" />
              </div>
              Common Millet Diseases
            </h3>
            <ul className="space-y-2.5 ml-1">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-blue-900/80">Blast Disease (Pyricularia grisea)</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-blue-900/80">Downy Mildew (Sclerospora graminicola)</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-blue-900/80">Rust Disease (Puccinia species)</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-blue-900/80">Smut Disease (Various smut fungi)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-100 mb-6">
          <div className="flex items-start">
            <div className="bg-indigo-100 p-2 rounded-lg mr-3 mt-0.5">
              <Camera className="h-4 w-4 text-indigo-600" />
            </div>
            <p className="text-gray-700 text-sm">
              For best results, ensure your image clearly shows the affected parts of the plant under good lighting conditions.
              Close-up shots of diseased areas typically yield more accurate diagnoses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePanel;