'use client';

import { useOSStore } from '@/store/osStore';
import { Window } from './Window';
import { Taskbar } from './Taskbar';
import { getDesktopIcons, fileSystem } from '@/config/fileSystem';
import { Explorer } from '../apps/Explorer';
import { Browser } from '../apps/Browser';
import { StartMenu } from './StartMenu';
import { Notepad } from '../apps/Notepad';
import { useState, useEffect, useRef, useCallback } from 'react';
import { BootScreen } from './BootScreen';

export const OSContainer = () => {
  const { windows, openWindow, closeStartMenu, minimizeAll } = useOSStore();
  const desktopIcons = getDesktopIcons();
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null);
  const [iconContextMenu, setIconContextMenu] = useState<{ x: number, y: number, fileId: string } | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [booting, setBooting] = useState(true);
  const soundPlayedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/windows-xp-startup.mp3');
    audio.preload = 'auto';
    audio.volume = 1.0;
    audioRef.current = audio;
  }, []);

  const playStartupChime = useCallback((force = false) => {
    if (soundPlayedRef.current && !force) return;

    if (!audioRef.current) {
      audioRef.current = new Audio('/windows-xp-startup.mp3');
      audioRef.current.volume = 1.0;
    }

    const audio = audioRef.current;
    audio.currentTime = 0;
    const promise = audio.play();

    if (promise !== undefined) {
      promise.then(() => {
        soundPlayedRef.current = true;
      }).catch((err) => {
        console.warn('HTML5 Audio play deferred until interaction:', err);
        // Fallback: Web Audio API decoding
        try {
          const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioCtx) {
            const ctx = new AudioCtx();
            if (ctx.state === 'suspended') ctx.resume();
            fetch('/windows-xp-startup.mp3')
              .then((res) => res.arrayBuffer())
              .then((buf) => ctx.decodeAudioData(buf))
              .then((decodedBuffer) => {
                const source = ctx.createBufferSource();
                source.buffer = decodedBuffer;
                source.connect(ctx.destination);
                source.start(0);
                soundPlayedRef.current = true;
              })
              .catch(() => {});
          }
        } catch (e) {}
      });
    }
  }, []);

  useEffect(() => {
    (window as any).playStartupSound = () => playStartupChime(true);

    playStartupChime();

    const handleUserInteraction = () => {
      playStartupChime();
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('pointerdown', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('pointerdown', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [playStartupChime]);

  const handleBootFinish = () => {
    setBooting(false);
    playStartupChime(true);
  };

  const lastOpenTimeRef = useRef<Record<string, number>>({});

  const handleIconDoubleClick = (fileId: string) => {
    const now = Date.now();
    if (now - (lastOpenTimeRef.current[fileId] || 0) < 500) {
      return;
    }
    lastOpenTimeRef.current[fileId] = now;

    const file = fileSystem[fileId];
    if (!file) return;

    // Special: CV download
    if (file.content === 'CV_DOWNLOAD' || fileId === 'cv-download') {
      const pdfPath = '/Farhan%20cc%20Next%20js%20Developer.pdf';
      const a = document.createElement('a');
      a.href = pdfPath;
      a.download = 'Farhan cc Next js Developer.pdf';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.open(pdfPath, '_blank', 'noopener,noreferrer');
      return;
    }

    if (file.openBehavior === 'external' && file.content) {
      window.open(file.content, '_blank', 'noopener,noreferrer');
      return;
    }

    if (file.type === 'folder') {
      openWindow('explorer', file.name, { props: { folderId: file.id }, icon: file.icon });
    } else if (file.name.endsWith('.txt')) {
      openWindow('notepad', file.name, { props: { content: file.content }, icon: file.icon });
    } else {
      openWindow('browser', file.name, { props: { url: file.content, type: file.type }, icon: file.icon });
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIconContextMenu(null);
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleIconContextMenu = (e: React.MouseEvent, fileId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu(null);
    setIconContextMenu({ x: e.clientX, y: e.clientY, fileId });
    setSelectedIcon(fileId);
  };

  return (
    <div 
      className="w-screen h-[100dvh] overflow-hidden bg-[#004e98] bg-[url('https://artsy-media-uploads.s3.amazonaws.com/2P6t_Yt6dF0TNN76dlp-_Q/3417757448_4a6bdf36ce_o.jpg')] bg-cover bg-center select-none relative"
      onClick={() => {
        closeStartMenu();
        setContextMenu(null);
        setIconContextMenu(null);
        setSelectedIcon(null);
      }}
      onContextMenu={handleContextMenu}
    >
      {/* Desktop Icons */}
      <div className="flex flex-col flex-wrap h-[calc(100vh-40px)] p-2 gap-2 items-start w-max content-start">
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className={`flex flex-col items-center justify-start w-20 p-1 rounded cursor-pointer group transition-colors ${
              selectedIcon === icon.id
                ? 'bg-[#316ac5]/60 ring-1 ring-blue-300/50'
                : 'hover:bg-white/10'
            }`}
            onClick={(e) => { 
              e.stopPropagation(); 
              setSelectedIcon(icon.id); 
              setIconContextMenu(null); 
            }}
            onDoubleClick={() => handleIconDoubleClick(icon.id)}
            onContextMenu={(e) => handleIconContextMenu(e, icon.id)}
          >
            <div className="w-10 h-10 mb-1 flex items-center justify-center relative">
              <img
                src={icon.icon}
                alt={icon.name}
                className="max-w-full max-h-full drop-shadow-md"
                draggable={false}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>';
                }}
              />
              {/* Classic Windows shortcut overlay */}
              {icon.openBehavior === 'external' && (
                <img
                  src="/shortcut-arrow.png"
                  alt="shortcut"
                  className="absolute bottom-0 left-0 w-4 h-4"
                  draggable={false}
                />
              )}
            </div>
            <span className={`text-white text-xs text-center break-words font-sans line-clamp-2 select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${
              selectedIcon === icon.id ? 'bg-[#316ac5] px-0.5 rounded' : ''
            }`}>
              {icon.name}
            </span>
          </div>
        ))}
      </div>

      {/* Windows Area */}
      {windows.map((win) => (
        <Window key={win.id} windowData={win}>
          {win.app === 'explorer' && <Explorer folderId={win.props?.folderId || 'desktop'} />}
          {win.app === 'browser' && <Browser url={win.props?.url || ''} type={win.props?.type} />}
          {win.app === 'notepad' && <Notepad content={win.props?.content || ''} />}
        </Window>
      ))}

      {/* Icon Context Menu */}
      {iconContextMenu && (
        <div
          className="fixed z-[9999] bg-[#f0ede3] border border-gray-400 shadow-lg rounded py-1 w-44 text-sm"
          style={{ top: iconContextMenu.y, left: iconContextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          {[
            { label: 'Open', action: () => { handleIconDoubleClick(iconContextMenu.fileId); setIconContextMenu(null); }, bold: true },
            { label: 'Explore', action: () => { handleIconDoubleClick(iconContextMenu.fileId); setIconContextMenu(null); } },
            null,
            { label: 'Create Shortcut', action: () => { setIconContextMenu(null); } },
            { label: 'Delete', action: () => { setIconContextMenu(null); } },
            { label: 'Rename', action: () => { setIconContextMenu(null); } },
            null,
            { label: 'Properties', action: () => { setIconContextMenu(null); } },
          ].map((item, i) =>
            item === null ? (
              <div key={i} className="my-1 border-t border-gray-300" />
            ) : (
              <button
                key={item.label}
                className={`w-full text-left px-4 py-1 hover:bg-[#316ac5] hover:text-white ${item.bold ? 'font-bold' : ''}`}
                onClick={item.action}
              >
                {item.label}
              </button>
            )
          )}
        </div>
      )}

      {/* Desktop Context Menu */}
      {contextMenu && (
        <div
          className="fixed z-[9999] bg-[#f0ede3] border border-gray-400 shadow-lg rounded py-1 w-44 text-sm"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          {[
            { label: 'Refresh', action: () => { window.location.reload(); } },
            { label: 'New Folder', action: () => { setContextMenu(null); } },
            null,
            { label: 'Show Desktop', action: () => { minimizeAll(); setContextMenu(null); } },
            { label: 'Properties', action: () => { setContextMenu(null); } },
          ].map((item, i) =>
            item === null ? (
              <div key={i} className="my-1 border-t border-gray-300" />
            ) : (
              <button
                key={item.label}
                className="w-full text-left px-4 py-1 hover:bg-[#316ac5] hover:text-white"
                onClick={item.action}
              >
                {item.label}
              </button>
            )
          )}
        </div>
      )}

      {booting && <BootScreen onStart={handleBootFinish} />}

      <StartMenu />
      <Taskbar />
    </div>
  );
};
