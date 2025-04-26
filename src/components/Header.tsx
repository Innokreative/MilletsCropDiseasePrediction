import { Sprout, AlertTriangle, Droplet, Leaf, Sun } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 text-white shadow-lg border-b-4 border-emerald-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="bg-white/20 p-3 rounded-full shadow-inner border border-white/30 backdrop-blur-sm">
              <Sprout className="h-8 w-8 text-emerald-100" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center">
                <span className="text-amber-200">Millet</span>
                <span className="mx-1">Crop</span>
                <span className="text-emerald-200">Guard</span>
                <span className="ml-2 bg-emerald-800 text-xs px-2 py-1 rounded-md font-normal text-emerald-100">AI Powered</span>
              </h1>
              <p className="text-emerald-100 text-sm md:text-base">Smart Disease Detection & Management System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-emerald-900/50 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-sm border border-emerald-600/50 shadow-inner">
              <AlertTriangle className="h-4 w-4 text-amber-300" />
              <span className="text-emerald-50">Early detection saves crops</span>
            </div>
            
            <div className="hidden md:flex gap-1">
              <div className="bg-emerald-800/50 p-2 rounded-full shadow-inner">
                <Sun className="h-5 w-5 text-amber-300" />
              </div>
              <div className="bg-emerald-800/50 p-2 rounded-full shadow-inner">
                <Droplet className="h-5 w-5 text-blue-300" />
              </div>
              <div className="bg-emerald-800/50 p-2 rounded-full shadow-inner">
                <Leaf className="h-5 w-5 text-emerald-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;