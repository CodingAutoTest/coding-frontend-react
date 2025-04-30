import { useState } from 'react';
import MainButton from './MainButton';
import Dropdown from './Dropdown';
import AlgorithmPopup from './AlgorithmPopup';
import TagButton from './TagButton';

const MainFilterMenu = () => {
  const [selectedButton, setSelectedButton] = useState<string>('');
  const [selectedProblemStatus, setSelectedProblemStatus] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);
  const [appliedAlgorithm, setAppliedAlgorithm] = useState(0);

  const problemStatusOptions = [
    { text: 'unsolved', value: 'unsolved' },
    { text: 'solving', value: 'solving' },
    { text: 'solved', value: 'solved' },
  ];

  const difficultyOptions = [
    { text: '브론즈', value: 'bronze' },
    { text: '실버', value: 'silver' },
    { text: '골드', value: 'gold' },
    { text: '플레티넘', value: 'platinum' },
    { text: '다이아', value: 'diamond' },
    { text: '마스터', value: 'master' },
  ];

  const algorithmOptions = [
    { text: '수학', value: 1 },
    { text: '그리디', value: 2 },
    { text: '다이나믹 프로그래밍', value: 3 },
    { text: 'BFS', value: 4 },
    { text: 'DFS', value: 5 },
    { text: '그래프', value: 6 },
    { text: '그래프 탐색', value: 7 },
  ];

  const handleButtonSelect = (buttonId: string) => {
    setSelectedButton((prev) => (prev === buttonId ? '' : buttonId)); // 토글 끄기
    if (buttonId !== 'algorithm') {
      setSelectedAlgorithm(0);
    }
  };

  const handleAlgorithmClose = () => {
    setSelectedButton('');
    setSelectedAlgorithm(0);
  };

  const isProblemStatusOpen = selectedButton === 'problemStatus';
  const isDifficultyOpen = selectedButton === 'difficulty';
  const isAlgorithmOpen = selectedButton === 'algorithm';

  return (
    <div className="relative flex items-center gap-[21px]" role="radiogroup">
      <div className="relative">
        <MainButton
          text="문제 상태"
          icon
          isSelected={isProblemStatusOpen}
          onSelect={() => handleButtonSelect('problemStatus')}
        />
        <Dropdown
          isOpen={isProblemStatusOpen}
          options={problemStatusOptions}
          selectedValue={selectedProblemStatus}
          onChange={setSelectedProblemStatus}
        />
      </div>
      <div className="relative">
        <MainButton
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
        />
      </div>
      {appliedAlgorithm !== 0 && (
        <TagButton
          text={algorithmOptions.find((option) => option.value === appliedAlgorithm)?.text || ''}
          onRemove={() => setAppliedAlgorithm(0)}
        />
      )}
    </div>
  );
};

export default MainFilterMenu;
