import { FC } from 'react';

type StatCardProps = {
  label: string;
  value: string | number;
  unit?: string;
  iconUrl: string;
};

const StatCard: FC<StatCardProps> = ({ label, value, unit, iconUrl }) => {
  return (
    <div className="bg-white rounded-[20px] shadow-sm px-6 py-4 flex justify-between items-center w-[200px] min-h-[100px]">
      <div className="flex flex-col">
        <span className="text-[#232323] text-[14px] font-semibold mb-1">{label}</span>
        <span className="text-[#232323] text-[24px] font-medium">
          {value}
          {unit && <span className="text-[16px] font-medium ml-[2px]">{unit}</span>}
        </span>
      </div>
      <img src={iconUrl} alt={`${label} 아이콘`} className="w-[40px] h-[40px]" />
    </div>
  );
};

export default StatCard;
