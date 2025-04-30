import MainHeader from '@/components/MainHeader';
import MainControlMenu from '@/feature/problem-list/components/MainControlMenu';
import Ad from '@/feature/problem-list/components/Ad';

const ProblemList = () => {
  return (
    <div className="w-screen h-screen relative bg-white overflow-x-hidden overflow-y-auto">
      <MainHeader />

      <main className="w-full max-w-[1051px] mx-auto gap-[43px] flex flex-col">
        <Ad />
        <MainControlMenu />
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h2 className="text-xl font-bold mb-2">Sticky 헤더 테스트</h2>
          <p className="text-gray-600">
            이 영역을 스크롤하면 헤더가 상단에 고정되는 것을 확인할 수 있습니다.
          </p>
        </div>

        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h3 className="text-lg font-semibold mb-2">테스트 항목 {index + 1}</h3>
            <p className="text-gray-600">
              이 항목은 sticky 헤더의 동작을 테스트하기 위한 더미 컨텐츠입니다. 스크롤을 내리면
              헤더가 상단에 고정되는 것을 확인할 수 있습니다.
            </p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default ProblemList;
