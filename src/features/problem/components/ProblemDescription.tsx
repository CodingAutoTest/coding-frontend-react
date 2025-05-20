import { FC } from 'react';
import { ProblemDescriptionProps } from '../types/problem.type';

const Divider = () => <div className="bg-problem-DIVIDER h-[1px] w-full my-3" />;

const Section = ({ title, content }: { title: string; content: string }) => (
  <div className="flex flex-col w-full px-5 mb-8">
    <span className="text-DEFAULT text-xl font-inter mb-2.5">{title}</span>
    <Divider />
    <div
      className="text-DEFAULT text-[15px] font-inter whitespace-pre-line break-words"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </div>
);

const ProblemDescription: FC<ProblemDescriptionProps> = ({
  description,
  inputFormat,
  outputFormat,
}) => (
  <div className="flex flex-col w-full mt-5">
    <Section title="문제" content={description} />
    <Section title="입력" content={inputFormat} />
    <Section title="출력" content={outputFormat} />
  </div>
);

export default ProblemDescription;
