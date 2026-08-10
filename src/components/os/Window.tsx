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
        <div className="flex space-x-[3px] pr-[3px] items-center">
          {/* Minimize */}
          <button 
            className="w-[21px] h-[21px] rounded-[3px] border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_1px_2px_rgba(0,0,0,0.3)] bg-gradient-to-b from-[#2E7CFA] via-[#0057EE] to-[#0039A6] hover:brightness-110 active:brightness-90 flex items-center justify-center cursor-pointer transition-all active:translate-y-[0.5px]"
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(id);
            }}
            title="Minimize"
          >
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <rect x="1" y="7" width="7" height="2" fill="white" />
            </svg>
          </button>

          {/* Maximize / Restore */}
          <button 
            className="w-[21px] h-[21px] rounded-[3px] border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_1px_2px_rgba(0,0,0,0.3)] bg-gradient-to-b from-[#2E7CFA] via-[#0057EE] to-[#0039A6] hover:brightness-110 active:brightness-90 flex items-center justify-center cursor-pointer transition-all active:translate-y-[0.5px]"
            onClick={(e) => {
              e.stopPropagation();
              isMaximized ? restoreWindow(id) : maximizeWindow(id);
            }}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? (
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M2.5 0.5H8.5V6.5H6.5V2.5H2.5V0.5Z" stroke="white" strokeWidth="1" />
                <path d="M2.5 0.5H8.5V2H2.5V0.5Z" fill="white" />
                <rect x="0.5" y="2.5" width="6" height="6" fill="#0057EE" stroke="white" strokeWidth="1" />
                <rect x="0.5" y="2.5" width="6" height="1.5" fill="white" />
              </svg>
            ) : (
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <rect x="0.5" y="0.5" width="8" height="8" stroke="white" strokeWidth="1" fill="none" />
                <rect x="0.5" y="0.5" width="8" height="2" fill="white" />
              </svg>
            )}
          </button>

          {/* Close */}
          <button 
            className="w-[21px] h-[21px] rounded-[3px] border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_1px_2px_rgba(0,0,0,0.3)] bg-gradient-to-b from-[#F26C4F] via-[#E55225] to-[#B0280D] hover:brightness-110 active:brightness-90 flex items-center justify-center cursor-pointer transition-all active:translate-y-[0.5px]"
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(id);
            }}
            title="Close"
          >
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path d="M1.5 1.5L7.5 7.5M7.5 1.5L1.5 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
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
