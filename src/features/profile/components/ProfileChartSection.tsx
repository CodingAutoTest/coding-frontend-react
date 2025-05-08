// components/ProfileChartSection.tsx
import { FC, ReactNode } from 'react';

type Props = {
  title: string;
  subtitle: string;
  chart: ReactNode;
};

const ProfileChartSection: FC<Props> = ({ title, subtitle, chart }) => {
  return (
    <section className="w-[921px] h-96 px-5 py-2.5 bg-neutral-100 rounded-2xl inline-flex flex-col justify-start items-center gap-4">
      <header className="self-stretch flex flex-col justify-start items-start">
        <h2 className="text-black text-[10px] font-semibold font-['Poppins']">{title}</h2>
        <h3 className="text-black text-lg font-semibold font-['Poppins'] mb-4">{subtitle}</h3>
      </header>
      <article className="w-[880px] h-64 inline-flex justify-start items-center pr-5">
        {chart}
      </article>
    </section>
  );
};

export default ProfileChartSection;
