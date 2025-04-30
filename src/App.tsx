import './App.css';
import ProblemList from './pages/ProblemList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RankingPage from './pages/RankingPage';
import PremiumInfoPage from './pages/PremiumInfoPage'; // premium/info 경로 페이지

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/problems" element={<ProblemList />} />
        <Route path="/" element={<RankingPage />} />
        <Route path="/premium/info" element={<PremiumInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
