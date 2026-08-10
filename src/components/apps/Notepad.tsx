'use client';

import React, { useState } from 'react';

interface NotepadProps {
  content?: string;
}

export const Notepad: React.FC<NotepadProps> = ({ content = '' }) => {
  const [text, setText] = useState(content);
  const isAboutMe = content.toLowerCase().includes("hi, i'm farhan") || content.toLowerCase().includes("about me") || content.toLowerCase().includes("what i build");

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
      
      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Text Area */}
        <textarea
          className="flex-1 w-full p-2 outline-none resize-none border-none overflow-y-auto bg-white text-black leading-relaxed"
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
        />

        {/* Profile Image Panel for About Me */}
        {isAboutMe && (
          <div className="w-48 bg-[#f5f3e9] border-l border-gray-300 p-3 flex flex-col items-center space-y-3 shadow-inner select-none overflow-y-auto">
            <div className="w-36 h-36 rounded-lg border-2 border-gray-400 overflow-hidden shadow-md bg-gray-200">
              <img src="/farhan.png" alt="Farhan CC" className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <div className="font-bold text-xs text-gray-800">Farhan CC</div>
              <div className="text-[10px] text-gray-600 mt-0.5">Full Stack / Next.js Developer</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
