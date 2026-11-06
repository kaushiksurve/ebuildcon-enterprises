import { useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { loadLanguage, saveLanguage } from '../utils/storage';

export function useLanguage() {
  const [lang, setLangState] = useState<Language>(() => loadLanguage());

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    saveLanguage(newLang);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.mr;

  return {
    lang,
    setLang,
    t
  };
}
