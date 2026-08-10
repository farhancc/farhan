'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#004e98] text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="max-w-md bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center space-y-4 shadow-2xl">
          <h2 className="text-2xl font-bold">System Restored</h2>
          <p className="text-sm text-gray-200">The application recovered successfully.</p>
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-sm transition-colors shadow-lg cursor-pointer"
          >
            Restart Session
          </button>
        </div>
      </body>
    </html>
  );
}
