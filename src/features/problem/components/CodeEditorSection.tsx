import React from 'react';
import Editor from '@monaco-editor/react';
import { TestCaseSection } from './TestCaseSection';
import { ActionButtons } from './ActionButtons';
import { TestCaseType, ProgrammingLanguage, SubmissionResultType } from '../types/problem.type';
import { useAuthStore } from '@/stores/useAuthStore';
import { LoginModal } from '@/components/LoginModal';

type CodeEditorSectionProps = {
  language: ProgrammingLanguage;
  code: string;
  setCode: (code: string) => void;
  setLanguage: (lang: ProgrammingLanguage) => void;
  testCases: TestCaseType[];
  selectedTestCase: number;
  setSelectedTestCase: (index: number) => void;
  problemId: number;
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
  onStopTimer,
  onSubmit,
}) => {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  const user = useAuthStore((s) => s.user);
  const isAnonymous = !user;
  const input = testCases[selectedTestCase]?.input || '';
  const output = testCases[selectedTestCase]?.output || '';

  const handleEditorClick = () => {
    if (isAnonymous) {
      setShowLogin(true);
    }
  };

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
            <div className="flex-1 h-full relative">
              {isAnonymous && (
                <div
                  className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 cursor-pointer"
                  onClick={handleEditorClick}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-white text-lg font-inter">
                      로그인이 필요한 기능입니다
                    </span>
                  </div>
                </div>
              )}
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
                  readOnly: isAnonymous,
                }}
              />
            </div>
          </div>
        </div>
        <footer className="bg-[#E9E9E9] rounded-b-[10px]">
          <ActionButtons
            problemId={problemId}
            testCases={testCases}
            onStopTimer={onStopTimer}
            onSubmit={onSubmit}
            isAnonymous={isAnonymous}
            onLoginClick={() => setShowLogin(true)}
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

      {/* 로그인 모달 */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </section>
  );
};
