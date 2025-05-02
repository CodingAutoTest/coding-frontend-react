import { FC } from 'react';
import { ProblemDescriptionProps } from '../types/problem.type';

const Divider = () => <div className="bg-problem-DIVIDER h-[1px] w-full my-[12px]" />;

const Section = ({ title, content }: { title: string; content: string }) => (
  <div className="flex flex-col w-full px-[20px] mb-[32px]">
    <span className="text-DEFAULT text-[20px] font-bold mb-[10px]">{title}</span>
    <Divider />
    <div
      className="text-DEFAULT text-[15px] font-medium whitespace-pre-line break-words"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </div>
);

const ProblemDescription: FC<ProblemDescriptionProps> = ({
  description,
  inputFormat,
  outputFormat,
}) => {
  return (
    <div className="flex flex-col w-full mt-[60px]">
      <Section title="문제" content={description} />
      <Section title="입력" content={inputFormat} />
      <Section title="출력" content={outputFormat} />
    </div>
  );
};

export default ProblemDescription;
