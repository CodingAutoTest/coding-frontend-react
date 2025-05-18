import { FC, useEffect, useState, useRef } from 'react';
import MainButton from './MainButton';
import Dropdown from './Dropdown';
import AlgorithmPopup from './AlgorithmPopup';
import TagButton from './TagButton';
import { useFilterStore } from '../stores/useFilterStore';
import { getAlgorithmTags } from '../api/tag-api';
import { useAuthStore } from '@/stores/useAuthStore';
import { ResetButton } from './ResetButton';

const MainFilterMenu: FC = () => {
  const {
    selectedButton,
    selectedProblemStatus,
    selectedDifficulty,
    selectedAlgorithm,
    appliedAlgorithm,
    setSelectedProblemStatus,
    setSelectedDifficulty,
    setSelectedAlgorithm,
    setAppliedAlgorithm,
    handleButtonSelect,
    handleAlgorithmClose,
  } = useFilterStore();

  const [algorithmOptions, setAlgorithmOptions] = useState<{ text: string; value: number }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isLogin = useAuthStore((state) => state.isLogin);

  const problemStatusButtonRef = useRef<HTMLButtonElement>(null);
  const difficultyButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchAlgorithmTags = async () => {
      if (selectedButton === 'algorithm') {
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
          return;
        }
        setIsLoading(false);
      }
    };

    fetchAlgorithmTags();
  }, [selectedButton]);

  const filteredAlgorithmOptions =
    searchQuery.trim() === ''
      ? algorithmOptions
      : algorithmOptions.filter((option) =>
          option.text.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  const problemStatusOptions = [
    { text: '미해결', value: 'unsolved' },
    { text: '해결중', value: 'solving' },
    { text: '해결완료', value: 'solved' },
  ];

  const difficultyOptions = [
    { text: '브론즈', value: 'bronze' },
    { text: '실버', value: 'silver' },
    { text: '골드', value: 'gold' },
    { text: '플래티넘', value: 'platinum' },
    { text: '다이아', value: 'diamond' },
    { text: '마스터', value: 'master' },
  ];

  const isProblemStatusOpen = selectedButton === 'problemStatus';
  const isDifficultyOpen = selectedButton === 'difficulty';
  const isAlgorithmOpen = selectedButton === 'algorithm';

  return (
    <div className="relative flex items-center gap-[21px]" role="radiogroup">
      <div className="relative">
        <MainButton
          ref={problemStatusButtonRef}
          text="문제 상태"
          icon
          disabled={!isLogin}
          isSelected={isProblemStatusOpen}
          onSelect={() => handleButtonSelect('problemStatus')}
        />
        <Dropdown
          isOpen={isProblemStatusOpen}
          options={problemStatusOptions}
          selectedValue={selectedProblemStatus || ''}
          onChange={(value) => {
            if (value === '') {
              setSelectedProblemStatus('');
            } else {
              setSelectedProblemStatus(value);
            }
          }}
          onClose={() => handleButtonSelect('problemStatus')}
          buttonRef={problemStatusButtonRef as React.RefObject<HTMLElement>}
        />
      </div>
      <div className="relative">
        <MainButton
          ref={difficultyButtonRef}
          text="난이도"
          icon
          isSelected={isDifficultyOpen}
          onSelect={() => handleButtonSelect('difficulty')}
        />
        <Dropdown
          isOpen={isDifficultyOpen}
          options={difficultyOptions}
          selectedValue={selectedDifficulty}
          onChange={setSelectedDifficulty}
          onClose={() => handleButtonSelect('difficulty')}
          buttonRef={difficultyButtonRef as React.RefObject<HTMLElement>}
        />
      </div>
      <div className="relative">
        <MainButton
          text="알고리즘"
          isSelected={isAlgorithmOpen}
          onSelect={() => handleButtonSelect('algorithm')}
        />
        <AlgorithmPopup
          isOpen={isAlgorithmOpen}
          options={filteredAlgorithmOptions}
          selectedValue={selectedAlgorithm}
          onChange={setSelectedAlgorithm}
          onClose={handleAlgorithmClose}
          onApply={setAppliedAlgorithm}
          isLoading={isLoading}
          onSearch={setSearchQuery}
        />
      </div>
      <ResetButton />
      {appliedAlgorithm !== 0 && (
        <TagButton
          text={algorithmOptions.find((option) => option.value === appliedAlgorithm)?.text || ''}
          onRemove={() => {
            setAppliedAlgorithm(0);
            setSelectedAlgorithm(0);
          }}
        />
      )}
    </div>
  );
};

export default MainFilterMenu;
