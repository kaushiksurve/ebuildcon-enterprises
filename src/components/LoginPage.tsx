import React, { useState } from 'react';
import { Language } from '../types';
import { TranslationDictionary } from '../data/translations';
import { COMPANY_INFO } from '../data/company';
import { LanguageSwitcher } from './LanguageSwitcher';
import {
  ShieldCheck,
  Building,
  Phone,
  Lock,
  User,
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
  Truck,
  MessageCircle,
  MapPin,
  AlertCircle
} from 'lucide-react';

interface LoginPageProps {
  t: TranslationDictionary;
  lang: Language;
  setLang: (lang: Language) => void;
  onLogin: (phone: string, pin: string, remember: boolean) => { success: boolean; error?: string };
  onSignup: (data: {
    name: string;
    phone: string;
    pin: string;
    supervisorName?: string;
    supervisorPhone?: string;
    siteAddress?: string;
    deliveryLocation?: string;
    rememberMe?: boolean;
  }) => { success: boolean; error?: string };
}

export const LoginPage: React.FC<LoginPageProps> = ({
  t,
  lang,
  setLang,
  onLogin,
  onSignup
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Login form state (Professional: starts empty, no hardcoded demo credentials)
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [showLoginPin, setShowLoginPin] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign up form state
  const [signupName, setSignupName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPin, setSignupPin] = useState('');
  const [signupConfirmPin, setSignupConfirmPin] = useState('');
  const [showSignupPin, setShowSignupPin] = useState(false);
  const [signupSupName, setSignupSupName] = useState('');
  const [signupSupPhone, setSignupSupPhone] = useState('');
  const [signupSiteAddr, setSignupSiteAddr] = useState('');
  const [signupDelLoc, setSignupDelLoc] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // Error state
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Clean phone helper
  const cleanPhoneInput = (val: string) => val.replace(/\D/g, '').slice(-10);

  // Submit Sign In
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const clean = cleanPhoneInput(loginPhone);
    if (!clean || clean.length < 10) {
      setErrorMsg(t.auth_err_phone_req);
      return;
    }
    if (!loginPin.trim()) {
      setErrorMsg(t.auth_err_pin_req);
      return;
    }

    const res = onLogin(clean, loginPin.trim(), rememberMe);
    if (!res.success) {
      if (res.error === 'user_not_found') {
        setErrorMsg(t.auth_err_user_not_found);
      } else if (res.error === 'incorrect_pin') {
        setErrorMsg(t.auth_err_incorrect_pin);
      } else if (res.error === 'invalid_phone') {
        setErrorMsg(t.auth_err_phone_req);
      } else {
        setErrorMsg(t.auth_err_invalid);
      }
    }
  };

  // Submit Sign Up (New Builder Registration)
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!signupName.trim()) {
      setErrorMsg(t.auth_err_name_req);
      return;
    }
    const clean = cleanPhoneInput(signupPhone);
    if (!clean || clean.length < 10) {
      setErrorMsg(t.auth_err_phone_req);
      return;
    }
    if (!signupPin.trim() || signupPin.length < 4) {
      setErrorMsg(t.auth_err_pin_req);
      return;
    }
    if (signupPin.trim() !== signupConfirmPin.trim()) {
      setErrorMsg(t.auth_err_pin_mismatch);
      return;
    }
    if (!agreedToTerms) {
      setErrorMsg(t.auth_terms_required);
      return;
    }

    const res = onSignup({
      name: signupName.trim(),
      phone: clean,
      pin: signupPin.trim(),
      supervisorName: signupSupName.trim(),
      supervisorPhone: signupSupPhone.trim(),
      siteAddress: signupSiteAddr.trim(),
      deliveryLocation: signupDelLoc.trim(),
      rememberMe: true
    });

    if (!res.success) {
      setErrorMsg(t.auth_err_invalid);
    }
  };

  // WhatsApp support link for Forgot PIN
  const handleForgotPinWhatsApp = () => {
    const text = `Hello E-Buildcon Support, I need help recovering the PIN for my registered builder account (Phone: ${loginPhone || 'My Phone'}).`;
    const url = `https://wa.me/919819927174?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header with Corporate Identity & Language Switcher */}
      <header className="border-b border-indigo-800/40 bg-slate-950/70 backdrop-blur-md px-4 py-3 sticky top-0 z-30 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-amber-500/20">
              E
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-black text-white text-base sm:text-lg tracking-tight">
                  {COMPANY_INFO.name}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-500/20 text-blue-200 border border-blue-400/30">
                  <ShieldCheck className="w-3 h-3 text-amber-400" /> {COMPANY_INFO.legalStatus}
                </span>
              </div>
              <p className="text-[11px] text-blue-200/80">
                📍 {COMPANY_INFO.address}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs text-blue-200 font-semibold hidden md:inline">
              {t.select_lang_label}
            </span>
            <LanguageSwitcher currentLang={lang} onSelectLang={setLang} />
          </div>
        </div>
      </header>

      {/* Main Authentication Card */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-6 md:p-8">
        <div className="w-full max-w-md sm:max-w-lg space-y-5 sm:space-y-6">
          <div className="bg-white/95 backdrop-blur-xl text-slate-800 rounded-3xl p-5 sm:p-8 shadow-2xl border border-indigo-200/60 space-y-5 sm:space-y-6">
            {/* Mode Switcher Tabs */}
            <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1.5 border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setErrorMsg(null);
                }}
                className={`flex-1 py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  authMode === 'login'
                    ? 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <User className="w-4 h-4" />
                <span>{t.auth_tab_login}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthMode('signup');
                  setErrorMsg(null);
                }}
                className={`flex-1 py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  authMode === 'signup'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>{t.auth_tab_signup}</span>
              </button>
            </div>

            {/* Title & Subtitle */}
            <div className="text-center space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {authMode === 'login' ? t.auth_login_title : t.auth_signup_title}
              </h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                {authMode === 'login' ? t.auth_login_subtitle : t.auth_signup_subtitle}
              </p>
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-800 text-xs font-bold p-3.5 rounded-xl flex items-start gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{errorMsg}</span>
              </div>
            )}

            {/* =============================================================== */}
            {/* FORM 1: PROFESSIONAL SIGN IN */}
            {/* =============================================================== */}
            {authMode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Mobile Number */}
                <div>
                  <label className="text-xs font-black text-slate-800 block mb-1">
                    {t.auth_phone_label}
                  </label>
                  <div className="relative flex rounded-xl border-2 border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-indigo-600 transition-colors overflow-hidden">
                    <span className="inline-flex items-center px-3.5 text-xs font-black text-slate-500 bg-slate-100 border-r border-slate-200 select-none">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={loginPhone}
                      onChange={(e) => {
                        setLoginPhone(cleanPhoneInput(e.target.value));
                        setErrorMsg(null);
                      }}
                      placeholder="98XXXXXXXX"
                      className="w-full h-12 px-3 text-sm font-black text-slate-900 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                {/* PIN / Password with Eye Show/Hide */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-black text-slate-800">
                      {t.auth_pin_label}
                    </label>
                    <button
                      type="button"
                      onClick={handleForgotPinWhatsApp}
                      className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                    >
                      {t.auth_forgot_pin_help}
                    </button>
                  </div>
                  <div className="relative rounded-xl border-2 border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-indigo-600 transition-colors overflow-hidden">
                    <input
                      type={showLoginPin ? 'text' : 'password'}
                      required
                      maxLength={6}
                      value={loginPin}
                      onChange={(e) => {
                        setLoginPin(e.target.value);
                        setErrorMsg(null);
                      }}
                      placeholder={t.auth_pin_placeholder}
                      className="w-full h-12 pl-3 pr-10 text-sm font-black tracking-wider text-slate-900 bg-transparent focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPin(!showLoginPin)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                      title={showLoginPin ? 'Hide PIN' : 'Show PIN'}
                    >
                      {showLoginPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-600 select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                    />
                    <span>{t.auth_remember_me}</span>
                  </label>
                </div>

                {/* Submit Sign In */}
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 hover:from-blue-800 hover:to-indigo-800 active:scale-[0.99] text-white font-black text-sm shadow-lg shadow-indigo-700/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>{t.auth_login_btn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Switch to Signup */}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('signup');
                      setErrorMsg(null);
                    }}
                    className="text-xs font-bold text-indigo-700 hover:underline cursor-pointer"
                  >
                    {t.auth_no_account}
                  </button>
                </div>
              </form>
            )}

            {/* =============================================================== */}
            {/* FORM 2: PROFESSIONAL BUILDER REGISTRATION */}
            {/* =============================================================== */}
            {authMode === 'signup' && (
              <form onSubmit={handleSignupSubmit} className="space-y-3.5 max-h-[62vh] overflow-y-auto pr-1">
                {/* Builder / Business Name */}
                <div>
                  <label className="text-xs font-black text-slate-800 block mb-1">
                    {t.auth_name_label}
                  </label>
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder={t.auth_name_placeholder}
                    className="w-full h-11 px-3 rounded-xl border-2 border-slate-200 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="text-xs font-black text-slate-800 block mb-1">
                    {t.auth_phone_label}
                  </label>
                  <div className="relative flex rounded-xl border-2 border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-amber-500 transition-colors overflow-hidden">
                    <span className="inline-flex items-center px-3 text-xs font-black text-slate-500 bg-slate-100 border-r border-slate-200 select-none">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(cleanPhoneInput(e.target.value))}
                      placeholder="98XXXXXXXX"
                      className="w-full h-11 px-3 text-xs sm:text-sm font-bold text-slate-900 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                {/* 4-Digit PIN & Confirm PIN */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-black text-slate-800 block mb-1">
                      {t.auth_pin_label}
                    </label>
                    <div className="relative rounded-xl border-2 border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-amber-500 transition-colors overflow-hidden">
                      <input
                        type={showSignupPin ? 'text' : 'password'}
                        required
                        maxLength={6}
                        value={signupPin}
                        onChange={(e) => setSignupPin(e.target.value)}
                        placeholder="4-digit PIN"
                        className="w-full h-11 pl-3 pr-8 text-xs sm:text-sm font-black text-slate-900 bg-transparent focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignupPin(!showSignupPin)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                      >
                        {showSignupPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black text-slate-800 block mb-1">
                      {t.auth_confirm_pin_label}
                    </label>
                    <input
                      type={showSignupPin ? 'text' : 'password'}
                      required
                      maxLength={6}
                      value={signupConfirmPin}
                      onChange={(e) => setSignupConfirmPin(e.target.value)}
                      placeholder={t.auth_confirm_pin_placeholder}
                      className="w-full h-11 px-3 rounded-xl border-2 border-slate-200 text-xs sm:text-sm font-black text-slate-900 bg-slate-50 focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Supervisor details (Saved for future auto-fill) */}
                <div className="pt-2 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black text-indigo-900 uppercase tracking-wider">
                      {t.order_sec_customer} ({lang === 'en' ? 'Optional Pre-fill' : 'ऐच्छिक'})
                    </span>
                    <span className="text-[10px] text-slate-400">Auto-fills future orders</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        {t.sup_name_label}
                      </label>
                      <input
                        type="text"
                        value={signupSupName}
                        onChange={(e) => setSignupSupName(e.target.value)}
                        placeholder={t.sup_name_placeholder}
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-indigo-600"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        {t.sup_phone_label}
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        value={signupSupPhone}
                        onChange={(e) => setSignupSupPhone(cleanPhoneInput(e.target.value))}
                        placeholder="98XXXXXXXX"
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Site Address */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    {t.site_label}
                  </label>
                  <input
                    type="text"
                    value={signupSiteAddr}
                    onChange={(e) => setSignupSiteAddr(e.target.value)}
                    placeholder={t.site_placeholder}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-indigo-600"
                  />
                </div>

                {/* Delivery Location */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    {t.del_loc_label}
                  </label>
                  <input
                    type="text"
                    value={signupDelLoc}
                    onChange={(e) => setSignupDelLoc(e.target.value)}
                    placeholder={t.del_loc_placeholder}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-indigo-600"
                  />
                </div>

                {/* Terms agreement checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2 cursor-pointer text-[11px] font-medium text-slate-600 leading-tight select-none">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300 mt-0.5"
                    />
                    <span>{t.auth_terms_agreement}</span>
                  </label>
                </div>

                {/* Submit Sign Up */}
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 active:scale-[0.99] text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
                >
                  <span>{t.auth_signup_btn}</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>

                {/* Switch to Login */}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setErrorMsg(null);
                    }}
                    className="text-xs font-bold text-indigo-700 hover:underline cursor-pointer"
                  >
                    {t.auth_has_account}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Business Trust Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-2xl flex items-center justify-center gap-2 text-slate-300 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{lang === 'en' ? 'Persistent Order History' : lang === 'hi' ? 'सभी ऑर्डर्स हमेशा सुरक्षित' : 'मागील सर्व ऑर्डर्स जतन'}</span>
            </div>
            <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-2xl flex items-center justify-center gap-2 text-slate-300 text-xs font-medium">
              <Truck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{lang === 'en' ? '100% Owned Fleet' : lang === 'hi' ? '100% अपनी गाड़ियां' : '१००% स्वतःचा वाहन ताफा'}</span>
            </div>
            <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-2xl flex items-center justify-center gap-2 text-slate-300 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{lang === 'en' ? 'ISO 9001:2015 Certified' : lang === 'hi' ? 'ISO 9001:2015 प्रमाणित' : 'ISO 9001:2015 प्रमाणित'}</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer info on Login Page */}
      <footer className="border-t border-slate-800/60 bg-slate-950/50 p-4 text-center text-xs text-slate-400">
        <p>
          🏢 <b>{COMPANY_INFO.name}</b> • 📞 {COMPANY_INFO.phones[0].display} / {COMPANY_INFO.phones[1].display} • ✉️ {COMPANY_INFO.email}
        </p>
      </footer>
    </div>
  );
};
