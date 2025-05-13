import React, { useState, useRef } from 'react';
import { LeftBannerProps } from '../types/components.types';
import logo from '../../../assets/logo_icons/problem_logo.svg';

export function LeftBanner({ title, subtitle }: LeftBannerProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingSubtitle, setIsEditingSubtitle] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentSubtitle, setCurrentSubtitle] = useState(subtitle);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const subtitleInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent, onDone: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onDone();
    }
  };

  return (
    <div className="w-1/2 bg-[#4B61D1] text-white flex flex-col justify-start px-16 pt-32">
      <img src={logo} alt="logo" className="w-16 mb-8" />

      {isEditingTitle ? (
        <input
          ref={titleInputRef}
          type="text"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          onBlur={() => setIsEditingTitle(false)}
          onKeyDown={(e) => handleKeyDown(e, () => setIsEditingTitle(false))}
          className="text-4xl font-bold bg-transparent outline-none border-none focus:outline-none focus:ring-0 focus:border-none mb-3 leading-tight"
          autoFocus
        />
      ) : (
        <h1
          className="text-4xl font-bold mb-3 leading-tight cursor-pointer"
          onClick={() => setIsEditingTitle(true)}
        >
          {currentTitle}
        </h1>
      )}

      {isEditingSubtitle ? (
        <input
          ref={subtitleInputRef}
          type="text"
          value={currentSubtitle}
          onChange={(e) => setCurrentSubtitle(e.target.value)}
          onBlur={() => setIsEditingSubtitle(false)}
          onKeyDown={(e) => handleKeyDown(e, () => setIsEditingSubtitle(false))}
          className="text-4xl font-bold bg-transparent outline-none border-none focus:outline-none focus:ring-0 focus:border-none"
          autoFocus
        />
      ) : (
        <p className="text-4xl font-bold cursor-pointer" onClick={() => setIsEditingSubtitle(true)}>
          {currentSubtitle}
        </p>
      )}
    </div>
  );
}
