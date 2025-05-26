import MainHeader from '@/components/MainHeader';
import Ad from '@/features/problem-list/components/Ad';
import MainFilterMenu from '@/features/problem-list/components/MainFilterMenu';
import ProblemTable from '@/features/problem-list/components/ProblemTable';
const ProblemList = () => {
  return (
    <div className="w-screen h-screen relative bg-white overflow-x-hidden overflow-y-auto scrollbar-hide">
      <MainHeader />

      <main className="w-full max-w-[1051px] mx-auto gap-[33px] flex flex-col">
        <Ad />
        <MainFilterMenu />
        <ProblemTable />
      </main>
    </div>
  );
};

export default ProblemList;
