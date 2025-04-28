import React from 'react';
import Editor from '@monaco-editor/react';
import { ProgrammingLanguage } from '../types/problem.type';

type CodeEditorBoxProps = {
  code: string;
  language: ProgrammingLanguage;
  onCodeChange: (value: string | undefined) => void;
  onLanguageChange: (language: ProgrammingLanguage) => void;
};

export const CodeEditorBox: React.FC<CodeEditorBoxProps> = ({
  code,
  language,
  onCodeChange,
  onLanguageChange,
}) => {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = React.useState(false);

  return (
    <div className="bg-light rounded-lg shadow-md flex flex-col overflow-hidden h-full">
      {/* 상단 고정 바 */}
      <div className="px-5 py-2 bg-gray-200 rounded-t-[10px] flex justify-between items-center shrink-0">
        <span className="text-secondary text-[15px] font-medium">코드</span>
        <div className="relative">
          <button
            className="flex items-center gap-2 text-secondary"
            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
          >
            <span className="text-[15px]">{language} ▼</span>
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
                    onLanguageChange(lang as ProgrammingLanguage);
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

      {/* 에디터는 남은 영역만큼만 차지 */}
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          defaultLanguage={language}
          value={code}
          onChange={onCodeChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            automaticLayout: true,
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  );
};
