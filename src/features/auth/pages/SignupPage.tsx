// src/pages/SignupPage.tsx
import { LeftBanner } from '../components/LeftBanner';
import { SignupForm } from '../components/SignupFrom';

export default function SignupPage() {
  return (
    <div className="flex h-screen w-screen bg-[#4B61D1]">
      <LeftBanner title="def signUP :" subtitle='email="zldrjs04@gmai.com"' />
      <SignupForm />
    </div>
  );
}
