import { FC, useEffect, useState } from 'react';
import { Problem, getProblems, fetchProblemViewCount } from '../api/problem-api';
import Pagination from '@/components/Pagination';
import { useNavigate } from 'react-router-dom';
import { useFilterStore } from '../stores/useFilterStore';
import unsolvedIcon from '@/assets/problem-list/unsolved-icon.svg';
import solvingIcon from '@/assets/problem-list/solving-icon.svg';
import solvedIcon from '@/assets/problem-list/solved-icon.svg';
import TierBadge from '@/components/TierBadge';
import { getDifficultyText } from '@/constants/difficulty';

type ProblemStatus = 0 | 1 | 2;

const STATUS_ICONS: Record<ProblemStatus, string> = {
  0: unsolvedIcon,
  1: solvingIcon,
  2: solvedIcon,
};

const STATUS_ALT_TEXTS: Record<ProblemStatus, string> = {
  0: '미해결',
  1: '해결 중',
  2: '해결 완료',
};

const getStatusIcon = (status: ProblemStatus) => {
  return <img src={STATUS_ICONS[status]} alt={STATUS_ALT_TEXTS[status]} draggable={false} />;
};

const LoadingState = () => (
  <div className="w-full h-40 flex items-center justify-center">
    <div className="animate-pulse flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-4 border-PRIMARY border-t-transparent rounded-full animate-spin" />
      <div className="text-DEFAULT font-nunito-sans text-lg">로딩 중...</div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="w-full h-40 flex items-center justify-center">
    <div className="text-DEFAULT font-nunito-sans text-lg">문제가 없습니다</div>
  </div>
);

const TableHeader = () => (
  <thead>
    <tr className="text-DEFAULT font-medium font-nunito-sans border-b border-divider-DEFAULT">
      <th className="w-[100px] h-[22px] pb-[22px] font-normal">상태</th>
      <th className="w-[100px] h-[22px] pb-[22px] font-normal">난이도</th>
      <th className="w-[751px] pl-[100px] text-left pb-[22px] font-normal">문제</th>
      <th className="w-[100px] h-[22px] pb-[22px] font-normal">정답률</th>
    </tr>
  </thead>
);

const TableRow: FC<{ problem: Problem; onClick: (id: number) => void }> = ({
  problem,
  onClick,
}) => (
  <tr
    onClick={() => onClick(problem.id)}
    className="hover:bg-gray-50 transition-all duration-200 cursor-pointer text-DEFAULT font-regular font-inter border-b border-divider-DEFAULT group"
  >
    <td className="w-[100px] h-[22px] py-4">
      <div className="flex items-center justify-center">
        {getStatusIcon(problem.status as ProblemStatus)}
      </div>
    </td>
    <td className="w-[100px] h-[22px] py-4">
      <div className="flex items-center justify-start pl-4 gap-[3px]">
        <TierBadge difficulty={problem.difficulty} size={20} />
        <span className="text-DEFAULT">{getDifficultyText(problem.difficulty)}</span>
      </div>
    </td>
    <td className="pl-[100px] text-left py-4">
      <div className="flex items-center gap-2">
        <span className="group-hover:text-PRIMARY transition-colors duration-200">
          {problem.title}
        </span>
      </div>
    </td>
    <td className="py-4">
      <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100">
        {problem.acceptanceRate}%
      </span>
    </td>
  </tr>
);

const ProblemTable: FC = () => {
  const [data, setData] = useState<Problem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const {
    selectedProblemStatus,
    selectedDifficulty,
    appliedAlgorithm,
    search,
    currentPage,
    setCurrentPage,
  } = useFilterStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getProblems(
          currentPage,
          20,
          selectedProblemStatus || undefined,
          selectedDifficulty || undefined,
          appliedAlgorithm || undefined,
          search || undefined,
        );
        setData(response?.problems || []);
        setTotalPages(response?.totalPages || 1);
      } catch (error) {
        console.error('Failed to fetch problems:', error);
        setData([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage, selectedProblemStatus, selectedDifficulty, appliedAlgorithm, search]);

  const handleProblemClick = async (problemId: number) => {
    await fetchProblemViewCount(problemId);
    navigate(`/problems/${problemId}`);
  };

  if (isLoading) return <LoadingState />;
  if (data.length === 0) return <EmptyState />;

  return (
    <section className="w-full bg-white rounded-lg" aria-labelledby="problem-table">
      <div className="overflow-x-auto">
        <table className="w-full text-center">
          <TableHeader />
          <tbody>
            {data.map((problem) => (
              <TableRow key={problem.id} problem={problem} onClick={handleProblemClick} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-4 border-t border-divider-DEFAULT">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default ProblemTable;
