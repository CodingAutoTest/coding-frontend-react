// src/features/ranking/components/RankingHeader.tsx
import { FC } from 'react';

type Props = {
  rank: number;
  name: string;
  profileImage: string;
  tier: string;
  rating: number;
  marathonDays: number;
  solvedCount: number;
};

const tierImages = import.meta.glob('/src/assets/tiers/*.svg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const getTierImage = (tier: string) => {
  const key = `/src/assets/tiers/${tier}.svg`;
  return tierImages[key] || '/tiers/default-profile.svg';
};

const RankingHeader: FC<Props> = ({
  rank,
  name,
  profileImage,
  tier,
  rating,
  marathonDays,
  solvedCount,
}) => {
  const tierIconPath = getTierImage(tier);

  return (
    <section aria-labelledby="my-ranking" className="max-w-screen-xl mx-auto mt-6">
      <header id="my-ranking" className="sr-only">
        내 랭킹
      </header>

      <table className="w-full text-center">
        <thead>
          <tr className="text-base text-DEFAULT font-medium font-nunito-sans border-b border-divider-DEFAULT">
            <th className="w-[100px] h-[22px] pb-[22px]">순위</th>
            <th className="w-[100px] h-[22px] pb-[22px]">티어</th>
            <th className="w-[751px] pl-[100px] text-left pb-[22px]">닉네임</th>
            <th className="w-[100px] h-[22px] pb-[22px]">레이팅</th>
            <th className="w-[100px] h-[22px] pb-[22px]">마라톤</th>
            <th className="w-[100px] h-[22px] pb-[22px]">해결한 문제</th>
          </tr>
        </thead>
        <tbody className="text-base text-DEFAULT font-regular font-inter">
          <tr className="hover:bg-gray-50 transition border-b border-divider-DEFAULT">
            <td className="w-[100px] h-[22px] py-[22px] text-center">{rank}</td>
            <td className="w-[100px] h-[22px] py-[22px] text-center">
              <div className="flex items-center justify-center space-x-2">
                <img src={tierIconPath} className="w-5 h-5" alt={tier} />
                <span>{tier}</span>
              </div>
            </td>
            <td className="w-[751px] pl-[100px] text-left py-[22px]">
              <div className="flex items-center space-x-3">
                <img
                  src={profileImage || '/tiers/default-profile.svg'}
                  alt="프로필 이미지"
                  className="w-6 h-6 rounded-full"
                />
                <span>{name}</span>
              </div>
            </td>
            <td className="w-[100px] h-[22px] py-[22px] ">{rating}</td>
            <td className="w-[100px] h-[22px] py-[22px] ">{marathonDays}일</td>
            <td className="w-[100px] h-[22px] py-[22px] ">{solvedCount.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default RankingHeader;
