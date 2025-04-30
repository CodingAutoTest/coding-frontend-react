// features/premium/components/FreePlanCard.tsx
import { FC } from 'react';

const FreePlanCard: FC = () => {
  return (
    <div className="flex flex-col w-full max-w-md">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Free</h2>
        <p className="text-gray-500">Limitless possibilities</p>
      </div>
      <div
        className="rounded-2xl p-8 w-full max-w-md flex flex-col h-[434px]"
        style={{ backgroundColor: '#E0E0E0' }}
      >
        <div className="mb-10">
          <p className="text-4xl font-bold">
            0원<span className="text-base font-normal">/month</span>
          </p>
          <p className="text-gray-400 mt-2">Try it as long as you like</p>
        </div>
        <div className="flex flex-col flex-1 justify-between">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-700 text-base mb-8">
            <li>✔️ AI를 활용한 피드백</li>
            <li>✔️ 항목</li>
            <li>✔️ 항목</li>
            <li>✔️ 항목</li>
          </ul>
          <button className="w-full py-3 rounded-full bg-white text-gray-900 font-semibold hover:bg-gray-100 transition">
            Sign up for free
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreePlanCard;
