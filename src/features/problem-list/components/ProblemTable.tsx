import { FC, useEffect, useState } from 'react';
import { Problem, getProblems } from '../api/problem-api';
import Pagination from '@/components/Pagination';
import { useNavigate } from 'react-router-dom';
import { useFilterStore } from '../stores/useFilterStore';
import unsolvedIcon from '@/assets/problem-list/unsolved-icon.svg';
import solvingIcon from '@/assets/problem-list/solving-icon.svg';
import solvedIcon from '@/assets/problem-list/solved-icon.svg';

const getDifficultyNumber = (difficulty: string): number | undefined => {
  const difficultyMap: Record<string, number> = {
    bronze: 1,
    silver: 2,
    gold: 3,
    platinum: 4,
    diamond: 5,
    master: 6,
  };
  return difficultyMap[difficulty];
};

const getStatusIcon = (status: number) => {
  switch (status) {
    case -1:
      return <img src={unsolvedIcon} alt="미해결" />;
    case 0:
      return <img src={solvingIcon} alt="해결 중" />;
    case 1:
      return <img src={solvedIcon} alt="해결 완료" />;
    default:
      return <img src={unsolvedIcon} alt="미해결" />;
  }
};

const ProblemTable: FC = () => {
  const [data, setData] = useState<Problem[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedProblemStatus, selectedDifficulty, appliedAlgorithm, search } = useFilterStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getProblems(
          page,
          20,
          selectedProblemStatus || undefined,
          getDifficultyNumber(selectedDifficulty) || undefined,
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
  }, [page, selectedProblemStatus, selectedDifficulty, appliedAlgorithm, search]);

  if (isLoading) {
    return (
      <div className="w-full h-40 flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full h-40 flex items-center justify-center">
        <div className="text-gray-500">문제가 없습니다.</div>
      </div>
    );
  }

  return (
    <section className="w-full" aria-labelledby="problem-table">
      <table className="w-full text-center">
        <thead>
          <tr className="text-base text-DEFAULT font-medium font-nunito-sans border-b border-divider-DEFAULT">
            <th className="w-[100px] h-[22px] pb-[22px]">상태</th>
            <th className="w-[100px] h-[22px] pb-[22px]">난이도</th>
            <th className="w-[751px] pl-[100px] text-left pb-[22px]">문제</th>
            <th className="w-[100px] h-[22px] pb-[22px]">정답률</th>
          </tr>
        </thead>
        <tbody>
          {data.map((problem) => (
            <tr
              key={problem.id}
              onClick={() => navigate(`/problems/${problem.id}`)}
              className="hover:bg-gray-50 transition cursor-pointer text-base text-DEFAULT font-regular font-inter border-b border-divider-DEFAULT"
            >
              <td className="w-[100px] h-[22px] py-[22px]">
                <div className="flex items-center justify-center">
                  {getStatusIcon(problem.status || -1)}
                </div>
              </td>
              <td className="w-[100px] h-[22px] py-[22px]">
                <div className="flex items-center justify-center text-center space-x-2">
                  <span>{problem.difficulty}</span>
                </div>
              </td>
              <td className="pl-[100px] text-left py-[22px]">
                <span>{problem.title}</span>
              </td>
              <td className="py-[22px]">{problem.acceptanceRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => setPage(p)} />
    </section>
  );
};

export default ProblemTable;
