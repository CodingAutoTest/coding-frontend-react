import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRankingList } from '../hooks/useRankingList';
import { useRankingStore } from '../stores/rankingStore';
import { getTierImage } from './TierIcon';
import Pagination from '@/components/Pagination';
import defaultProfileImg from '@/assets/profile.svg';

type Props = {
  onSortChange: (key: 'rating' | 'solvedCount') => void;
};

const RankingTable: FC<Props> = ({ onSortChange }) => {
  const { page, totalPages, sort, order, setPage } = useRankingStore();
  const { data } = useRankingList();
  const navigate = useNavigate();

  return (
    <section className="w-full" aria-labelledby="ranking-table">
      <header id="ranking-table" className="sr-only">
        전체 랭킹 테이블
      </header>

      <table className="w-full text-center">
        <thead>
          <tr className="text-base text-DEFAULT font-normal font-regular font-nunito-sans border-b border-divider-DEFAULT">
            <th className="w-[100px] h-[22px] pb-[22px] font-normal">순위</th>
            <th className="w-[100px] h-[22px] pb-[22px] font-normal">티어</th>
            <th className="w-[751px] pl-[100px] text-left pb-[22px] font-normal">닉네임</th>
            <th
              className="w-[100px] h-[22px] pb-[22px] cursor-pointer select-none"
              onClick={() => onSortChange('rating')}
            >
              <div className="flex items-center justify-center space-x-1">
                <span className={sort === 'rating' ? 'text-[#56C364]' : ''}>레이팅</span>
                <svg
                  width="13"
                  height="8"
                  viewBox="0 0 13 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-200 ${
                    order === 'asc' && sort === 'rating' ? 'rotate-180' : ''
                  }`}
                >
                  <path
                    d="M1.915 0.584961L6.5 5.16996L11.085 0.584961L12.5 1.99996L6.5 7.99996L0.5 1.99996L1.915 0.584961Z"
                    fill={sort === 'rating' ? '#56C364' : '#9CA3AF'}
                  />
                </svg>
              </div>
            </th>
            <th className="w-[100px] h-[22px] pb-[22px]">마라톤</th>
            <th
              className="w-[100px] h-[22px] pb-[22px] cursor-pointer select-none"
              onClick={() => onSortChange('solvedCount')}
            >
              <div className="flex items-center justify-center space-x-1 leading-none whitespace-nowrap">
                <span className={sort === 'solvedCount' ? 'text-[#56C364]' : ''}>해결한 문제</span>
                <svg
                  width="13"
                  height="8"
                  viewBox="0 0 13 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-200 ${
                    order === 'asc' && sort === 'solvedCount' ? 'rotate-180' : ''
                  }`}
                >
                  <path
                    d="M1.915 0.584961L6.5 5.16996L11.085 0.584961L12.5 1.99996L6.5 7.99996L0.5 1.99996L1.915 0.584961Z"
                    fill={sort === 'solvedCount' ? '#56C364' : '#9CA3AF'}
                  />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="text-base text-DEFAULT font-regular font-inter">
          {data.map((item) => (
            <tr
              key={item.name}
              onClick={() => navigate(`/profile/${item.name}/`)}
              className="hover:bg-gray-50 transition cursor-pointer border-b border-divider-DEFAULT"
            >
              <td className="w-[100px] h-[22px] py-[22px] text-center">{item.rank}</td>
              <td className="w-[100px] h-[22px] py-[22px] text-center">
                <div className="flex items-center justify-center space-x-2">
                  <img
                    src={getTierImage(item.tier)}
                    className="w-5 h-5"
                    alt={item.tier}
                    draggable={false}
                  />
                  <span>{item.tier}</span>
                </div>
              </td>
              <td className="w-[751px] pl-[100px] text-left py-[22px]">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.profileImage || defaultProfileImg}
                    alt="프로필"
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{item.name}</span>
                </div>
              </td>
              <td className="w-[100px] h-[22px] py-[22px]">{item.rating}</td>
              <td className="w-[100px] h-[22px] py-[22px]">{item.marathonDays}일</td>
              <td className="w-[100px] h-[22px] py-[22px]">{item.solvedCount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  );
};

export default RankingTable;
