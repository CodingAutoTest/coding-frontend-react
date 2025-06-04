import clsx from 'clsx';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function LandingFeatures() {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '-100px',
  });

  const items = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: 'AI 자동 채점',
      desc: 'Judge0 기반으로 정확하게 채점합니다.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: '맞춤형 피드백',
      desc: 'GPT가 코드 가독성과 효율성을 분석해 개선 방향을 제시합니다.',
      color: 'from-primary to-primary/80',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      title: '클래스 관리',
      desc: '교사용 대시보드로 학생 현황을 한눈에 확인합니다.',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent animate-[pulse_4s_ease-in-out_infinite_1s]" />
      </div>

      <div ref={targetRef} className="relative max-w-7xl mx-auto px-6">
        <div
          className={clsx(
            'text-center mb-16 transition-all duration-1000',
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
          )}
        >
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            주요 기능
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI 기술을 활용한 스마트한 코딩 학습
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            학생과 교사를 위한 최적화된 학습 환경을 제공합니다
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {items.map(({ icon, title, desc, color }, index) => (
            <div
              key={title}
              className={clsx(
                'group relative bg-white rounded-2xl p-8 transition-all duration-1000',
                'hover:shadow-xl hover:-translate-y-1',
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div
                className={clsx(
                  'absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300',
                  color,
                )}
              />
              <div className="relative">
                <div
                  className={clsx(
                    'inline-flex items-center justify-center p-3 rounded-xl mb-6',
                    'bg-gradient-to-br text-white transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3',
                    color,
                  )}
                >
                  {icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
