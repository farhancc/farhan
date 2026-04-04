'use client';

import React, { useState } from 'react';

interface NotepadProps {
  content?: string;
}

export const Notepad: React.FC<NotepadProps> = ({ content = '' }) => {
  const [text, setText] = useState(content);

  return (
    <div className="flex flex-col h-full bg-white font-mono text-sm select-text text-black">
      {/* Menu Bar */}
      <div className="bg-[#ece9d8] flex items-center px-1 py-0.5 space-x-3 text-xs text-black border-b border-white shadow-sm border-t-0 shadow-[#cfcdc0] select-none">
        <div className="hover:bg-[#316ac5] hover:text-white px-2 py-0.5 rounded-sm cursor-default">File</div>
        <div className="hover:bg-[#316ac5] hover:text-white px-2 py-0.5 rounded-sm cursor-default">Edit</div>
        <div className="hover:bg-[#316ac5] hover:text-white px-2 py-0.5 rounded-sm cursor-default">Format</div>
        <div className="hover:bg-[#316ac5] hover:text-white px-2 py-0.5 rounded-sm cursor-default">View</div>
        <div className="hover:bg-[#316ac5] hover:text-white px-2 py-0.5 rounded-sm cursor-default">Help</div>
      </div>
      
      {/* Text Area */}
      <textarea
        className="flex-1 w-full p-1 outline-none resize-none border-none overflow-y-scroll bg-white text-black leading-relaxed"
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
};
