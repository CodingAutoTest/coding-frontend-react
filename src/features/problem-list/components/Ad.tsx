const Ad = () => {
  return (
    <div className="w-full h-[120px] bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-between px-8 relative overflow-hidden">
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      {/* 왼쪽 텍스트 영역 */}
      <div className="flex flex-col gap-2 z-10">
        <h2 className="text-white text-2xl font-bold font-inter">AI 기반 코딩테스트 코오테</h2>
        <p className="text-white/80 text-sm font-inter">
          실전같은 코딩테스트 환경에서 실력을 키워보세요
        </p>
      </div>

      {/* 오른쪽 CTA 버튼 */}
      {/* <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-colors duration-200 z-10">
        시작하기
      </button> */}
    </div>
  );
};

export default Ad;
