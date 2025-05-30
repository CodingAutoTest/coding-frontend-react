import React, { useState } from 'react';
import { SubmissionHistoryType } from '../types/problem.type';

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

  if (!submissions?.length) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-secondary">제출 내역이 없습니다.</p>
      </div>
    );
  }

  const formatMemory = (memoryInKB: number) => `${Math.floor(memoryInKB / 1024)}MB`;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const submissionsWithNo = submissions.map((submission, index) => ({
    ...submission,
    no: submissions.length - index,
  }));

  const sortedSubmissions = [...submissionsWithNo].sort((a, b) => {
    const getValue = (submission: typeof a) => {
      switch (sortKey) {
        case 'no':
          return submission.no;
        case 'createdAt':
          return new Date(submission.createdAt).getTime();
        case 'language':
          return submission.language;
        case 'executionTime':
          return submission.executionTime;
        case 'memoryUsed':
          return submission.memoryUsed;
        case 'status':
          return submission.status ? 1 : 0;
        default:
          return '';
      }
    };

    const aValue = getValue(a);
    const bValue = getValue(b);

    if (aValue !== bValue) {
      return sortOrder === 'asc' ? (aValue < bValue ? -1 : 1) : aValue < bValue ? 1 : -1;
    }

    return a.no - b.no;
  });

  const commonCellClass = 'py-3 px-4 text-sm font-inter text-DEFAULT text-center';
  const commonHeaderClass = 'py-4 px-4 text-sm font-inter text-DEFAULT cursor-pointer';

  return (
    <div className="w-full h-full">
      <table className="w-full">
        <thead>
          <tr className="bg-white border-b">
            <th className={commonHeaderClass} onClick={() => handleSort('no')}>
              No
            </th>
            <th className={commonHeaderClass} onClick={() => handleSort('createdAt')}>
              날짜
            </th>
            <th className={commonHeaderClass} onClick={() => handleSort('language')}>
              언어
            </th>
            <th className={commonHeaderClass} onClick={() => handleSort('executionTime')}>
              시간
            </th>
            <th className={commonHeaderClass} onClick={() => handleSort('memoryUsed')}>
              메모리
            </th>
            <th className={commonHeaderClass} onClick={() => handleSort('status')}>
              결과
            </th>
            <th className={commonHeaderClass}>코드</th>
          </tr>
        </thead>
        <tbody>
          {sortedSubmissions.map((submission) => (
            <tr key={submission.submissionId} className="border-b hover:bg-gray-50">
              <td className={commonCellClass}>{submission.no}</td>
              <td className={commonCellClass}>{submission.createdAt}</td>
              <td className={commonCellClass}>{submission.language}</td>
              <td className={commonCellClass}>{submission.executionTime}ms</td>
              <td className={commonCellClass}>{formatMemory(submission.memoryUsed)}</td>
              <td className={commonCellClass}>
                <span className={submission.status ? 'text-problem-SUCCESS' : 'text-problem-FAIL'}>
                  {submission.status ? '성공' : '실패'}
                </span>
              </td>
              <td className={commonCellClass}>
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
