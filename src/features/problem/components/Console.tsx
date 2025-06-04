import React from 'react';

type ConsoleProps = {
  output: string;
};

export const Console: React.FC<ConsoleProps> = ({ output }) => {
  return (
    <div className="w-full h-full bg-[#1E1E1E] rounded-lg overflow-hidden flex flex-col">
      {/* 콘솔 헤더 */}
      <div className="bg-[#2D2D2D] px-4 py-2 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        <span className="text-gray-400 text-sm ml-2">Console</span>
      </div>

      {/* 콘솔 내용 */}
      <div className="flex-1 p-4 font-mono text-sm text-gray-300 overflow-auto">
        <pre className="whitespace-pre-wrap break-words">{output || '> 제출 준비중...'}</pre>
      </div>
    </div>
  );
};
