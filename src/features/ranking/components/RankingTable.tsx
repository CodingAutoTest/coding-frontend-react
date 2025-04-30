import { FC, useEffect, useState } from 'react';
import { fetchRankingList, RankingItem } from '../api/fetch-ranking-list';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';

type Props = {
  name: string;
  sort: 'rating' | 'solvedCount';
  order: 'asc' | 'desc';
  onSortChange: (key: 'rating' | 'solvedCount') => void;
};

const RankingTable: FC<Props> = ({ name, sort, order, onSortChange }) => {
  const [data, setData] = useState<RankingItem[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchRankingList(page, 10, sort, order, name);
      setData(res.rankings);
      setTotalPages(res.totalPages);
    };
    fetchData();
  }, [page, name, sort, order]);

  const renderSortIcon = (key: 'rating' | 'solvedCount') => {
    if (sort !== key) return '⬍';
    return order === 'asc' ? '🔼' : '🔽';
  };

  return (
    <section className="w-full" aria-labelledby="ranking-table">
      <header id="ranking-table" className="sr-only">
        전체 랭킹 테이블
      </header>

      <table className="w-full text-left">
        <thead>
          <tr className="text-sm text-gray-500 font-semibold border-b border-black">
            <th className="py-3 px-4 text-center">순위</th>
            <th className="py-3 px-4 text-center w-[20%]">티어</th>
            <th className="py-3 px-4 w-[40%]">닉네임</th>
            <th
              className={`py-3 px-6 text-right cursor-pointer select-none ${
                sort === 'rating' ? 'text-[#56C364]' : ''
              }`}
              onClick={() => onSortChange('rating')}
            >
              레이팅 {renderSortIcon('rating')}
            </th>
            <th className="py-3 px-6 text-right">마라톤</th>
            <th
              className={`py-3 px-6 text-right cursor-pointer select-none ${
                sort === 'solvedCount' ? 'text-[#56C364]' : ''
              }`}
              onClick={() => onSortChange('solvedCount')}
            >
              해결한 문제 {renderSortIcon('solvedCount')}
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-base">
          {data.map((item) => (
            <tr
              key={item.rank}
              onClick={() => navigate(`/user/${item.userId}`)} // ✅ 추가
              className="hover:bg-gray-50 transition border-b cursor-pointer"
            >
              <td className="py-6 px-5 text-center  ">{item.rank}</td>
              <td className="py-6 px-5 text-center">
                <div className="flex items-center justify-center  text-center space-x-2">
                  <img
                    src={`/tiers/${item.tier.toLowerCase()}.svg`}
                    className="w-5 h-5"
                    alt={item.tier}
                  />
                  <span>{item.tier}</span>
                </div>
              </td>
              <td className="py-6 px-5 text-center">
                <div className="flex  items-center space-x-3">
                  <img
                    src={item.profileImage || '/tiers/default-profile.svg'}
                    alt="프로필"
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{item.name}</span>
                </div>
              </td>
              <td className="py-6 px-7 text-right">{item.rating}</td>
              <td className="py-6 px-7 text-right">{item.marathonDays}일</td>
              <td className="py-6 px-7 text-right">{item.solvedCount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => setPage(p)} />
    </section>
  );
};

export default RankingTable;
