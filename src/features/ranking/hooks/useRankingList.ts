import { useEffect, useState } from 'react';
import { fetchRankingList } from '../api/fetch-ranking-list';
import { RankingItem } from '../types/ranking-types';
import { useRankingStore } from '../stores/rankingStore';

export const useRankingList = () => {
  const { page, sort, order, name, setTotalPages } = useRankingStore();
  const [data, setData] = useState<RankingItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchRankingList(page, 10, sort, order, name);
      setData(res.rankings);
      setTotalPages(res.totalPages);
    };
    fetchData();
  }, [page, sort, order, name, setTotalPages]);

  return { data };
};
