import { useEffect, useState } from 'react';
import { fetchRankingList } from '../api/fetch-ranking-list';
import { RankingItem } from '../types/ranking-types';

export const useRankingList = (
  page: number,
  sort: 'rating' | 'solvedCount',
  order: 'asc' | 'desc',
  name: string,
) => {
  const [data, setData] = useState<RankingItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchRankingList(page, 10, sort, order, name);
      setData(res.rankings);
      setTotalPages(res.totalPages);
    };
    fetchData();
  }, [page, sort, order, name]);

  return { data, totalPages };
};
