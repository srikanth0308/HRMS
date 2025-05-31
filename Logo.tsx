import { Feather } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white">
        <Feather className="w-6 h-6" />
      </div>
      <div className="ml-2">
        <h1 className="text-xl font-bold text-purple-600">Radha Sharma</h1>
        <p className="text-xs text-gray-500">Streamline Simplify Success</p>
      </div>
    </div>
  );
};

export default Logo;