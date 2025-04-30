// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import RankingPage from './pages/RankingPage';
import PremiumInfoPage from './pages/PremiumInfoPage'; // premium/info 경로 페이지

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<RankingPage />} />
        <Route path="/premium/info" element={<PremiumInfoPage />} />
      </Routes>
    </div>
  );
}

export default App;
