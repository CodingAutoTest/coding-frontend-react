import './App.css';
import ProblemList from './pages/ProblemList';
import { Routes, Route } from 'react-router-dom'; // BrowserRouter 제거
import RankingPage from './pages/RankingPage';
import PremiumInfoPage from './pages/PremiumInfoPage';

function App() {
  return (
    <Routes>
      <Route path="/problems" element={<ProblemList />} />
      <Route path="/" element={<RankingPage />} />
      <Route path="/premium/info" element={<PremiumInfoPage />} />
    </Routes>
  );
}

export default App;
