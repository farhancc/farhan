'use client';

import React from 'react';
import { useOSStore, OSWindow } from '@/store/osStore';
import { Minus, Square, X, Copy } from 'lucide-react';

interface WindowProps {
  windowData: OSWindow;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ windowData, children }) => {
  const { id, title, x, y, width, height, zIndex, isMinimized, isMaximized } = windowData;
  const { closeWindow, minimizeWindow, maximizeWindow, restoreWindow, focusWindow, updateWindowPosition, updateWindowSize } = useOSStore();

  const startResize = (e: React.PointerEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    
    // Bring window to top on resize click
    focusWindow(id);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = width;
    const startHeight = height;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const newWidth = Math.max(250, startWidth + (moveEvent.clientX - startX));
      const newHeight = Math.max(200, startHeight + (moveEvent.clientY - startY));
      updateWindowSize(id, newWidth, newHeight);
    };

    const onPointerUp = () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  };

  const startDrag = (e: React.PointerEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    focusWindow(id);

    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = x;
    const initialY = y;

    const onPointerMove = (moveEvent: PointerEvent) => {
      updateWindowPosition(id, initialX + (moveEvent.clientX - startX), initialY + (moveEvent.clientY - startY));
    };

    const onPointerUp = () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  };

  return (
    <div
      id={`window-${id}`}
      style={{ 
        top: isMaximized ? 0 : y, 
        left: isMaximized ? 0 : x, 
        width: isMaximized ? '100%' : width, 
        height: isMaximized ? 'calc(100% - 30px)' : height, 
        zIndex, 
        position: 'absolute' 
      }}
      className={`${isMinimized ? 'hidden' : 'flex'} bg-[#ECE9D8] flex-col border-[3px] border-[#0055EA] rounded-t-lg overflow-hidden shadow-2xl ${isMaximized ? 'rounded-none border-0' : ''}`}
      onPointerDown={() => focusWindow(id)}
    >
      {/* Title bar / Drag Handle */}
      <div 
        className="bg-gradient-to-b from-[#0058EE] via-[#3A93FF] to-[#0058EE] flex justify-between items-center px-1 py-[2px] select-none cursor-default rounded-t-[5px]"
        onPointerDown={startDrag}
        onDoubleClick={() => isMaximized ? restoreWindow(id) : maximizeWindow(id)}
      >
        <div className="flex items-center space-x-1 pl-1">
          {windowData.icon && (
            <img src={windowData.icon} alt="icon" className="w-4 h-4" draggable={false} />
          )}
          <span className="font-bold text-[13px] tracking-wide text-white drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] font-sans">
             {title}
          </span>
        </div>
        <div className="flex space-x-[2px] pr-[2px]">
          <button 
            className="w-[21px] h-[21px] bg-gradient-to-b from-[#fff] to-[#ccd9e8] text-black border border-white hover:border-black rounded-[3px] shadow-sm flex items-center justify-center cursor-pointer active:from-[#a5c2e0] active:to-[#ccd9e8]"
            onClick={() => minimizeWindow(id)}
          >
            <Minus size={12} strokeWidth={3} className="mt-2" />
          </button>
          <button 
            className="w-[21px] h-[21px] bg-gradient-to-b from-[#fff] to-[#ccd9e8] border border-white hover:border-black rounded-[3px] shadow-sm flex items-center justify-center cursor-pointer active:from-[#a5c2e0] active:to-[#ccd9e8]"
            onClick={() => isMaximized ? restoreWindow(id) : maximizeWindow(id)}
          >
            {isMaximized ? <Copy size={11} strokeWidth={2.5}/> : <Square size={10} strokeWidth={3} className="mb-0.5 text-[#1D5ECA]" />}
          </button>
          <button 
            className="w-[21px] h-[21px] bg-gradient-to-br from-[#E55225] via-[#E55225] to-[#B0280D] text-white border border-white hover:brightness-110 rounded-[3px] shadow-sm flex items-center justify-center cursor-pointer active:from-[#d53e26] active:to-[#ba2d16]"
            onClick={() => closeWindow(id)}
          >
            <X size={16} strokeWidth={3} className="drop-shadow-md pb-0.5 pr-0.5" />
          </button>
        </div>
      </div>
      
      {/* Window Content */}
      <div className="flex-1 overflow-hidden bg-white relative border-t-0 shadow-inner block">
        {children}
      </div>

      {/* Resize Handle (Bottom Right) */}
      {!isMaximized && (
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50 flex items-end justify-end p-0.5"
          onPointerDown={startResize}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 10L10 8V10H8ZM4 10L10 4V6L6 10H4ZM0 10L10 0V2L2 10H0Z" fill="#A0A0A0"/>
          </svg>
        </div>
      )}
    </div>
  );
};
