'use client';

import React from 'react';
import { useOSStore } from '@/store/osStore';

export const StartMenu = () => {
  const { isStartMenuOpen, closeStartMenu, openWindow } = useOSStore();

  if (!isStartMenuOpen) return null;

  return (
    <div 
      className="absolute bottom-[30px] left-0 w-[400px] bg-white rounded-t-lg shadow-2xl z-[10000] flex flex-col border-[2px] border-[#0831D9] overflow-visible rounded-br-none"
      onClick={(e) => e.stopPropagation()} 
      style={{ filter: 'drop-shadow(2px 2px 5px rgba(0,0,0,0.5))' }}
    >
      {/* Header */}
      <div className="h-[55px] bg-gradient-to-b from-[#1858E5] via-[#488BF2] to-[#1858E5] flex items-center px-2 relative rounded-t-sm border-b-2 border-orange-400">
        <div className="w-[48px] h-[48px] absolute top-[-5px] left-2 bg-white rounded-md border-2 border-white overflow-hidden shadow-md flex items-center justify-center bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Soccer_ball.svg')] bg-cover">
           {/* Chess/Soccer ball avatar usually goes here */}
        </div>
        <div className="ml-14 text-white font-bold text-lg drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] tracking-wide">
           Administrator
        </div>
      </div>

      {/* Body */}
      <div className="flex bg-white min-h-[380px]">
        {/* Left Column */}
        <div className="w-[230px] flex flex-col p-[2px] bg-white font-sans text-[11px]">
          {/* Pinned Items */}
          <div className="p-1 pb-2">
            <button className="w-full flex items-center p-1.5 hover:bg-[#2F71CD] hover:text-white group" onClick={() => { openWindow('browser', 'Internet', { props: { url: 'https://google.com' }}); closeStartMenu(); }}>
              <div className="w-8 h-8 mr-2 flex-shrink-0 flex items-center justify-center">
                 <svg viewBox="0 0 48 48" className="w-[30px] h-[30px] drop-shadow-sm"><circle cx="24" cy="24" r="20" fill="#29B6F6"/><path fill="#0288D1" d="M24,4C12.95,4,4,12.95,4,24s8.95,20,20,20s20-8.95,20-20S35.05,4,24,4z M24,40c-8.84,0-16-7.16-16-16S15.16,8,24,8s16,7.16,16,16S32.84,40,24,40z"/><path fill="#81D4FA" d="M24,8c-4.42,0-8,7.16-8,16s3.58,16,8,16s8-7.16,8-16S28.42,8,24,8z"/></svg>
              </div>
              <div className="text-left leading-tight">
                <div className="font-bold text-[12px] text-[#3b3b3b] group-hover:text-white">Internet</div>
                <div className="text-[10px] text-gray-500 group-hover:text-blue-100">Internet Explorer</div>
              </div>
            </button>
            <button className="w-full flex items-center p-1.5 mt-0.5 hover:bg-[#2F71CD] hover:text-white group">
              <div className="w-8 h-8 mr-2 flex-shrink-0 bg-yellow-400 flex items-center justify-center rounded drop-shadow-sm">
                 <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </div>
              <div className="text-left leading-tight">
                <div className="font-bold text-[12px] text-[#3b3b3b] group-hover:text-white">E-mail</div>
                <div className="text-[10px] text-gray-500 group-hover:text-blue-100">Outlook Express</div>
              </div>
            </button>
          </div>
          
          <div className="h-[2px] bg-gradient-to-r from-white via-gray-300 to-white mx-1 my-0.5"></div>
          
          {/* Recent Items */}
          <div className="flex-1 p-1">
             <button className="w-full flex items-center p-1.5 hover:bg-[#2F71CD] hover:text-white group" onClick={() => { openWindow('explorer', 'Projects', { props: { folderId: 'projects' } }); closeStartMenu(); }}>
               <div className="w-8 h-8 mr-2 flex-shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 48 48" className="w-[28px] h-[28px] drop-shadow-sm"><path fill="#FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"/><path fill="#FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"/></svg>
               </div>
               <span className="text-[#3b3b3b] group-hover:text-white">Portfolio Explorer</span>
             </button>
             {/* Fake spacer items to fill menu visually */}
             <button className="w-full flex items-center p-1.5 hover:bg-[#2F71CD] hover:text-white group" onClick={() => { openWindow('browser', 'Notepad', { props: { url: 'https://example.com' } }); closeStartMenu(); }}>
               <div className="w-8 h-8 mr-2 flex-shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 48 48" className="w-[26px] h-[26px] drop-shadow-sm"><path fill="#90CAF9" d="M38 6H10c-2.2 0-4 1.8-4 4v28c0 2.2 1.8 4 4 4h28c2.2 0 4-1.8 4-4V10c0-2.2-1.8-4-4-4z"/><path fill="#FFF" d="M12 12h24v2H12zM12 18h24v2H12zM12 24h24v2H12zM12 30h16v2H12z"/></svg>
               </div>
               <span className="text-[#3b3b3b] group-hover:text-white">Notepad</span>
             </button>
          </div>
          
          <div className="h-[2px] bg-gradient-to-r from-white via-gray-300 to-white mx-1 mb-1 mt-auto"></div>
          
          {/* All Programs button */}
          <div className="flex justify-center p-1 font-bold text-[#3b3b3b] hover:bg-[#2F71CD] hover:text-white cursor-default group mx-1 mb-1 shadow-sm items-center py-1.5">
             <span className="text-[11px]">All Programs</span>
             <svg className="w-4 h-4 ml-2 text-green-600 drop-shadow border border-white rounded-full bg-white group-hover:bg-[#2F71CD]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-[170px] bg-[#D3E5FA] flex flex-col pt-1 pb-2 border-l border-[#A7C6ED] font-sans text-[11px] font-bold">
          <div className="my-1 border-b border-[#A7C6ED] pb-1 px-1">
            <button className="w-full flex items-center p-1.5 hover:bg-[#2F71CD] hover:text-white group" onClick={() => { openWindow('explorer', 'My Documents', { props: { folderId: 'projects' } }); closeStartMenu(); }}>
              <svg viewBox="0 0 48 48" className="w-[24px] h-[24px] mr-2 drop-shadow-sm"><path fill="#FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"/><path fill="#FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"/></svg>
              <span className="text-[#0c327d] group-hover:text-white">My Documents</span>
            </button>
            <button className="w-full flex items-center p-1.5 hover:bg-[#2F71CD] hover:text-white group">
              <svg viewBox="0 0 48 48" className="w-[24px] h-[24px] mr-2 drop-shadow-sm"><path fill="#4CAF50" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"/><path fill="#81C784" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"/></svg>
              <span className="text-[#0c327d] group-hover:text-white">My Pictures</span>
            </button>
            <button className="w-full flex items-center p-1.5 hover:bg-[#2F71CD] hover:text-white group">
              <svg viewBox="0 0 48 48" className="w-[24px] h-[24px] mr-2 drop-shadow-sm"><path fill="#00BCD4" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"/><path fill="#4DD0E1" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"/></svg>
              <span className="text-[#0c327d] group-hover:text-white">My Music</span>
            </button>
            <button className="w-full flex items-center p-1.5 hover:bg-[#2F71CD] hover:text-white group" onClick={() => { openWindow('explorer', 'My Computer', { props: { folderId: 'my-computer' } }); closeStartMenu(); }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-[24px] h-[24px] mr-2 drop-shadow-sm"><path fill="#37474F" d="M4,34h40V12c0-2.2-1.8-4-4-4H8c-2.2,0-4,1.8-4,4V34z"/><path fill="#81D4FA" d="M8,12h32v18H8V12z"/><path fill="#B0BEC5" d="M16,34h16v6H16V34z"/><path fill="#78909C" d="M12,40h24v4H12V40z"/></svg>
              <span className="text-[#0c327d] group-hover:text-white">My Computer</span>
            </button>
          </div>
          
          <div className="my-1 border-b border-[#A7C6ED] pb-1 px-1">
            <button className="w-full flex items-center p-1.5 hover:bg-[#2F71CD] hover:text-white group">
              <svg viewBox="0 0 48 48" className="w-[24px] h-[24px] mr-2 drop-shadow-sm"><circle cx="24" cy="24" r="20" fill="#E91E63"/><path fill="#FFF" d="M24 10v28M10 24h28"/></svg>
              <span className="text-[#0c327d] group-hover:text-white">Control Panel</span>
            </button>
          </div>

          <div className="my-1 px-1">
            <button className="w-full flex items-center p-1.5 hover:bg-[#2F71CD] hover:text-white group">
              <svg viewBox="0 0 48 48" className="w-[24px] h-[24px] mr-2 drop-shadow-sm"><circle cx="24" cy="24" r="20" fill="#4CAF50"/><path fill="#FFF" d="M24 14l-6 10h12zM24 24l-6 10h12z"/></svg>
              <span className="text-[#0c327d] group-hover:text-white">Help and Support</span>
            </button>
            <button className="w-full flex items-center p-1.5 hover:bg-[#2F71CD] hover:text-white group">
              <svg viewBox="0 0 48 48" className="w-[24px] h-[24px] mr-2 drop-shadow-sm"><path fill="#FF9800" d="M38 16H10c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h28c2.2 0 4-1.8 4-4V20c0-2.2-1.8-4-4-4z"/><circle cx="24" cy="28" r="4" fill="#FFF"/></svg>
              <span className="text-[#0c327d] group-hover:text-white">Search</span>
            </button>
            <button className="w-full flex items-center p-1.5 hover:bg-[#2F71CD] hover:text-white group" onClick={() => { openWindow('browser', 'Run', { props: { url: 'https://bing.com' } }); closeStartMenu(); }}>
              <svg viewBox="0 0 48 48" className="w-[24px] h-[24px] mr-2 drop-shadow-sm"><path fill="#2196F3" d="M40 18H8c-2.2 0-4 1.8-4 4v16h40V22c0-2.2-1.8-4-4-4z"/><path fill="#1976D2" d="M8 10h32v8H8z"/></svg>
              <span className="text-[#0c327d] group-hover:text-white">Run...</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="h-[42px] bg-gradient-to-b from-[#1858E5] via-[#488BF2] to-[#1858E5] flex items-center justify-end px-3 rounded-b-sm border-t border-[#A6CFF8] space-x-4">
        <button className="flex items-center space-x-1 text-white hover:brightness-110 active:brightness-90 group focus:outline-none">
           <svg className="w-6 h-6 text-[#FFB600] border shadow-sm border-white rounded-sm drop-shadow" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4v16l11-8L10 4z"/></svg>
           <span className="text-[12px] font-bold group-hover:underline">Log Off</span>
        </button>
        <button className="flex items-center space-x-1 text-white hover:brightness-110 active:brightness-90 group focus:outline-none" onClick={() => { closeStartMenu(); window.close(); }}>
          <svg className="w-6 h-6 text-red-500 drop-shadow border shadow-sm border-white rounded-sm" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/></svg>
          <span className="text-[12px] font-bold group-hover:underline">Turn Off Computer</span>
        </button>
      </div>
    </div>
  );
};
