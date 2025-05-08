// src/pages/PremiumInfoPage.tsx
import { FC } from 'react';
import MainHeader from '@/components/MainHeader';
import PremiumIntro from '@/features/premium/components/PremiumIntro';
import FreePlanCard from '@/features/premium/components/FreePlanCard';
import PremiumPlanCard from '@/features/premium/components/PremiumPlanCard';

const PremiumInfoPage: FC = () => {
  return (
    <>
      {/* 🧭 상단 고정 헤더 */}
      <MainHeader />

      <main className="w-full max-w-[1051px] mx-auto flex flex-col gap-[43px]">
        <PremiumIntro />
        <section className="flex flex-col md:flex-row gap-8">
          <FreePlanCard />
          <PremiumPlanCard />
        </section>
      </main>
    </>
  );
};

export default PremiumInfoPage;
