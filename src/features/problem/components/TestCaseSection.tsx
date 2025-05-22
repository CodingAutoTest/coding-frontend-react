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
    <div className="h-full bg-problem-COMPONENT_HEADER rounded-[10px] shadow-md flex flex-col">
      <header className="bg-problem-TAB_BAR px-5 py-2 rounded-t-[10px] shrink-0">
        <span className="text-base font-inter ">테스트 케이스</span>
      </header>
      {/* 상단 바 */}

      {/* 내용 부분 - 스크롤 생기는 영역 */}
      <div className="px-5 py-4 overflow-y-auto flex-1 scrollbar-hide">
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
