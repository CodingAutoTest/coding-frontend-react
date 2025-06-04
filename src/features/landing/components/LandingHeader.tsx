import { Link } from 'react-router-dom';
import clsx from 'clsx';

export default function LandingHeader() {
  const nav = [
    { to: '/', label: '홈' },
    { to: '/problems', label: '문제' },
    { to: '/classes', label: '클래스' },
    { to: '/ranking', label: '랭킹' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Coate(CAT)
          </span>
        </Link>

        <nav className="flex items-center space-x-8">
          {nav.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            to="/login"
            className={clsx(
              'px-6 py-2.5 rounded-full text-white font-semibold transition-all',
              'bg-gradient-to-r from-primary to-blue-600 hover:shadow-lg hover:shadow-primary/20',
            )}
          >
            로그인
          </Link>
        </nav>
      </div>
    </header>
  );
}
