import React from 'react';
import { Language } from '../types';

interface LanguageSwitcherProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLang,
  onSelectLang,
  className = ''
}) => {
  const languages: { code: Language; label: string }[] = [
    { code: 'mr', label: 'मराठी' },
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' }
  ];

  return (
    <div
      role="group"
      aria-label="Language selector"
      className={`inline-flex items-center bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-inner ${className}`}
    >
      {languages.map((l) => {
        const isActive = currentLang === l.code;
        return (
          <button
            key={l.code}
            id={`lang-${l.code}`}
            type="button"
            onClick={() => onSelectLang(l.code)}
            aria-pressed={isActive}
            className={`px-3 py-1 text-xs md:text-sm font-black rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              isActive
                ? 'bg-white text-indigo-950 shadow-md scale-105'
                : 'text-blue-100 hover:text-white hover:bg-white/15'
            }`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
};
