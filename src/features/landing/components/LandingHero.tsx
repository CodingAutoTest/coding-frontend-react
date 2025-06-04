import { Link } from 'react-router-dom';

export default function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* 배경 패턴 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 animate-[slide_20s_linear_infinite]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 animate-[slide_15s_linear_infinite_reverse]" />
      </div>

      {/* 그라데이션 배경 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent animate-[pulse_4s_ease-in-out_infinite_1s]" />

        {/* 추가 그라데이션 애니메이션 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent animate-[float_8s_ease-in-out_infinite_2s]" />
      </div>

      {/* 글로우 효과 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-[glow_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-[glow_8s_ease-in-out_infinite_2s]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
        <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-[fade-in_0.6s_ease-out_forwards] opacity-0">
          AI 기반 코딩 학습 플랫폼
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-[fade-in_0.6s_ease-out_0.2s_forwards] opacity-0">
          스마트한 코딩 학습의 시작
        </h1>

        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto animate-[fade-in_0.6s_ease-out_0.4s_forwards] opacity-0">
          AI가 제공하는 맞춤형 피드백으로 더 효율적인 코딩 학습을 경험하세요
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fade-in_0.6s_ease-out_0.6s_forwards] opacity-0">
          <Link
            to="/problems"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors duration-300 group"
          >
            문제 풀러가기
            <svg
              className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-300 group"
          >
            시작하기
            <svg
              className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-[bounce_2s_ease-in-out_infinite]">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
