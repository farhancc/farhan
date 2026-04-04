'use client';

import React, { useState, useEffect, useRef } from 'react';

export const Browser: React.FC<{ url: string; type?: string }> = ({ url: initialUrl, type }) => {
  const [loading, setLoading] = useState(true);
  const [error] = useState(false); 
  const [url, setUrl] = useState(initialUrl || 'https://www.wikipedia.org');
  const [inputUrl, setInputUrl] = useState(initialUrl || 'https://www.wikipedia.org');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    
    // Safety timeout in case the iframe just doesn't load
    const timer = setTimeout(() => {
      if (isMounted) setLoading(false);
    }, 4000);
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [url]);

  return (
    <div className="flex flex-col h-full bg-white relative">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes sweep {
          0% { left: -30%; width: 30%; }
          50% { left: 40%; width: 40%; }
          100% { left: 100%; width: 30%; }
        }
        .anim-sweep {
          animation: sweep 2s infinite ease-in-out;
        }
      `}} />
      
      {/* Menu Bar */}
      <div className="bg-[#ece9d8] flex items-center px-1 py-0.5 space-x-2 text-xs border-b border-white shadow-sm border-t-0 shadow-[#cfcdc0]">
        <div className="hover:bg-[#316ac5] hover:text-white px-2 py-0.5 rounded-sm cursor-default">File</div>
        <div className="hover:bg-[#316ac5] hover:text-white px-2 py-0.5 rounded-sm cursor-default">Edit</div>
        <div className="hover:bg-[#316ac5] hover:text-white px-2 py-0.5 rounded-sm cursor-default">View</div>
        <div className="hover:bg-[#316ac5] hover:text-white px-2 py-0.5 rounded-sm cursor-default">Favorites</div>
        <div className="hover:bg-[#316ac5] hover:text-white px-2 py-0.5 rounded-sm cursor-default">Tools</div>
        <div className="hover:bg-[#316ac5] hover:text-white px-2 py-0.5 rounded-sm cursor-default">Help</div>
      </div>

      {/* Browser Standard Buttons */}
      <div className="bg-[#ece9d8] border-b border-[#cfcdc0] flex items-center p-1 gap-1">
        <button 
          className="flex items-center space-x-1 hover:bg-white active:bg-gray-200 px-2 py-1 rounded shadow-[inset_1px_1px_rgba(255,255,255,0.7)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_1px_1px_rgba(255,255,255,0.7)]"
          onClick={() => {
            if (iframeRef.current && iframeRef.current.contentWindow) {
              try { iframeRef.current.contentWindow.history.back(); } catch (e) {} // May fail due to CORS
            }
          }}
        >
          <div className="w-5 h-5 bg-[#1ea82d] rounded-full flex items-center justify-center text-white border border-[#107019] shadow-sm"><span className="text-[12px] font-bold">&larr;</span></div>
          <span className="text-xs font-sans text-gray-700 font-medium">Back</span>
        </button>
        <button className="flex items-center space-x-1 hover:bg-white active:bg-gray-200 px-1 py-1 rounded">
           <div className="w-5 h-5 bg-[#1ea82d] rounded-full flex items-center justify-center text-white border border-[#107019] shadow-sm"><span className="text-[12px] font-bold">&rarr;</span></div>
        </button>
        <div className="w-px h-5 bg-gray-400 mx-1"></div>
        <button className="flex items-center hover:bg-white px-1 py-1 rounded" onClick={() => setUrl(inputUrl)}>
          <span className="text-xs text-gray-700">Refresh</span>
        </button>
        <button className="flex items-center hover:bg-white px-1 py-1 rounded" onClick={() => setUrl('https://www.wikipedia.org')}>
          <span className="text-xs text-gray-700">Home</span>
        </button>
        <div className="w-px h-5 bg-gray-400 mx-1"></div>
        <button 
          className="flex items-center space-x-1 hover:bg-white px-2 py-1 rounded" 
          onClick={() => window.open(url, '_blank')}
          title="If the project doesn't load in the iframe, open it in a new tab"
        >
          <span className="text-[11px] text-[#0000ff] hover:underline flex items-center"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="mr-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg> Open in New Tab</span>
        </button>
      </div>

      {/* Address Bar */}
      <div className="bg-[#ece9d8] border-b border-[#cfcdc0] flex items-center p-1 px-2 space-x-2 shadow-sm">
        <span className="text-xs text-gray-600 font-sans">Address</span>
        <div className="flex-1 bg-white border border-[#7f9db9] h-6 flex items-center space-x-1 min-w-0 shadow-inner">
          <img src={'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="%23B0BEC5" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"/><path fill="%2390A4AE" d="M24 4A20 20 0 0 0 4 24H44A20 20 0 0 0 24 4Z"/><path fill="%23CFD8DC" d="M24,4c-6.1,0-11,8.9-11,20s4.9,20,11,20s11-8.9,11-20S30.1,4,24,4z M24,42c-4.9,0-8.9-8.1-8.9-18S19.1,6,24,6 s8.9,8.1,8.9,18S28.9,42,24,42z"/><path fill="%2390A4AE" d="M4.3 16L43.7 16M4.3 32L43.7 32"/></svg>'} className="w-4 h-4 ml-1 opacity-70" />
          <input 
            value={inputUrl} 
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                let targetUrl = inputUrl;
                if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
                   targetUrl = 'https://' + targetUrl;
                   setInputUrl(targetUrl);
                }
                setUrl(targetUrl);
                setLoading(true);
              }
            }}
            className="flex-1 px-1 py-0.5 text-xs truncate font-sans text-black w-full outline-none"
          />
        </div>
        <button 
          className="hover:bg-[#316ac5] hover:text-white px-2 py-0.5 rounded flex items-center border border-transparent shadow shadow-transparent active:border-gray-400"
          onClick={() => {
            let targetUrl = inputUrl;
            if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
               targetUrl = 'https://' + targetUrl;
               setInputUrl(targetUrl);
            }
            setUrl(targetUrl);
            setLoading(true);
          }}
        >
          <span className="text-xs font-sans">Go</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative bg-[#f1f1f1] overflow-hidden">
        {loading && (
          <div className="absolute inset-0 bg-[#f1f1f1] z-20 flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-sans text-black">Opening {type === 'pdf' ? 'PDF' : 'page'}...</span>
            </div>
            {/* Windows XP Progress Bar Simulation */}
            <div className="w-56 h-[14px] bg-white border-[1px] border-b-[#ffffff] border-r-[#ffffff] border-t-[#a0a0a0] border-l-[#a0a0a0] shadow-sm relative overflow-hidden flex items-center px-1 space-x-[2px]">
              {/* Discrete blocks pattern */}
              <div className="flex gap-[2px] w-full h-[8px] absolute anim-sweep">
                <div className="w-2 h-full bg-[#3030c0]" />
                <div className="w-2 h-full bg-[#3030c0]" />
                <div className="w-2 h-full bg-[#3030c0]" />
              </div>
            </div>
            {type !== 'pdf' && (
              <p className="text-[10px] text-gray-500 mt-4 px-8 text-center">(If blank, server blocked iframe. Click "Open in New Tab" above.)</p>
            )}
          </div>
        )}
        
        {url ? (
          <iframe 
            ref={iframeRef}
            src={url} 
            className="w-full h-full border-none bg-white relative z-10"
            onLoad={() => setLoading(false)}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-red-500 text-sm">
            Navigation Cancelled
          </div>
        )}
      </div>
    </div>
  );
};
