import React from 'react';

type InputOutputBoxProps = {
  input: string;
  output: string;
};

export const InputOutputBox: React.FC<InputOutputBoxProps> = ({ input, output }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-secondary text-base mb-2">입력</label>
        <input
          value={input}
          readOnly
          className="w-full bg-gray-300 text-secondary px-5 py-2 rounded-lg"
        />
      </div>
      <div>
        <label className="block text-secondary text-base mb-2">출력</label>
        <input
          value={output}
          readOnly
          className="w-full bg-gray-300 text-secondary px-5 py-2 rounded-lg"
        />
      </div>
    </div>
  );
};
