import React, { useState } from 'react';
import { SubmissionHistoryType } from '../types/submission-history.type';

type SubmissionHistoryProps = {
  submissions: SubmissionHistoryType[] | null;
  onViewCode: (submissionId: number) => void;
};

type SortKey = 'no' | 'createdAt' | 'language' | 'executionTime' | 'memoryUsed' | 'status';

type SortOrder = 'asc' | 'desc';

export const SubmissionHistory: React.FC<SubmissionHistoryProps> = ({
  submissions,
  onViewCode,
}) => {
  const [sortKey, setSortKey] = useState<SortKey>('no');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  if (!submissions || submissions.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-secondary">제출 내역이 없습니다.</p>
      </div>
    );
  }

  const formatMemory = (memoryInKB: number) => {
    const memoryInMB = Math.floor(memoryInKB / 1024);
    return `${memoryInMB}MB`;
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  // 초기 번호 부여 (가장 최근 제출이 가장 큰 번호)
  const submissionsWithNo = submissions.map((submission, index) => ({
    ...submission,
    no: submissions.length - index,
  }));

  const sortedSubmissions = [...submissionsWithNo].sort((a, b) => {
    let aValue: number | string;
    let bValue: number | string;

    // 주 정렬 기준
    if (sortKey === 'no') {
      aValue = a.no;
      bValue = b.no;
    } else if (sortKey === 'createdAt') {
      aValue = new Date(a.createdAt).getTime();
      bValue = new Date(b.createdAt).getTime();
    } else if (sortKey === 'language') {
      aValue = a.language;
      bValue = b.language;
    } else if (sortKey === 'executionTime') {
      aValue = a.executionTime;
      bValue = b.executionTime;
    } else if (sortKey === 'memoryUsed') {
      aValue = a.memoryUsed;
      bValue = b.memoryUsed;
    } else if (sortKey === 'status') {
      aValue = a.status ? 1 : 0;
      bValue = b.status ? 1 : 0;
    } else {
      aValue = '';
      bValue = '';
    }

    // 주 정렬 기준으로 비교
    if (aValue !== bValue) {
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    }

    // 값이 같은 경우 No로 보조 정렬 (항상 오름차순)
    return a.no - b.no;
  });

  return (
    <div className="w-full h-full">
      <table className="w-full">
        <thead>
          <tr className="bg-white border-b">
            <th
              className="py-4 px-4 text-center text-sm font-inter text-DEFAULT cursor-pointer"
              onClick={() => handleSort('no')}
            >
              No
            </th>
            <th
              className="py-4 px-4 text-center text-sm font-inter text-DEFAULT cursor-pointer"
              onClick={() => handleSort('createdAt')}
            >
              날짜
            </th>
            <th
              className="py-4 px-4 text-center text-sm font-inter text-DEFAULT cursor-pointer"
              onClick={() => handleSort('language')}
            >
              언어
            </th>
            <th
              className="py-4 px-4 text-center text-sm font-inter text-DEFAULT cursor-pointer"
              onClick={() => handleSort('executionTime')}
            >
              시간
            </th>
            <th
              className="py-4 px-4 text-center text-sm font-inter text-DEFAULT cursor-pointer"
              onClick={() => handleSort('memoryUsed')}
            >
              메모리
            </th>
            <th
              className="py-4 px-4 text-center text-sm font-inter text-DEFAULT cursor-pointer"
              onClick={() => handleSort('status')}
            >
              결과
            </th>
            <th className="py-4 px-4 text-center text-sm font-inter text-DEFAULT">코드</th>
          </tr>
        </thead>
        <tbody>
          {sortedSubmissions.map((submission) => (
            <tr key={submission.submissionId} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 text-sm font-inter text-DEFAULT text-center">
                {submission.no}
              </td>
              <td className="py-3 px-4 text-sm font-inter text-DEFAULT text-center">
                {submission.createdAt}
              </td>
              <td className="py-3 px-4 text-sm font-inter text-DEFAULT text-center">
                {submission.language}
              </td>
              <td className="py-3 px-4 text-sm font-inter text-DEFAULT text-center">
                {submission.executionTime}ms
              </td>
              <td className="py-3 px-4 text-sm font-inter text-DEFAULT text-center">
                {formatMemory(submission.memoryUsed)}
              </td>
              <td className="py-3 px-4 text-sm text-center">
                <span
                  className={`${submission.status ? 'text-problem-SUCCESS' : 'text-problem-FAIL'}`}
                >
                  {submission.status ? '성공' : '실패'}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                <button
                  onClick={() => onViewCode(submission.submissionId)}
                  className="text-sm text-PRIMARY hover:underline"
                >
                  보기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
