import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProblemWithDescription } from '../types/problem.type';

interface TestCase {
  input: string;
  output: string;
  isExample: boolean;
}

const ProblemCreatePage = () => {
  const navigate = useNavigate();
  const [problem, setProblem] = useState<Partial<ProblemWithDescription>>({
    title: '',
    description: '',
    descriptionDetail: '',
    inputFormat: '',
    outputFormat: '',
    constraints: '',
    difficulty: 1,
    algorithm: '',
    timeLimit: 1,
    memoryLimit: 128,
  });

  const [testCases, setTestCases] = useState<TestCase[]>([
    { input: '', output: '', isExample: true },
  ]);

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: '', output: '', isExample: false }]);
  };

  const handleTestCaseChange = (index: number, field: keyof TestCase, value: string | boolean) => {
    const newTestCases = [...testCases];
    newTestCases[index] = { ...newTestCases[index], [field]: value };
    setTestCases(newTestCases);
  };

  const handleSubmit = async () => {
    try {
      // TODO: API 연동
      console.log('Create problem:', { ...problem, testCases });
      navigate('/problems');
    } catch (error) {
      console.error('Failed to create problem:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">새 문제 만들기</h1>

      <div className="space-y-8">
        {/* 기본 정보 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">기본 정보</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
              <input
                type="text"
                value={problem.title}
                onChange={(e) => setProblem({ ...problem, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-PRIMARY"
                placeholder="문제 제목을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">시간 제한 (초)</label>
              <input
                type="number"
                min="1"
                value={problem.timeLimit}
                onChange={(e) => setProblem({ ...problem, timeLimit: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-PRIMARY"
                placeholder="시간 제한을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                메모리 제한 (MB)
              </label>
              <input
                type="number"
                min="1"
                value={problem.memoryLimit}
                onChange={(e) => setProblem({ ...problem, memoryLimit: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-PRIMARY"
                placeholder="메모리 제한을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">알고리즘</label>
              <input
                type="text"
                value={problem.algorithm}
                onChange={(e) => setProblem({ ...problem, algorithm: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-PRIMARY"
                placeholder="알고리즘을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">난이도 (1-30)</label>
              <input
                type="number"
                min="1"
                max="30"
                value={problem.difficulty}
                onChange={(e) => setProblem({ ...problem, difficulty: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-PRIMARY"
                placeholder="난이도를 입력하세요"
              />
            </div>
          </div>
        </div>

        {/* 문제 내용 및 제약 조건 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">문제 내용 및 제약 조건</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">문제 내용</label>
              <textarea
                value={problem.description}
                onChange={(e) => setProblem({ ...problem, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-PRIMARY"
                rows={3}
                placeholder="문제 내용을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">입력 제약</label>
              <textarea
                value={problem.inputFormat}
                onChange={(e) => setProblem({ ...problem, inputFormat: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-PRIMARY"
                rows={3}
                placeholder="입력 제약을 설명하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">출력 제약</label>
              <textarea
                value={problem.outputFormat}
                onChange={(e) => setProblem({ ...problem, outputFormat: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-PRIMARY"
                rows={3}
                placeholder="출력 제약을 설명하세요"
              />
            </div>
          </div>
        </div>

        {/* 테스트케이스 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">테스트케이스</h2>
            <button
              onClick={handleAddTestCase}
              className="px-4 py-2 bg-PRIMARY text-white rounded-lg hover:bg-PRIMARY_DARK transition-colors"
            >
              테스트케이스 추가
            </button>
          </div>
          <div className="space-y-4">
            {testCases.map((testCase, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">
                    {testCase.isExample ? '예제' : '테스트케이스'} {index + 1}
                  </h3>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={testCase.isExample}
                      onChange={(e) => handleTestCaseChange(index, 'isExample', e.target.checked)}
                      className="rounded text-PRIMARY focus:ring-PRIMARY"
                    />
                    <span className="text-sm text-gray-600">예제로 표시</span>
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">입력</label>
                    <textarea
                      value={testCase.input}
                      onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-PRIMARY"
                      rows={3}
                      placeholder="테스트케이스 입력값"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">출력</label>
                    <textarea
                      value={testCase.output}
                      onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-PRIMARY"
                      rows={3}
                      placeholder="테스트케이스 출력값"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-PRIMARY text-white rounded-lg hover:bg-PRIMARY_DARK transition-colors"
          >
            문제 생성하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemCreatePage;
