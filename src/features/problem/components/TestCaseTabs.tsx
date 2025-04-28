import React from 'react';
import { TestCaseType } from '@/features/problem/types/problem.type';

type TestCaseTabsProps = {
  testCases: TestCaseType[];
  selectedTestCase: number;
  onTestCaseSelect: (index: number) => void;
};

export const TestCaseTabs: React.FC<TestCaseTabsProps> = ({
  testCases,
  selectedTestCase,
  onTestCaseSelect,
}) => {
  if (!Array.isArray(testCases)) return null;

  return (
    <div className="flex gap-4 mb-5 ">
      {testCases.map((_, index) => (
        <button
          key={index}
          className={`px-8 py-2 rounded-lg  ${
            selectedTestCase === index ? 'bg-PRIMARY text-white' : 'bg-gray-300 text-secondary'
          }`}
          onClick={() => onTestCaseSelect(index)}
        >
          케이스 {index + 1}
        </button>
      ))}
    </div>
  );
};
