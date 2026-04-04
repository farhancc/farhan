'use client';

import React, { useEffect, useState } from 'react';

export const BootScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center select-none cursor-none">
      <div className="flex flex-col items-center mb-16 scale-125">
        <div className="flex mb-2">
           <svg width="60" height="60" viewBox="0 0 100 100">
             <path fill="#f05335" d="M10,25 C30,10 45,25 45,25 L45,45 C25,45 15,35 10,45 Z"/>
             <path fill="#7abc15" d="M50,30 C70,15 90,30 90,30 L90,50 C70,50 60,40 50,50 Z"/>
             <path fill="#029ced" d="M10,50 C30,35 45,50 45,50 L45,70 C25,70 15,60 10,70 Z"/>
             <path fill="#ffb801" d="M50,55 C70,40 90,55 90,55 L90,75 C70,75 60,65 50,75 Z"/>
           </svg>
        </div>
        <div className="text-white text-3xl font-bold flex items-end">
          Microsoft<span className="text-4xl ml-2 font-black italic">Windows</span>
          <span className="text-[#f18e1c] text-xs font-black pb-1 ml-1">XP</span>
        </div>
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent mt-1" />
      </div>

      {/* Loading Bar Container */}
      <div className="w-48 h-4 border-2 border-gray-600 rounded-sm p-[2px] relative overflow-hidden bg-black">
        <div className="flex space-x-1 animate-xp-loading h-full">
           <div className="w-3 h-full bg-gradient-to-b from-[#245EDC] via-[#3f8cf3] to-[#245EDC] rounded-sm shadow-[0_0_5px_#3f8cf3]" />
           <div className="w-3 h-full bg-gradient-to-b from-[#245EDC] via-[#3f8cf3] to-[#245EDC] rounded-sm shadow-[0_0_5px_#3f8cf3]" />
           <div className="w-3 h-full bg-gradient-to-b from-[#245EDC] via-[#3f8cf3] to-[#245EDC] rounded-sm shadow-[0_0_5px_#3f8cf3]" />
        </div>
      </div>

      <div className="absolute bottom-10 text-white/40 text-[10px] font-sans italic">
        Copyright © Microsoft Corporation
      </div>

      <style jsx>{`
        @keyframes xp-loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .animate-xp-loading {
          animation: xp-loading 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
};
