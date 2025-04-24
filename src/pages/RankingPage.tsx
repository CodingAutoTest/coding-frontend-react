// pages/RankingPage.tsx
import { useState, useEffect } from 'react';
import RankingHeader from '@/features/ranking/components/RankingHearder';
import RankingTable from '@/features/ranking/components/RankingTable';
import SearchBar from '@/features/ranking/components/SearchBar';
import { fetchMyRanking, MyRanking } from '@/features/ranking/api/fetch-my-ranking';

const RankingPage = () => {
  const [myRanking, setMyRanking] = useState<MyRanking | null>(null);
  const [searchName, setSearchName] = useState('');
  const [sort, setSort] = useState<'rating' | 'solvedCount'>('rating');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchMyRanking().then(setMyRanking);
  }, []);

  return (
    <main className="w-full max-w-[1051px] mx-auto gap-[43px] flex flex-col">
      {/* 💡 헤더 공간만 확보 (실제 헤더는 나중에 구현) */}
      <header className="h-[116px]" />

      {myRanking && (
        <section className="w-full">
          <RankingHeader {...myRanking} />
        </section>
      )}

      {/* 🔍 검색창 우측 정렬 */}
      <div className="w-full">
        <div className="flex justify-end">
          <SearchBar onSearch={setSearchName} />
        </div>
      </div>

      {/* 📊 전체 랭킹 테이블 */}
      <RankingTable
        name={searchName}
        sort={sort}
        order={order}
        onSortChange={(key) => {
          if (sort === key) {
            setOrder(order === 'asc' ? 'desc' : 'asc');
          } else {
            setSort(key);
            setOrder('desc');
          }
        }}
      />
    </main>
  );
};

export default RankingPage;
