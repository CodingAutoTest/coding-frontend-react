// src/App.tsx
import './App.css';
import ProblemList from './pages/ProblemList';
import { Routes, Route } from 'react-router-dom';
import RankingPage from './pages/RankingPage';
import PremiumInfoPage from './pages/PremiumInfoPage';
import ErrorPage from './pages/ErrorPage'; // ✅ 404용
import HomePage from './pages/ProblemList'; // ✅ 혹은 홈 페이지로 쓸 컴포넌트
import ProblemDetailPage from './pages/ProblemDetailPage';
import ProfilePage from './pages/Profile';
import LoginPage from './features/auth/pages/LoginPage';
import SignupPage from './features/auth/pages/SignupPage';
import ProfileSetting from './pages/ProfileSetting'; // ✅ 프로필 설정 페이지
import ResetPasswordPage from './features/auth/pages/ResetPasswordPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} /> {/* ✅ 루트 경로 추가 */}
      <Route path="/problems" element={<ProblemList />} />
      <Route path="/rankings" element={<RankingPage />} />
      <Route path="/premium" element={<PremiumInfoPage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/:userName" element={<ProfilePage />} />
      <Route path="/problems/:id" element={<ProblemDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile-setting" element={<ProfileSetting />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
}

export default App;
