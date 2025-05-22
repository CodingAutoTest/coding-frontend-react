import { FC } from 'react';

type StatCardProps = {
  label: string;
  value: string | number;
  unit?: string;
  iconUrl: string;
};

const StatCard: FC<StatCardProps> = ({ label, value, unit, iconUrl }) => {
  return (
    <div className="bg-white rounded-[20px] shadow-sm px-6 py-4 flex justify-between items-center w-full">
      <div className="flex flex-col">
        <span className="text-DEFAULT text-[14px] font-inter mb-1">{label}</span>
        <span className="text-DEFAULT text-[24px] font-sans font-semibold">
          {value}
          {unit && <span className="text-[16px] font-inter ml-[2px]">{unit}</span>}
        </span>
      </div>
      <img src={iconUrl} alt={`${label} 아이콘`} className="w-[40px] h-[40px]" draggable={false} />
    </div>
  );
};

export default StatCard;
