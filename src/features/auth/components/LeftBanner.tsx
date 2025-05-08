import { LeftBannerProps } from '../types/components.types';
import logo from '../../../assets/logo_icons/problem_logo.svg';

export function LeftBanner({ title, subtitle }: LeftBannerProps) {
  return (
    <div className="w-1/2 bg-[#4B61D1] text-white flex flex-col justify-start px-16 pt-32">
      <img src={logo} alt="logo" className="w-16 mb-8" />
      <h1 className="text-4xl font-bold mb-3 leading-tight">{title}</h1>
      <p className="text-4xl font-bold">{subtitle}</p>
    </div>
  );
}
