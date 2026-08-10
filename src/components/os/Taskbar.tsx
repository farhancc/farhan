'use client';

import React, { useState, useEffect } from 'react';
import { useOSStore } from '@/store/osStore';

export const Taskbar = () => {
  const { windows, activeWindowId, toggleWindow, toggleStartMenu, minimizeAll } = useOSStore();
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 w-full h-[30px] bg-gradient-to-b from-[#245EDC] via-[#3f8cf3] to-[#245EDC] flex items-center z-[9999] justify-between select-none shadow-[0_-1px_3px_rgba(0,0,0,0.5)]">
      <div className="h-full flex items-center shrink-0">
        <button 
          onClick={(e) => { e.stopPropagation(); toggleStartMenu(); }}
          className="h-full pr-5 pl-2 italic font-bold text-white text-sm bg-gradient-to-b from-[#38A535] via-[#4EA52D] to-[#25821A] hover:brightness-110 active:brightness-90 rounded-r-2xl border-r border-[#ffffff4d] shadow-[3px_0_4px_rgba(0,0,0,0.4)] flex items-center shadow-[inset_2px_2px_4px_rgba(255,255,255,0.6)] z-50 overflow-hidden"
          style={{ borderRadius: '0 20px 20px 0' }}
        >
          <div className="flex mr-1.5 items-center justify-center filter drop-shadow-[1px_1px_2px_rgba(0,0,0,0.6)]">
             <svg width="20" height="20" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
               {/* Red Top-Left Pane */}
               <path d="M10 20C24 11 38 19 42 17V40C38 42 24 34 10 43V20Z" fill="url(#xp-red)"/>
               {/* Green Top-Right Pane */}
               <path d="M46 17C50 19 64 11 78 20V43C64 34 50 42 46 40V17Z" fill="url(#xp-green)"/>
               {/* Blue Bottom-Left Pane */}
               <path d="M10 47C24 38 38 46 42 44V67C38 69 24 61 10 70V47Z" fill="url(#xp-blue)"/>
               {/* Yellow Bottom-Right Pane */}
               <path d="M46 44C50 46 64 38 78 47V70C64 61 50 69 46 67V44Z" fill="url(#xp-yellow)"/>
               <defs>
                 <linearGradient id="xp-red" x1="10" y1="17" x2="42" y2="43" gradientUnits="userSpaceOnUse">
                   <stop stopColor="#FF6B4A"/>
                   <stop offset="0.6" stopColor="#EE3816"/>
                   <stop offset="1" stopColor="#B31A00"/>
                 </linearGradient>
                 <linearGradient id="xp-green" x1="46" y1="17" x2="78" y2="43" gradientUnits="userSpaceOnUse">
                   <stop stopColor="#9BD835"/>
                   <stop offset="0.6" stopColor="#70B814"/>
                   <stop offset="1" stopColor="#448000"/>
                 </linearGradient>
                 <linearGradient id="xp-blue" x1="10" y1="44" x2="42" y2="70" gradientUnits="userSpaceOnUse">
                   <stop stopColor="#3FA5F6"/>
                   <stop offset="0.6" stopColor="#0072E3"/>
                   <stop offset="1" stopColor="#0043A4"/>
                 </linearGradient>
                 <linearGradient id="xp-yellow" x1="46" y1="44" x2="78" y2="70" gradientUnits="userSpaceOnUse">
                   <stop stopColor="#FFDE43"/>
                   <stop offset="0.6" stopColor="#F5B400"/>
                   <stop offset="1" stopColor="#C68200"/>
                 </linearGradient>
               </defs>
             </svg>
          </div>
          <span className="text-[17px] drop-shadow-[1px_1px_3px_rgba(0,0,0,0.8)] ml-1 font-sans tracking-wide pb-0.5">start</span>
        </button>

        {/* Quick Launch */}
        <div className="flex items-center space-x-1 pl-3 pr-2 h-full z-10 border-r border-[#1042AF] border-opacity-40 shadow-[1px_0_1px_rgba(255,255,255,0.2)]">
          <button className="w-5 h-5 flex items-center justify-center hover:bg-white/20 rounded-sm" title="Show Desktop" onClick={minimizeAll}>
            <svg viewBox="0 0 48 48" className="w-4 h-4" style={{ filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.5))' }}><path fill="#2196F3" d="M4 8h40v32H4z"/><path fill="#1976D2" d="M8 12h32v24H8z"/><path fill="#FFF" d="M12 16h24v16H12z"/><path fill="#0D47A1" d="M16 26h8v4h-8z"/></svg>
          </button>
          <button className="w-5 h-5 flex items-center justify-center hover:bg-white/20 rounded-sm" title="Internet Explorer">
            <svg viewBox="0 0 48 48" className="w-4 h-4 ml-0.5" style={{ filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.5))' }}><circle cx="24" cy="24" r="20" fill="#29B6F6"/><path fill="#0288D1" d="M24,4C12.95,4,4,12.95,4,24s8.95,20,20,20s20-8.95,20-20S35.05,4,24,4z M24,40c-8.84,0-16-7.16-16-16S15.16,8,24,8s16,7.16,16,16S32.84,40,24,40z"/><path fill="#81D4FA" d="M24,8c-4.42,0-8,7.16-8,16s3.58,16,8,16s8-7.16,8-16S28.42,8,24,8z"/></svg>
          </button>
        </div>
      </div>

      {/* Taskbar Apps */}
      <div className="flex-1 flex px-2 space-x-[2px] overflow-x-hidden pt-[2px]">
        {windows.map(win => {
          const isActive = activeWindowId === win.id && !win.isMinimized;
          return (
            <button
              key={win.id}
              onClick={() => toggleWindow(win.id)}
              className={`flex items-center min-w-[120px] max-w-[160px] h-[25px] px-2 text-white text-xs truncate rounded-sm border outline-none font-sans transition-none shadow-sm ${
                isActive 
                  ? 'bg-gradient-to-b from-[#1E52A7] to-[#2E68D1] border-[#10378b] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.6)] text-gray-200' 
                  : 'bg-gradient-to-b from-[#3C81F3] to-[#1B5AD5] border-[#1D5ECA] hover:from-[#5A99FB] hover:to-[#3876EE] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)] hover:shadow-[inset_1px_1px_2px_rgba(255,255,255,0.6)] text-white'
              }`}
            >
              {win.icon ? (
                <img src={win.icon} className="w-4 h-4 mr-1 flex-shrink-0" alt="" draggable={false} 
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }} />
              ) : (
                <div className="w-4 h-4 mr-1 bg-white/20"></div>
              )}
              <span className="truncate tracking-wide">{win.title}</span>
            </button>
          );
        })}
      </div>

      {/* System Tray */}
      <div className="h-full px-3 flex items-center shrink-0 border-l border-[#1042AF] relative overflow-hidden bg-[#0F8CEB] text-white" style={{ background: 'linear-gradient(to right, #0F8CEB, #19B9F3)' }}>
        <div className="flex items-center justify-center w-4 h-4 bg-white/20 rounded-full mr-2 cursor-pointer border border-white/30 text-[10px] font-bold shadow-inner">
           &lt;
        </div>
        <div className="flex items-center gap-[6px] mr-3 opacity-95 drop-shadow">
             {/* Security Center Shield */}
             <svg viewBox="0 0 24 24" className="w-[14px] h-[14px]"><path fill="#F44336" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/><path fill="#FFC107" d="M12 3v18c4.46-1.12 7.82-5.71 7.82-10V6.3z"/></svg>
             {/* Sound */}
             <button 
               title="Play Windows Sound" 
               onClick={(e) => { e.stopPropagation(); (window as any).playStartupSound?.(); }} 
               className="hover:scale-125 active:scale-95 transition-transform outline-none cursor-pointer flex items-center justify-center"
             >
               <svg viewBox="0 0 24 24" className="w-[14px] h-[14px]"><path fill="#fff" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
             </button>
             {/* Safe Remove */}
             <svg viewBox="0 0 24 24" className="w-[14px] h-[14px]"><circle cx="12" cy="12" r="10" fill="#4CAF50"/><path fill="#fff" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
        </div>
        <span className="text-white text-[11px] font-sans tracking-tight">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
};
