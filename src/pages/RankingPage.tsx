// src/pages/RankingPage.tsx
import { useState, useEffect } from 'react';
import MainHeader from '@/components/MainHeader';
import RankingHeader from '@/features/ranking/components/RankingHearder';
import RankingTable from '@/features/ranking/components/RankingTable';
import SearchBar from '@/components/SearchBar';
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
    <>
      {/* 🧭 상단 고정 헤더 */}
      <MainHeader />

      <main className="w-full max-w-[1051px] mx-auto gap-[43px] flex flex-col">
        {/* 👤 내 랭킹 */}
        {myRanking && (
          <section className="w-full">
            <RankingHeader {...myRanking} />
          </section>
        )}

        {/* 🔍 검색창 */}
        <div className="w-full">
          <div className="flex justify-end">
            <SearchBar
              placeholder="닉네임 검색"
              onSearch={setSearchName}
              width="407px" // 필요 시 조절
            />
          </div>
        </div>

        {/* 📊 랭킹 테이블 */}
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
    </>
  );
};

export default RankingPage;
