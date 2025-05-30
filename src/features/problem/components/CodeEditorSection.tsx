import React from 'react';
import Editor from '@monaco-editor/react';
import { TestCaseSection } from './TestCaseSection';
import { ActionButtons } from './ActionButtons';
import { TestCaseType, ProgrammingLanguage, SubmissionResultType } from '../types/problem.type';
import { TabType } from '../constants/tab.constants';

type CodeEditorSectionProps = {
  language: ProgrammingLanguage;
  code: string;
  setCode: (code: string) => void;
  setLanguage: (lang: ProgrammingLanguage) => void;
  testCases: TestCaseType[];
  selectedTestCase: number;
  setSelectedTestCase: (index: number) => void;
  problemId: number;
  setActiveTab: (tab: TabType) => void;
  onStopTimer: () => void;
  onSubmit: (result: SubmissionResultType) => Promise<void>;
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
  onSubmit,
}) => {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = React.useState(false);
  const input = testCases[selectedTestCase]?.input || '';
  const output = testCases[selectedTestCase]?.output || '';

  return (
    <section className="w-1/2 h-full flex flex-col gap-[20px]">
      <div className="h-1/2 bg-problem-COMPONENT_HEADER rounded-[10px] flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <div className="bg-light rounded-lg shadow-md flex flex-col overflow-hidden h-full">
            <div className="px-5 py-2 bg-problem-TAB_BAR rounded-t-[10px] flex justify-between items-center shrink-0">
              <span className="text-secondary text-[15px] font-inter">코드</span>
              <div className="relative">
                <button
                  className="flex items-center gap-2 text-secondary"
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                >
                  <span className="text-[15px] font-inter">{language} ▼</span>
                </button>
                {isLanguageMenuOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg py-2 min-w-[120px] z-10">
                    {['python', 'java', 'javascript', 'cpp'].map((lang) => (
                      <button
                        key={lang}
                        className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${
                          language === lang ? 'text-primary' : 'text-secondary'
                        }`}
                        onClick={() => {
                          setLanguage(lang as ProgrammingLanguage);
                          setIsLanguageMenuOpen(false);
                        }}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 h-full">
              <Editor
                height="100%"
                defaultLanguage={language}
                value={code}
                onChange={(value) => value !== undefined && setCode(value)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  lineNumbers: 'on',
                  wordWrap: 'on',
                  scrollbar: {
                    vertical: 'auto',
                    horizontal: 'auto',
                  },
                  fixedOverflowWidgets: true,
                }}
              />
            </div>
          </div>
        </div>
        <footer className="bg-[#E9E9E9] rounded-b-[10px]">
          <ActionButtons
            problemId={problemId}
            testCases={testCases}
            setActiveTab={setActiveTab}
            onStopTimer={onStopTimer}
            onSubmit={onSubmit}
          />
        </footer>
      </div>

      <div className="h-1/2 flex flex-col">
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
