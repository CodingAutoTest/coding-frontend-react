// src/features/profile-setting/components/InfoAction.tsx
import { FC } from 'react';
import ActionButton from './ActionButton';

type Props = {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  buttonClassName?: string;
};

const InfoAction: FC<Props> = ({
  title,
  description,
  buttonText,
  onClick,
  buttonClassName = 'bg-indigo-600', // 기본 파랑
}) => (
  <section className="flex w-[912px] items-center justify-between rounded-2xl bg-white p-6 shadow-md">
    <div>
      <h2 className="text-xl font-bold text-neutral-800">{title}</h2>
      <p className="text-base text-gray-600">{description}</p>
    </div>

    {/* ✅ 전달된 색상 클래스를 실제 버튼에 적용 */}
    <ActionButton text={buttonText} onClick={onClick} className={`h-10 w-28 ${buttonClassName}`} />
  </section>
);

export default InfoAction;
