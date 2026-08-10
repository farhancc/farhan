'use client';

import React, { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import { fileSystem } from '@/config/fileSystem';

export const StartMenu = () => {
  const { isStartMenuOpen, closeStartMenu, openWindow } = useOSStore();
  const [showRunDialog, setShowRunDialog] = useState(false);
  const [runInput, setRunInput] = useState('');
  const [showShutdownModal, setShowShutdownModal] = useState(false);
  const [shutdownState, setShutdownState] = useState<'normal' | 'shuttingdown'>('normal');

  if (!isStartMenuOpen && !showRunDialog && !showShutdownModal) return null;

  const handleRunSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = runInput.trim().toLowerCase();
    setShowRunDialog(false);
    setRunInput('');
    closeStartMenu();

    if (cmd === 'projects' || cmd === 'project') {
      openWindow('explorer', 'Projects', { props: { folderId: 'projects' } });
    } else if (cmd === 'resume' || cmd === 'cv') {
      openWindow('notepad', 'Resume.txt', { props: { content: fileSystem['resume-txt']?.content } });
    } else if (cmd === 'contact' || cmd === 'email' || cmd === 'mail') {
      openWindow('notepad', 'Contact.txt', { props: { content: fileSystem['contact']?.content } });
    } else if (cmd === 'about' || cmd === 'about me') {
      openWindow('notepad', 'About Me.txt', { props: { content: fileSystem['about-me']?.content } });
    } else if (cmd === 'github') {
      window.open('https://github.com/farhancc', '_blank');
    } else if (cmd === 'linkedin') {
      window.open('https://www.linkedin.com/in/farhan-cc', '_blank');
    } else {
      openWindow('explorer', 'My Computer', { props: { folderId: 'my-computer' } });
    }
  };

  const handleShutdown = () => {
    setShutdownState('shuttingdown');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <>
      {/* Shutdown Modal */}
      {showShutdownModal && (
        <div className="fixed inset-0 z-[100000] bg-black/60 backdrop-grayscale flex items-center justify-center select-none">
          {shutdownState === 'shuttingdown' ? (
            <div className="bg-[#004E98] text-white p-8 rounded-lg shadow-2xl border-2 border-white/20 text-center space-y-4 animate-fade-in">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              <h2 className="text-xl font-bold font-sans">Windows is shutting down...</h2>
            </div>
          ) : (
            <div className="w-[360px] bg-gradient-to-b from-[#0055EA] via-[#3A93FF] to-[#0055EA] p-1 rounded-t-lg rounded-b-md shadow-2xl border-2 border-[#002D96]">
              {/* Header */}
              <div className="flex justify-between items-center px-3 py-1.5 text-white font-bold text-sm">
                <span>Turn off computer</span>
                <button onClick={() => setShowShutdownModal(false)} className="bg-[#E55225] hover:brightness-110 px-2 py-0.5 rounded text-xs">✕</button>
              </div>
              
              {/* Content */}
              <div className="bg-[#0038A8] p-6 flex justify-around items-center border-t border-b border-[#002D96]">
                {/* Stand By */}
                <button 
                  onClick={() => setShowShutdownModal(false)}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-b from-[#FFDC00] to-[#E6B800] border border-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent"></div>
                  </div>
                  <span className="text-xs text-white font-bold group-hover:underline">Stand By</span>
                </button>

                {/* Turn Off */}
                <button 
                  onClick={handleShutdown}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-b from-[#FF4D4D] to-[#D60000] border border-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/></svg>
                  </div>
                  <span className="text-xs text-white font-bold group-hover:underline">Turn Off</span>
                </button>

                {/* Restart */}
                <button 
                  onClick={handleShutdown}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-b from-[#4CAF50] to-[#2E7D32] border border-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>
                  </div>
                  <span className="text-xs text-white font-bold group-hover:underline">Restart</span>
                </button>
              </div>

              {/* Footer */}
              <div className="bg-[#0055EA] p-2 flex justify-end">
                <button 
                  onClick={() => setShowShutdownModal(false)}
                  className="px-4 py-1 bg-[#ECE9D8] text-black border border-white rounded text-xs font-bold shadow hover:bg-white active:bg-gray-200 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Run Dialog */}
      {showRunDialog && (
        <div className="fixed inset-0 z-[100000] bg-black/20 flex items-center justify-center select-none">
          <div className="w-[380px] bg-[#ECE9D8] rounded-t-lg rounded-b border-[3px] border-[#0055EA] shadow-2xl overflow-hidden font-sans text-xs">
            <div className="bg-gradient-to-r from-[#0058EE] to-[#3A93FF] px-2 py-1 flex justify-between items-center text-white font-bold">
              <span>Run</span>
              <button onClick={() => setShowRunDialog(false)} className="text-xs bg-[#E55225] px-1.5 rounded hover:brightness-110">✕</button>
            </div>
            <form onSubmit={handleRunSubmit} className="p-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-lg">▶</div>
                <p className="text-gray-700">Type the name of a program, folder, or document (e.g. <b>projects</b>, <b>resume</b>, <b>contact</b>, <b>github</b>), and Windows will open it for you.</p>
              </div>
              <div className="flex items-center gap-2">
                <label className="font-bold text-gray-700">Open:</label>
                <input 
                  type="text" 
                  autoFocus
                  value={runInput} 
                  onChange={(e) => setRunInput(e.target.value)} 
                  placeholder="projects"
                  className="flex-1 bg-white border border-[#7F9DB9] px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-blue-500 rounded-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="submit" className="px-4 py-1 bg-[#ECE9D8] border border-[#003c74] rounded text-xs font-bold hover:bg-white active:bg-gray-300 shadow-sm cursor-pointer">OK</button>
                <button type="button" onClick={() => setShowRunDialog(false)} className="px-4 py-1 bg-[#ECE9D8] border border-gray-400 rounded text-xs hover:bg-white active:bg-gray-300 shadow-sm cursor-pointer">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Start Menu */}
      {isStartMenuOpen && (
        <div 
          className="absolute bottom-[30px] left-0 w-[410px] bg-white rounded-t-lg shadow-2xl z-[10000] flex flex-col border-[2px] border-[#0831D9] overflow-hidden rounded-br-none"
          onClick={(e) => e.stopPropagation()} 
          style={{ filter: 'drop-shadow(3px 3px 8px rgba(0,0,0,0.6))' }}
        >
          {/* Header */}
          <div className="h-[60px] bg-gradient-to-r from-[#1858E5] via-[#488BF2] to-[#1858E5] flex items-center px-3 relative border-b-2 border-orange-400 shadow-inner">
            <div className="w-[46px] h-[46px] rounded-md border-2 border-white overflow-hidden shadow-md bg-white flex items-center justify-center flex-shrink-0">
              <img src="/farhan.png" alt="Farhan CC" className="w-full h-full object-cover" />
            </div>
            <div className="ml-3 text-white font-bold text-lg drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)] tracking-wide font-sans">
              Farhan CC
            </div>
          </div>

          {/* Body */}
          <div className="flex bg-white min-h-[380px]">
            {/* Left Column (Pinned & Programs) */}
            <div className="w-[235px] flex flex-col p-1 bg-white font-sans text-[11px]">
              {/* Pinned Items */}
              <div className="space-y-0.5">
                <button 
                  className="w-full flex items-center p-1.5 rounded hover:bg-[#2F71CD] hover:text-white group transition-colors cursor-pointer" 
                  onClick={() => { 
                    openWindow('browser', 'Internet Explorer', { props: { url: 'https://www.wikipedia.org' } }); 
                    closeStartMenu(); 
                  }}
                >
                  <div className="w-7 h-7 mr-2.5 flex-shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-7 h-7 drop-shadow-sm"><circle cx="24" cy="24" r="20" fill="#29B6F6"/><path fill="#0288D1" d="M24,4C12.95,4,4,12.95,4,24s8.95,20,20,20s20-8.95,20-20S35.05,4,24,4z M24,40c-8.84,0-16-7.16-16-16S15.16,8,24,8s16,7.16,16,16S32.84,40,24,40z"/><path fill="#81D4FA" d="M24,8c-4.42,0-8,7.16-8,16s3.58,16,8,16s8-7.16,8-16S28.42,8,24,8z"/></svg>
                  </div>
                  <div className="text-left leading-tight">
                    <div className="font-bold text-[12px] text-[#222] group-hover:text-white">Internet</div>
                    <div className="text-[10px] text-gray-500 group-hover:text-blue-100">Internet Explorer</div>
                  </div>
                </button>

                <button 
                  className="w-full flex items-center p-1.5 rounded hover:bg-[#2F71CD] hover:text-white group transition-colors cursor-pointer"
                  onClick={() => { 
                    openWindow('notepad', 'Contact.txt', { props: { content: fileSystem['contact']?.content } }); 
                    closeStartMenu(); 
                  }}
                >
                  <div className="w-7 h-7 mr-2.5 flex-shrink-0 bg-gradient-to-b from-amber-400 to-amber-500 flex items-center justify-center rounded shadow-sm">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  </div>
                  <div className="text-left leading-tight">
                    <div className="font-bold text-[12px] text-[#222] group-hover:text-white">E-mail</div>
                    <div className="text-[10px] text-gray-500 group-hover:text-blue-100">farhancc123@gmail.com</div>
                  </div>
                </button>
              </div>

              <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent my-1.5"></div>

              {/* Frequent Portfolio Shortcuts */}
              <div className="flex-1 space-y-0.5">
                <button 
                  className="w-full flex items-center p-1.5 rounded hover:bg-[#2F71CD] hover:text-white group transition-colors cursor-pointer" 
                  onClick={() => { openWindow('explorer', 'Projects', { props: { folderId: 'projects' } }); closeStartMenu(); }}
                >
                  <div className="w-7 h-7 mr-2.5 flex-shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-6 h-6 drop-shadow-sm"><path fill="#FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"/><path fill="#FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"/></svg>
                  </div>
                  <span className="font-medium text-[#222] group-hover:text-white">Portfolio Projects</span>
                </button>

                <button 
                  className="w-full flex items-center p-1.5 rounded hover:bg-[#2F71CD] hover:text-white group transition-colors cursor-pointer" 
                  onClick={() => { openWindow('notepad', 'About Me.txt', { props: { content: fileSystem['about-me']?.content } }); closeStartMenu(); }}
                >
                  <div className="w-7 h-7 mr-2.5 flex-shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-6 h-6 drop-shadow-sm"><path fill="#90CAF9" d="M38 6H10c-2.2 0-4 1.8-4 4v28c0 2.2 1.8 4 4 4h28c2.2 0 4-1.8 4-4V10c0-2.2-1.8-4-4-4z"/><path fill="#FFF" d="M12 12h24v2H12zM12 18h24v2H12zM12 24h24v2H12zM12 30h16v2H12z"/></svg>
                  </div>
                  <span className="font-medium text-[#222] group-hover:text-white">About Farhan.txt</span>
                </button>

                <button 
                  className="w-full flex items-center p-1.5 rounded hover:bg-[#2F71CD] hover:text-white group transition-colors cursor-pointer" 
                  onClick={() => { openWindow('notepad', 'Resume.txt', { props: { content: fileSystem['resume-txt']?.content } }); closeStartMenu(); }}
                >
                  <div className="w-7 h-7 mr-2.5 flex-shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-6 h-6 drop-shadow-sm"><path fill="#F44336" d="M8,8v32h32V16l-8-8H8z"/><path fill="#B71C1C" d="M32,16h8l-8-8V16z"/><path fill="white" d="M16,22h16v2H16z M16,27h16v2H16z M16,32h8v2H16z"/></svg>
                  </div>
                  <span className="font-medium text-[#222] group-hover:text-white">Resume & Experience</span>
                </button>

                <button 
                  className="w-full flex items-center p-1.5 rounded hover:bg-[#2F71CD] hover:text-white group transition-colors cursor-pointer" 
                  onClick={() => { openWindow('notepad', 'Skills.txt', { props: { content: fileSystem['skills-txt']?.content } }); closeStartMenu(); }}
                >
                  <div className="w-7 h-7 mr-2.5 flex-shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-6 h-6 drop-shadow-sm"><path fill="#4CAF50" d="M24 4L6 14v20l18 10 18-10V14L24 4z"/><path fill="#81C784" d="M24 8l14 8v16l-14 8-14-8V16l14-8z"/></svg>
                  </div>
                  <span className="font-medium text-[#222] group-hover:text-white">Technical Skills.txt</span>
                </button>
              </div>

              <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent my-1 mt-auto"></div>

              {/* All Programs button */}
              <button 
                onClick={() => { openWindow('explorer', 'Projects', { props: { folderId: 'projects' } }); closeStartMenu(); }}
                className="flex items-center justify-center p-1.5 font-bold text-[#222] hover:bg-[#2F71CD] hover:text-white cursor-pointer group rounded transition-colors my-0.5"
              >
                <span className="text-[11px] font-sans">All Programs</span>
                <svg className="w-4 h-4 ml-2 text-emerald-600 drop-shadow border border-white rounded-full bg-white group-hover:bg-[#2F71CD] group-hover:text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
              </button>
            </div>

            {/* Right Column (System Folders & Control Panel) */}
            <div className="w-[175px] bg-[#D3E5FA] flex flex-col pt-1 pb-2 border-l border-[#A7C6ED] font-sans text-[11px] font-bold">
              <div className="border-b border-[#A7C6ED] pb-1 px-1 space-y-0.5">
                <button 
                  className="w-full flex items-center p-1.5 rounded hover:bg-[#2F71CD] hover:text-white group transition-colors cursor-pointer" 
                  onClick={() => { openWindow('explorer', 'My Documents', { props: { folderId: 'c-drive' } }); closeStartMenu(); }}
                >
                  <svg viewBox="0 0 48 48" className="w-5 h-5 mr-2 drop-shadow-sm flex-shrink-0"><path fill="#FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"/><path fill="#FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"/></svg>
                  <span className="text-[#0c327d] group-hover:text-white">My Documents</span>
                </button>

                <button 
                  className="w-full flex items-center p-1.5 rounded hover:bg-[#2F71CD] hover:text-white group transition-colors cursor-pointer"
                  onClick={() => { openWindow('explorer', 'My Projects', { props: { folderId: 'projects' } }); closeStartMenu(); }}
                >
                  <svg viewBox="0 0 48 48" className="w-5 h-5 mr-2 drop-shadow-sm flex-shrink-0"><path fill="#4CAF50" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"/><path fill="#81C784" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"/></svg>
                  <span className="text-[#0c327d] group-hover:text-white">My Projects</span>
                </button>

                <button 
                  className="w-full flex items-center p-1.5 rounded hover:bg-[#2F71CD] hover:text-white group transition-colors cursor-pointer" 
                  onClick={() => { openWindow('explorer', 'My Computer', { props: { folderId: 'my-computer' } }); closeStartMenu(); }}
                >
                  <svg viewBox="0 0 48 48" className="w-5 h-5 mr-2 drop-shadow-sm flex-shrink-0"><rect x="6" y="32" width="36" height="11" rx="1" fill="#D4D0C8" stroke="#808080" strokeWidth="1"/><rect x="7" y="33" width="34" height="9" fill="#ECE9D8"/><rect x="5" y="4" width="38" height="26" rx="2" fill="#D4D0C8" stroke="#808080" strokeWidth="1"/><rect x="10" y="8" width="28" height="18" fill="#0058EE"/></svg>
                  <span className="text-[#0c327d] group-hover:text-white">My Computer</span>
                </button>
              </div>

              <div className="my-1 border-b border-[#A7C6ED] pb-1 px-1">
                <button 
                  className="w-full flex items-center p-1.5 rounded hover:bg-[#2F71CD] hover:text-white group transition-colors cursor-pointer"
                  onClick={() => { openWindow('notepad', 'Skills.txt', { props: { content: fileSystem['skills-txt']?.content } }); closeStartMenu(); }}
                >
                  <svg viewBox="0 0 48 48" className="w-5 h-5 mr-2 drop-shadow-sm flex-shrink-0"><circle cx="24" cy="24" r="20" fill="#E91E63"/><path fill="#FFF" d="M24 10v28M10 24h28"/></svg>
                  <span className="text-[#0c327d] group-hover:text-white">Control Panel</span>
                </button>
              </div>

              <div className="mt-0.5 px-1 space-y-0.5">
                <button 
                  className="w-full flex items-center p-1.5 rounded hover:bg-[#2F71CD] hover:text-white group transition-colors cursor-pointer"
                  onClick={() => { window.open('https://github.com/farhancc', '_blank'); closeStartMenu(); }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 drop-shadow-sm flex-shrink-0" fill="#181717"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  <span className="text-[#0c327d] group-hover:text-white">GitHub Profile</span>
                </button>

                <button 
                  className="w-full flex items-center p-1.5 rounded hover:bg-[#2F71CD] hover:text-white group transition-colors cursor-pointer"
                  onClick={() => { openWindow('explorer', 'Projects', { props: { folderId: 'projects' } }); closeStartMenu(); }}
                >
                  <svg viewBox="0 0 48 48" className="w-5 h-5 mr-2 drop-shadow-sm flex-shrink-0"><path fill="#FF9800" d="M38 16H10c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h28c2.2 0 4-1.8 4-4V20c0-2.2-1.8-4-4-4z"/><circle cx="24" cy="28" r="4" fill="#FFF"/></svg>
                  <span className="text-[#0c327d] group-hover:text-white">Search</span>
                </button>

                <button 
                  className="w-full flex items-center p-1.5 rounded hover:bg-[#2F71CD] hover:text-white group transition-colors cursor-pointer" 
                  onClick={() => { setShowRunDialog(true); closeStartMenu(); }}
                >
                  <svg viewBox="0 0 48 48" className="w-5 h-5 mr-2 drop-shadow-sm flex-shrink-0"><path fill="#2196F3" d="M40 18H8c-2.2 0-4 1.8-4 4v16h40V22c0-2.2-1.8-4-4-4z"/><path fill="#1976D2" d="M8 10h32v8H8z"/></svg>
                  <span className="text-[#0c327d] group-hover:text-white">Run...</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="h-[44px] bg-gradient-to-r from-[#1858E5] via-[#488BF2] to-[#1858E5] flex items-center justify-end px-3 border-t border-[#A6CFF8] space-x-3">
            <button 
              onClick={() => { closeStartMenu(); openWindow('notepad', 'Contact.txt', { props: { content: fileSystem['contact']?.content } }); }}
              className="flex items-center space-x-1.5 text-white hover:brightness-110 active:brightness-90 group focus:outline-none cursor-pointer"
            >
              <div className="w-6 h-6 rounded bg-gradient-to-b from-[#FFC107] to-[#FFA000] border border-white flex items-center justify-center shadow-sm">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4v16l11-8L10 4z"/></svg>
              </div>
              <span className="text-[12px] font-bold group-hover:underline font-sans">Log Off</span>
            </button>
            <button 
              onClick={() => { closeStartMenu(); setShowShutdownModal(true); }}
              className="flex items-center space-x-1.5 text-white hover:brightness-110 active:brightness-90 group focus:outline-none cursor-pointer"
            >
              <div className="w-6 h-6 rounded bg-gradient-to-b from-[#FF5252] to-[#D32F2F] border border-white flex items-center justify-center shadow-sm">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/></svg>
              </div>
              <span className="text-[12px] font-bold group-hover:underline font-sans">Turn Off Computer</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
