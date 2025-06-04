import LoginForm from '../components/LoginForm';
import { LeftBanner } from '../components/LeftBanner';

export default function LoginPage() {
  return (
    <div className="flex h-screen w-screen bg-[#4B61D1]">
      <LeftBanner title="Coding Auto Test" subtitle="CAT >> cat >> 야옹 << meow" />
      <LoginForm />
    </div>
  );
}
