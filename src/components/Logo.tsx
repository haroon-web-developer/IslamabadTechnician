import { Zap } from 'lucide-react';
import { useState } from 'react';

export default function Logo({ className = "w-6 h-6" }: { className?: string }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return <Zap className={`text-yellow-400 ${className}`} />;
  }

  return (
    <img 
      src="/logo.png" 
      alt="IslamabadTechnician Logo" 
      className={`object-contain rounded-xl ${className}`} 
      onError={() => setImgError(true)} 
    />
  );
}
