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

const RankingHeader: FC<Props> = ({
  rank,
  name,
  profileImage,
  tier,
  rating,
  marathonDays,
  solvedCount,
}) => {
  const tierIconPath = tier ? `/tiers/${tier.toLowerCase()}.svg` : '/tiers/default.svg';

  return (
    <section aria-labelledby="my-ranking" className="max-w-screen-xl mx-auto mt-6">
      <header id="my-ranking" className="sr-only">
        내 랭킹
      </header>

      <table className="w-full text-left">
        <thead>
          <tr className="text-sm text-gray-500 font-semibold border-b border-black">
            <th className="py-3 px-4 text-center">순위</th>
            <th className="py-3 px-4 text-center w-[20%]">티어</th>
            <th className="py-3 px-4 w-[40%]">닉네임</th>
            <th className="py-3 px-6 text-right">레이팅</th>
            <th className="py-3 px-6 text-right">마라톤</th>
            <th className="py-3 px-6 text-right">해결한 문제</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-base">
          <tr className="hover:bg-gray-50 transition border-b">
            <td className="py-6 px-5 text-center">{rank}</td>
            <td className="py-6 px-5 text-center">
              <div className="flex justify-center items-center space-x-2">
                <img src={tierIconPath} className="w-5 h-5" alt={tier} />
                <span>{tier}</span>
              </div>
            </td>
            <td className="py-6 px-5 text-center">
              <div className="flex items-center space-x-3">
                <img
                  src={profileImage || '/tiers/default-profile.svg'}
                  alt="프로필 이미지"
                  className="w-6 h-6 rounded-full"
                />
                <span>{name}</span>
              </div>
            </td>
            <td className="py-6 px-7 text-right">{rating}</td>
            <td className="py-6 px-7 text-right">{marathonDays}일</td>
            <td className="py-6 px-7 text-right">{solvedCount.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default RankingHeader;
