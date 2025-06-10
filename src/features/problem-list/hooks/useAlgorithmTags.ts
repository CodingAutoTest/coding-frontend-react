import { useState, useEffect } from 'react';
import { getAlgorithmTags } from '../api/tag-api';
import { FilterOption } from '../types/filter';

export const useAlgorithmTags = () => {
  const [algorithmOptions, setAlgorithmOptions] = useState<FilterOption<number>[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAlgorithmTags = async () => {
      try {
        setIsLoading(true);
        const tags = await getAlgorithmTags();
        const options = tags.map((tag) => ({
          text: tag.name,
          value: tag.id,
        }));
        setAlgorithmOptions(options);
      } catch (error) {
        console.error('Failed to fetch algorithm tags:', error);
        setAlgorithmOptions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlgorithmTags();
  }, []);

  return { algorithmOptions, isLoading };
};
