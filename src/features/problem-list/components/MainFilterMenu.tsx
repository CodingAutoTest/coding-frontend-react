import { FC, useRef } from 'react';
import MainButton from './MainButton';
import Dropdown from './Dropdown';
import AlgorithmPopup from './AlgorithmPopup';
import TagButton from './TagButton';
import { useFilterStore } from '../stores/useFilterStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { ResetButton } from './ResetButton';
import SearchBar from '@/components/SearchBar';
import { PROBLEM_STATUS_OPTIONS, DIFFICULTY_OPTIONS } from '../constants/filter-options';
import { useAlgorithmTags } from '../hooks/useAlgorithmTags';

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
    setSearch,
    search,
  } = useFilterStore();

  const { algorithmOptions, isLoading } = useAlgorithmTags();
  const isLogin = useAuthStore((state) => state.isLogin);

  const problemStatusButtonRef = useRef<HTMLButtonElement>(null);
  const difficultyButtonRef = useRef<HTMLButtonElement>(null);

  const isProblemStatusOpen = selectedButton === 'problemStatus';
  const isDifficultyOpen = selectedButton === 'difficulty';
  const isAlgorithmOpen = selectedButton === 'algorithm';

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const getOptionText = (
    options: typeof PROBLEM_STATUS_OPTIONS | typeof DIFFICULTY_OPTIONS,
    value: string,
  ) => {
    return options.find((option) => option.value === value)?.text || '';
  };

  return (
    <div className="flex flex-col gap-[10px] pt-[10px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[15px]">
          <div className="flex items-center gap-[20px]" role="radiogroup">
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
                options={PROBLEM_STATUS_OPTIONS}
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
                options={DIFFICULTY_OPTIONS}
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
                options={algorithmOptions}
                selectedValue={selectedAlgorithm}
                onChange={setSelectedAlgorithm}
                onClose={handleAlgorithmClose}
                onApply={setAppliedAlgorithm}
                isLoading={isLoading}
              />
            </div>
          </div>
          <ResetButton />
        </div>
        <SearchBar
          placeholder="문제 검색"
          onSearch={handleSearch}
          debounceTime={300}
          value={search}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedProblemStatus && (
          <TagButton
            text={getOptionText(PROBLEM_STATUS_OPTIONS, selectedProblemStatus)}
            onRemove={() => setSelectedProblemStatus('')}
          />
        )}
        {selectedDifficulty && (
          <TagButton
            text={getOptionText(DIFFICULTY_OPTIONS, selectedDifficulty)}
            onRemove={() => setSelectedDifficulty('')}
          />
        )}
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
    </div>
  );
};

export default MainFilterMenu;
