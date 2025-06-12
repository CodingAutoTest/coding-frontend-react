// src/pages/PremiumInfoPage.tsx
import { FC, useEffect, useState } from 'react';
import MainHeader from '@/components/MainHeader';
import PremiumIntro from '@/features/premium/components/PremiumIntro';
import FreePlanCard from '@/features/premium/components/FreePlanCard';
import PremiumPlanCard from '@/features/premium/components/PremiumPlanCard';
import MySubscriptionInfo from '@/features/premium/components/MySubscriptionInfo';
import { fetchMySubscription } from '@/features/premium/api/fetch-my-subscription';

const PremiumInfoPage: FC = () => {
  const [subscription, setSubscription] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await fetchMySubscription();
        setSubscription(result);
      } catch (e) {
        console.error('구독 정보 가져오기 실패', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  if (isLoading) return null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <MainHeader />
      </div>
      <main className="w-full max-w-[1051px] mx-auto flex flex-col gap-[43px] pt-[116px]">
        {' '}
        {subscription ? (
          <MySubscriptionInfo {...subscription} />
        ) : (
          <>
            <PremiumIntro />
            <section className="flex flex-col md:flex-row gap-8">
              <FreePlanCard />
              <PremiumPlanCard />
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default PremiumInfoPage;
