import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './features/auth/pages/LoginPage';
import SignupPage from './features/auth/pages/SignupPage';
//import ResetPasswordPage from './pages/ResetPasswordPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}
