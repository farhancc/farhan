'use client';

import React, { useState } from 'react';

export const BootScreen: React.FC<{ onStart?: () => void }> = ({ onStart }) => {
  const [bootStage, setBootStage] = useState<'loading' | 'welcome'>('loading');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setBootStage('welcome');
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const handleUserLogin = () => {
    if (onStart) onStart();
  };

  if (bootStage === 'loading') {
    return (
      <div 
        onClick={handleUserLogin}
        className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center select-none cursor-pointer"
      >
        <div className="flex flex-col items-center mb-16 scale-125">
          <div className="flex mb-3">
             <svg width="72" height="72" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
               <path d="M10 20C24 11 38 19 42 17V40C38 42 24 34 10 43V20Z" fill="url(#boot-red)"/>
               <path d="M46 17C50 19 64 11 78 20V43C64 34 50 42 46 40V17Z" fill="url(#boot-green)"/>
               <path d="M10 47C24 38 38 46 42 44V67C38 69 24 61 10 70V47Z" fill="url(#boot-blue)"/>
               <path d="M46 44C50 46 64 38 78 47V70C64 61 50 69 46 67V44Z" fill="url(#boot-yellow)"/>
               <defs>
                 <linearGradient id="boot-red" x1="10" y1="17" x2="42" y2="43" gradientUnits="userSpaceOnUse">
                   <stop stopColor="#FF6B4A"/>
                   <stop offset="0.6" stopColor="#EE3816"/>
                   <stop offset="1" stopColor="#B31A00"/>
                 </linearGradient>
                 <linearGradient id="boot-green" x1="46" y1="17" x2="78" y2="43" gradientUnits="userSpaceOnUse">
                   <stop stopColor="#9BD835"/>
                   <stop offset="0.6" stopColor="#70B814"/>
                   <stop offset="1" stopColor="#448000"/>
                 </linearGradient>
                 <linearGradient id="boot-blue" x1="10" y1="44" x2="42" y2="70" gradientUnits="userSpaceOnUse">
                   <stop stopColor="#3FA5F6"/>
                   <stop offset="0.6" stopColor="#0072E3"/>
                   <stop offset="1" stopColor="#0043A4"/>
                 </linearGradient>
                 <linearGradient id="boot-yellow" x1="46" y1="44" x2="78" y2="70" gradientUnits="userSpaceOnUse">
                   <stop stopColor="#FFDE43"/>
                   <stop offset="0.6" stopColor="#F5B400"/>
                   <stop offset="1" stopColor="#C68200"/>
                 </linearGradient>
               </defs>
             </svg>
          </div>
          <div className="text-white text-3xl font-bold flex items-end tracking-tight font-sans drop-shadow-md">
            Microsoft<span className="text-4xl ml-2 font-black italic tracking-tighter">Windows</span>
            <span className="text-[#f18e1c] text-xs font-black pb-1.5 ml-1 tracking-widest">XP</span>
          </div>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-transparent mt-2" />
        </div>

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
  }

  // Authentic Windows XP Welcome Screen
  return (
    <div 
      onClick={handleUserLogin}
      className="fixed inset-0 z-[10000] bg-gradient-to-b from-[#003399] via-[#0055dd] to-[#001155] flex flex-col justify-between select-none cursor-pointer text-white font-sans"
    >
      {/* Top Banner */}
      <div className="h-20 bg-gradient-to-r from-[#002B8C] via-[#0048C6] to-[#001E69] border-b-2 border-[#001144] flex items-center justify-between px-12 shadow-lg">
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-bold italic tracking-tight text-white drop-shadow">Microsoft Windows XP</span>
        </div>
        <div className="text-sm font-light text-blue-200">To begin, click your user name</div>
      </div>

      {/* Middle Login Account Selector */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div 
          onClick={handleUserLogin}
          className="flex items-center space-x-5 p-4 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-150 transform hover:scale-105 shadow-2xl group cursor-pointer max-w-sm"
        >
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 p-[2px] shadow-lg overflow-hidden flex items-center justify-center border-2 border-white">
            <div className="w-full h-full bg-[#0048C6] flex items-center justify-center text-2xl font-bold text-white">
              👤
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-bold text-white group-hover:text-yellow-200 transition-colors">Farhan</span>
            <span className="text-xs text-blue-200">Next.js & Full-Stack Developer</span>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="h-14 bg-gradient-to-r from-[#001E69] via-[#003399] to-[#001144] border-t-2 border-[#001144] flex items-center justify-between px-12 text-xs text-blue-200">
        <div>Turn off computer</div>
        <div>After you log on, your personal settings will be applied.</div>
      </div>
    </div>
  );
};
