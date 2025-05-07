// src/App.tsx
import './App.css';
import ProblemList from './pages/ProblemList';
import { Routes, Route } from 'react-router-dom';
import RankingPage from './pages/RankingPage';
import PremiumInfoPage from './pages/PremiumInfoPage';
import ErrorPage from './pages/ErrorPage'; // ✅ 404용
import HomePage from './pages/ProblemList'; // ✅ 혹은 홈 페이지로 쓸 컴포넌트

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} /> {/* ✅ 루트 경로 추가 */}
      <Route path="/problems" element={<ProblemList />} />
      <Route path="/ranking" element={<RankingPage />} />
      <Route path="/premium" element={<PremiumInfoPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
