import { useState, useEffect } from 'react';
import MainHeader from '@/components/MainHeader';
import RankingHeader from '@/features/ranking/components/RankingHearder';
import RankingTable from '@/features/ranking/components/RankingTable';
import SearchBar from '@/components/SearchBar';
import { fetchMyRanking, MyRanking } from '@/features/ranking/api/fetch-my-ranking';
import NotLoggedInRankingCard from '@/features/ranking/components/NotLoggedInRankingCard';
import { useRankingStore } from '@/features/ranking/stores/rankingStore';

const RankingPage = () => {
  const [myRanking, setMyRanking] = useState<MyRanking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { name, setSearchName, setSort } = useRankingStore();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await fetchMyRanking();
        setMyRanking(res);
      } catch (e) {
        setMyRanking(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <MainHeader />
      </div>

      <main className="w-full max-w-[1051px] mx-auto pt-[116px] gap-[43px] flex flex-col">
        {/* 👤 내 랭킹 or 로그인 안내 */}
        <section className="w-full">
          {!isLoading &&
            (myRanking ? <RankingHeader {...myRanking} /> : <NotLoggedInRankingCard />)}
        </section>

        {/* 🔍 검색창 */}
        <div className="w-full">
          <div className="flex justify-end">
            <SearchBar
              placeholder="닉네임 검색"
              onSearch={setSearchName}
              width="403px"
              value={name}
            />
          </div>
        </div>

        {/* 📊 전체 랭킹 테이블 */}
        <RankingTable onSortChange={setSort} />
      </main>
    </>
  );
};

export default RankingPage;
