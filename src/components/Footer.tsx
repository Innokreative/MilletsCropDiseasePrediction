import { Sprout, Leaf, ExternalLink, GitBranchPlus, Info, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sprout className="h-6 w-6 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">Millet Crop Guard</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              An intelligent disease detection and management system for millet crops,
              powered by advanced AI and computer vision technologies.
            </p>
            <div className="mt-4 flex space-x-2">
              <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors">
                <GitBranchPlus className="h-4 w-4 text-gray-400" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors">
                <Mail className="h-4 w-4 text-gray-400" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors">
                <Info className="h-4 w-4 text-gray-400" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Leaf className="h-5 w-5 mr-2 text-emerald-400" />
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-400 flex items-center transition-colors">
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  Comprehensive Disease Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-400 flex items-center transition-colors">
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  Advanced Treatment Protocols
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-400 flex items-center transition-colors">
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  Agricultural Research Papers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-400 flex items-center transition-colors">
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  Sustainable Farming Practices
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Connect With Us</h3>
            <div className="bg-gray-800 p-4 rounded-lg">
              <form>
                <div className="mb-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                >
                  Subscribe to Updates
                </button>
              </form>
              <p className="mt-3 text-xs text-gray-500">
                Get the latest news and updates on crop disease management.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-500">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Millet Crop Guard. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;