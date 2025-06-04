import { Link } from 'react-router-dom';

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 브랜드 섹션 */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                코오테(CAT)
              </span>
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              학생과 교사를 위한 AI 기반 코딩 학습 플랫폼
            </p>
          </div>

          {/* 링크 섹션 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">바로가기</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/problems" className="text-gray-600 hover:text-primary transition-colors">
                  문제
                </Link>
              </li>
              <li>
                <Link to="/classes" className="text-gray-600 hover:text-primary transition-colors">
                  클래스
                </Link>
              </li>
              <li>
                <Link to="/ranking" className="text-gray-600 hover:text-primary transition-colors">
                  랭킹
                </Link>
              </li>
            </ul>
          </div>

          {/* 법적 링크 섹션 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">법적 고지</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-primary transition-colors">
                  이용약관
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary transition-colors">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">
                  문의하기
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 저작권 */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-gray-500 text-sm">
            © {currentYear} 코오테(CAT). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
