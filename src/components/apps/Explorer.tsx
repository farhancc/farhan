'use client';

import React from 'react';
import { getFolderContents, fileSystem } from '@/config/fileSystem';
import { useOSStore } from '@/store/osStore';

export const Explorer: React.FC<{ folderId: string }> = ({ folderId }) => {
  const contents = getFolderContents(folderId);
  const folder = fileSystem[folderId];
  const { openWindow } = useOSStore();

  const handleDoubleClick = (fileId: string) => {
    const file = fileSystem[fileId];
    if (!file) return;

    if (file.openBehavior === 'external' && file.content) {
      window.open(file.content, '_blank', 'noopener,noreferrer');
      return;
    }

    if (file.type === 'folder') {
      openWindow('explorer', file.name, { props: { folderId: file.id }, icon: file.icon });
    } else {
      openWindow('browser', file.name, { props: { url: file.content, type: file.type }, icon: file.icon });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Menu Bar */}
      <div className="bg-[#ece9d8] flex items-center px-1 py-0.5 space-x-2 text-xs border-b border-white shadow-sm border-t-0 shadow-[#cfcdc0]">
        <div className="hover:bg-[#316ac5] hover:text-white px-2 py-0.5 rounded-sm cursor-default">File</div>
        <div className="hover:bg-[#316ac5] hover:text-white px-2 py-0.5 rounded-sm cursor-default">Edit</div>
        <div className="hover:bg-[#316ac5] hover:text-white px-2 py-0.5 rounded-sm cursor-default">View</div>
        <div className="hover:bg-[#316ac5] hover:text-white px-2 py-0.5 rounded-sm cursor-default">Favorites</div>
        <div className="hover:bg-[#316ac5] hover:text-white px-2 py-0.5 rounded-sm cursor-default">Tools</div>
        <div className="hover:bg-[#316ac5] hover:text-white px-2 py-0.5 rounded-sm cursor-default">Help</div>
      </div>
      
      {/* Toolbar */}
      <div className="bg-[#ece9d8] border-b border-[#cfcdc0] flex items-center p-1 gap-1">
        <button className="flex items-center gap-1 hover:bg-whiteactive:bg-gray-200 px-2 py-1 rounded shadow-[inset_1px_1px_rgba(255,255,255,0.7)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_1px_1px_rgba(255,255,255,0.7)]">
          <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-centertext-white"><span className="text-[10px]">&lt;</span></div>
          <span className="text-xs text-gray-700">Back</span>
        </button>
        <div className="w-px h-5 bg-gray-400 mx-1"></div>
        <button className="flex items-center gap-1 hover:bg-white active:bg-gray-200 px-2 py-1 rounded">
          <span className="text-xs text-gray-700">Search</span>
        </button>
        <button className="flex items-center gap-1 hover:bg-white active:bg-gray-200 px-2 py-1 rounded">
          <span className="text-xs text-gray-700">Folders</span>
        </button>
      </div>

      {/* Address Bar */}
      <div className="bg-[#ece9d8] border-b border-[#cfcdc0] flex items-center p-1 px-2 space-x-2">
        <span className="text-xs text-gray-600">Address</span>
        <div className="flex-1 bg-white border border-[#7f9db9] px-2 py-0.5 text-xs flex items-center space-x-1 min-w-0">
          {folder?.icon && <img src={folder.icon} className="w-3 h-3" />}
          <span className="truncate">{(folder?.id === 'desktop' ? 'C:\\Documents and Settings\\User\\Desktop' : `C:\\${folder?.name}`)}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Classic XP Tasks panel) */}
        <div className="w-48 bg-gradient-to-b from-[#7BA2E7] to-[#6375D6] border-r border-[#6375D6] hidden md:block">
           <div className="m-3 bg-white/20 rounded-t border border-white/40 overflow-hidden text-xs">
              <div className="bg-white/90 text-[#0c327d] font-bold p-1 px-2 border-b border-white/30">System Tasks</div>
              <div className="p-2 space-y-2 text-[#0c327d]">
                 <div className="hover:underline cursor-pointer">View system information</div>
                 <div className="hover:underline cursor-pointer">Add or remove programs</div>
              </div>
           </div>
        </div>
        
        {/* Main View */}
        <div className="flex-1 p-2 flex flex-wrap content-start gap-3 bg-white overflow-y-auto w-full">
          {contents.map(item => (
            <div 
              key={item.id} 
              className="w-24 p-2 flex flex-col items-center justify-start hover:bg-[#316ac5] hover:text-white cursor-pointer rounded focus:bg-[#316ac5] focus:text-white group"
              onDoubleClick={() => handleDoubleClick(item.id)}
              tabIndex={0}
            >
              <img src={item.icon} className="w-10 h-10 mb-1" draggable={false} 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>';
              }} />
              <span className="text-xs text-center break-words w-full h-[2.8em] overflow-hidden leading-tight font-sans text-gray-800 group-hover:text-white group-focus:text-white">{item.name}</span>
            </div>
          ))}
          {contents.length === 0 && (
            <div className="text-gray-400 text-sm italic w-full text-center mt-10">This folder is empty.</div>
          )}
        </div>
      </div>
    </div>
  );
};
