import React from 'react';
import { Language, UserProfile } from '../types';
import { TranslationDictionary } from '../data/translations';
import { COMPANY_INFO } from '../data/company';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ShieldCheck, Mail, Phone, BookOpen, PackagePlus, ListOrdered, Building2, User, LogOut } from 'lucide-react';

interface HeaderProps {
  activeTab: 'brochure' | 'order' | 'myorders' | 'company';
  setActiveTab: (tab: 'brochure' | 'order' | 'myorders' | 'company') => void;
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationDictionary;
  ordersCount: number;
  currentUser?: UserProfile | null;
  onOpenProfile?: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  t,
  ordersCount,
  currentUser,
  onOpenProfile,
  onLogout
}) => {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white shadow-xl border-b border-indigo-800/40">
      {/* Top Banner with Company Info & Contact */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Company Identity */}
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-black text-slate-950 text-lg shadow-md">
                E
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                {COMPANY_INFO.name}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-500/20 text-blue-200 border border-blue-400/30">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> {COMPANY_INFO.legalStatus}
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-blue-200 font-medium mt-1 leading-relaxed">
              📍 {COMPANY_INFO.address}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] sm:text-xs text-blue-100 mt-1">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="inline-flex items-center gap-1 hover:text-amber-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>{COMPANY_INFO.email}</span>
              </a>
              <span className="text-blue-400 hidden sm:inline">|</span>
              <div className="inline-flex items-center gap-1 flex-wrap">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>📞 {COMPANY_INFO.phones.map(p => p.display).join(' / ')}</span>
              </div>
            </div>
          </div>

          {/* User Profile & Language Switcher */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-2.5 pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
            {currentUser && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={onOpenProfile}
                  title={currentUser.name}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all text-xs cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 font-black flex items-center justify-center text-[11px] shadow-sm">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-[11px] font-black leading-tight text-white max-w-[130px] truncate">
                      {currentUser.name}
                    </div>
                    <div className="text-[9px] text-blue-200 font-mono">
                      {currentUser.phone}
                    </div>
                  </div>
                </button>

                {onLogout && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(t.auth_logout_confirm)) {
                        onLogout();
                      }
                    }}
                    title={t.auth_logout_btn}
                    className="p-1.5 h-8 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-200 hover:text-white transition-colors text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden xl:inline text-[10px]">{t.auth_logout_btn}</span>
                  </button>
                )}
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="text-xs text-blue-200 font-semibold md:hidden">{t.select_lang_label}</span>
              <LanguageSwitcher currentLang={lang} onSelectLang={setLang} />
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Tab Navigation Bar */}
      <div className="bg-slate-900/60 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <nav className="bg-slate-950/70 p-1 rounded-2xl border border-white/10 shadow-lg flex gap-1 sm:gap-2">
            {/* Tab 1: Brochure */}
            <button
              id="tab-brochure"
              type="button"
              onClick={() => setActiveTab('brochure')}
              className={`flex-1 min-h-[44px] py-2 px-1.5 sm:px-4 rounded-xl font-black text-[11px] sm:text-xs md:text-sm flex items-center justify-center gap-1 sm:gap-2 transition-all duration-200 touch-manipulation cursor-pointer ${
                activeTab === 'brochure'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-[1.02]'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
              <span className="truncate">{t.tab_brochure}</span>
            </button>

            {/* Tab 2: Order */}
            <button
              id="tab-order"
              type="button"
              onClick={() => setActiveTab('order')}
              className={`flex-1 min-h-[44px] py-2 px-1.5 sm:px-4 rounded-xl font-black text-[11px] sm:text-xs md:text-sm flex items-center justify-center gap-1 sm:gap-2 transition-all duration-200 touch-manipulation cursor-pointer ${
                activeTab === 'order'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/30 scale-[1.02]'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
              }`}
            >
              <PackagePlus className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate">{t.tab_order}</span>
            </button>

            {/* Tab 3: My Orders */}
            <button
              id="tab-myorders"
              type="button"
              onClick={() => setActiveTab('myorders')}
              className={`flex-1 min-h-[44px] py-2 px-1.5 sm:px-4 rounded-xl font-black text-[11px] sm:text-xs md:text-sm flex items-center justify-center gap-1 sm:gap-2 transition-all duration-200 relative touch-manipulation cursor-pointer ${
                activeTab === 'myorders'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-[1.02]'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
              <span className="truncate">{t.tab_myorders}</span>
              {ordersCount > 0 && (
                <span className="ml-0.5 sm:ml-1 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black bg-amber-400 text-slate-950">
                  {ordersCount}
                </span>
              )}
            </button>

            {/* Tab 4: Company Panel */}
            <button
              id="tab-company"
              type="button"
              onClick={() => setActiveTab('company')}
              className={`flex-1 min-h-[44px] py-2 px-1.5 sm:px-4 rounded-xl font-black text-[11px] sm:text-xs md:text-sm flex items-center justify-center gap-1 sm:gap-2 transition-all duration-200 touch-manipulation cursor-pointer ${
                activeTab === 'company'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-900 text-white shadow-md border border-white/20 scale-[1.02]'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
              <span className="truncate">{t.tab_company}</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
