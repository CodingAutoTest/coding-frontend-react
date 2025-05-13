import { FC } from 'react';
import clsx from 'clsx';
import { TabType } from '@/features/problem/constants/tab.constants';

export type TabBarProps = {
  tabs: readonly TabType[];
  activeTab: TabType;
  onChange: (tab: TabType) => void;
};

const TabBar: FC<TabBarProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex items-start rounded-tl-[10px] rounded-tr-[10px] bg-problem-TAB_BAR">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={clsx(
            'px-[20px] py-[7px] rounded-tl-[10px] rounded-tr-[10px] text-[16px]',
            tab === activeTab ? 'bg-PRIMARY text-white' : 'bg-problem-TAB_BAR text-DEFAULT',
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
