import MainHeader from '@/components/MainHeader';
import MainControlMenu from '@/features/problem-list/components/MainControlMenu';
import Ad from '@/features/problem-list/components/Ad';
import ProblemTable from '@/features/problem-list/components/ProblemTable';
const ProblemList = () => {
  return (
    <div className="w-screen h-screen relative bg-white overflow-x-hidden overflow-y-auto">
      <MainHeader />

      <main className="w-full max-w-[1051px] mx-auto gap-[43px] flex flex-col">
        <Ad />
        <MainControlMenu />
        <ProblemTable />
      </main>
    </div>
  );
};

export default ProblemList;
