import { Leaf, BrainCircuit, Layers, Scale, ImagePlus } from "lucide-react";

const TechInfoPanel = () => {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg mb-8 border border-emerald-100 hover:shadow-xl transition-shadow">
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-green-600 p-1">
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-xl font-bold text-emerald-800 mb-5 flex items-center">
            <Leaf className="h-6 w-6 mr-2 text-green-600" />
            Smart Millet Disease Detection
          </h3>
          
          <div className="space-y-6">
            {/* Transfer Learning */}
            <div className="flex items-start group hover:bg-emerald-50 p-3 rounded-xl transition-colors">
              <div className="bg-green-100 p-2.5 rounded-xl mr-4 mt-0.5">
                <BrainCircuit className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="text-green-800 font-semibold text-sm mb-1">Advanced Transfer Learning</h4>
                <p className="text-gray-600 text-sm">
                  MobileNetV2 backbone optimized for leaf analysis with 97.8% validation accuracy across 4 disease classes.
                </p>
              </div>
            </div>

            {/* Training Strategy */}
            <div className="flex items-start group hover:bg-amber-50 p-3 rounded-xl transition-colors">
              <div className="bg-amber-100 p-2.5 rounded-xl mr-4 mt-0.5">
                <Layers className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h4 className="text-amber-800 font-semibold text-sm mb-1">Two-Phase Training</h4>
                <p className="text-gray-600 text-sm">
                  Frozen backbone initialization followed by selective layer fine-tuning for optimal feature extraction.
                </p>
              </div>
            </div>

            {/* Class Balancing */}
            <div className="flex items-start group hover:bg-violet-50 p-3 rounded-xl transition-colors">
              <div className="bg-violet-100 p-2.5 rounded-xl mr-4 mt-0.5">
                <Scale className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <h4 className="text-violet-800 font-semibold text-sm mb-1">Smart Class Weighting</h4>
                <p className="text-gray-600 text-sm">
                  Adaptive class balancing handles dataset imbalances for reliable minority-class predictions.
                </p>
              </div>
            </div>

            {/* Data Augmentation */}
            <div className="flex items-start group hover:bg-blue-50 p-3 rounded-xl transition-colors">
              <div className="bg-blue-100 p-2.5 rounded-xl mr-4 mt-0.5">
                <ImagePlus className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-blue-800 font-semibold text-sm mb-1">Enhanced Augmentation</h4>
                <p className="text-gray-600 text-sm">
                  12 transformation techniques including multi-axis flipping and luminosity adjustment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechInfoPanel;