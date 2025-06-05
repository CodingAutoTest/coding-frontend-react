import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import StudentClassListPage from '../pages/StudentClassListPage';

export default function ClassGate() {
  const role = useAuthStore((s) => s.user?.role);
  if (role === 'teacher') return <Outlet />; // teaches pages
  if (role === 'student') return <StudentClassListPage />;
  return <Navigate to="/" replace />; // user / 비로그인
}
