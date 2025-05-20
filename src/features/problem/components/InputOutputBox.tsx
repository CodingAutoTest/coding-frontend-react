import React from 'react';

type InputOutputBoxProps = {
  input: string;
  output: string;
};

export const InputOutputBox: React.FC<InputOutputBoxProps> = ({ input, output }) => {
  return (
    <div className="">
      <div>
        <label className="block text-secondary text-base mb-2 font-inter">입력</label>
        <textarea
          value={input}
          readOnly
          className="w-full bg-gray-300 text-secondary px-5 py-2 rounded-lg font-inter resize-none"
          rows={Math.max(1, input.split('\n').length)}
        />
      </div>
      <div>
        <label className="block text-secondary text-base mb-2 font-inter">출력</label>
        <textarea
          value={output}
          readOnly
          className="w-full bg-gray-300 px-5 py-2 rounded-lg font-inter resize-none"
          rows={Math.max(1, output.split('\n').length)}
        />
      </div>
    </div>
  );
};
