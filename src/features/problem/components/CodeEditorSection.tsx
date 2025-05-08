import React from 'react';
import { CodeEditorBox } from './CodeEditorBox';
import { TestCaseSection } from './TestCaseSection';
import { ActionButtons } from './ActionButtons';
import { TestCaseType } from '../types/problem.type';
import { ProgrammingLanguage } from '../types/problem.type';
import { TabType } from '../constants/tab.constants';

type CodeEditorSectionProps = {
  language: ProgrammingLanguage;
  code: string;
  setCode: (code: string) => void;
  setLanguage: (language: ProgrammingLanguage) => void;
  testCases: TestCaseType[];
  selectedTestCase: number;
  setSelectedTestCase: (index: number) => void;
  problemId: number;
  setActiveTab: (tab: TabType) => void;
  onStopTimer: () => void;
};

export const CodeEditorSection: React.FC<CodeEditorSectionProps> = ({
  language,
  code,
  setCode,
  setLanguage,
  testCases,
  selectedTestCase,
  setSelectedTestCase,
  problemId,
  setActiveTab,
  onStopTimer,
}) => {
  const input = testCases[selectedTestCase]?.input || '';
  const output = testCases[selectedTestCase]?.output || '';

  return (
    <section className="w-full lg:w-1/2 flex flex-col gap-[20px]">
      <div className="flex-1 min-h-0 bg-problem-COMPONENT_HEADER rounded-[10px] flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <CodeEditorBox
            language={language}
            code={code}
            onCodeChange={(value) => value !== undefined && setCode(value)}
            onLanguageChange={setLanguage}
          />
        </div>
        <footer className="bg-[#E9E9E9] rounded-b-[10px] shrink-0">
          <ActionButtons
            problemId={problemId}
            testCases={testCases}
            setActiveTab={setActiveTab}
            onStopTimer={onStopTimer}
          />
        </footer>
      </div>

      <div className="flex-1 min-h-0 flex flex-col">
        <TestCaseSection
          testCases={testCases}
          selectedTestCase={selectedTestCase}
          onTestCaseSelect={setSelectedTestCase}
          input={input}
          output={output}
        />
      </div>
    </section>
  );
};
