import React from 'react';
import { TestCaseType } from '@/features/problem/types/problem.type';
import { TestCaseTabs } from './TestCaseTabs';
import { InputOutputBox } from './InputOutputBox';

type TestCaseSectionProps = {
  testCases: TestCaseType[];
  selectedTestCase: number;
  onTestCaseSelect: (index: number) => void;
  input: string;
  output: string;
};

export const TestCaseSection: React.FC<TestCaseSectionProps> = ({
  testCases,
  selectedTestCase,
  onTestCaseSelect,
  input,
  output,
}) => {
  return (
    <div className="flex-1 min-h-0 flex flex-col bg-problem-COMPONENT_HEADER rounded-[10px] shadow-md">
      {/* 상단 바 */}
      <div className="bg-gray-200 px-5 py-2 rounded-t-[10px]">
        <span className="text-secondary text-base">테스트 케이스</span>
      </div>

      {/* 내용 부분 - 배경 채우기용 */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 scrollbar-hide">
        <TestCaseTabs
          testCases={testCases}
          selectedTestCase={selectedTestCase}
          onTestCaseSelect={onTestCaseSelect}
        />
        <div className="mt-4">
          <InputOutputBox input={input} output={output} />
        </div>
      </div>
    </div>
  );
};
