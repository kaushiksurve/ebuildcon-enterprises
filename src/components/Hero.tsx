import React from 'react';
import { TranslationDictionary } from '../data/translations';
import { COMPANY_INFO } from '../data/company';
import { PackagePlus, BookOpen, MessageCircle, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  t: TranslationDictionary;
  onNavigateTab: (tab: 'brochure' | 'order' | 'myorders' | 'company') => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  t,
  onNavigateTab,
  onScrollToSection
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white py-12 md:py-20 border-b border-indigo-900/50">
      {/* Subtle industrial grid and lighting glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Headline & Copy */}
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold text-amber-300">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{t.hero_badge_kaman}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
              {t.hero_title}
            </h1>

            <p className="text-base sm:text-lg text-blue-100 max-w-2xl leading-relaxed">
              {t.hero_subtitle}
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-200 bg-white/5 p-2.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.hero_feat_sizes}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-200 bg-white/5 p-2.5 rounded-xl border border-white/10">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t.hero_feat_fleet}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-200 bg-white/5 p-2.5 rounded-xl border border-white/10 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.hero_feat_plaster}</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => onNavigateTab('order')}
                className="h-12 min-h-[48px] px-6 sm:px-8 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-orange-500/25 flex items-center gap-2.5 transform transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <PackagePlus className="w-5 h-5" />
                <span>{t.hero_cta_order}</span>
              </button>

              <button
                type="button"
                onClick={() => onScrollToSection('products-section')}
                className="h-12 min-h-[48px] px-6 sm:px-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-black text-sm sm:text-base border border-white/20 flex items-center gap-2.5 transition-all cursor-pointer"
              >
                <span>{t.hero_cta_products}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('brochure')}
                className="h-12 min-h-[48px] px-5 rounded-full bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 hover:text-white font-bold text-sm border border-blue-400/30 flex items-center gap-2 transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>{t.hero_cta_brochure}</span>
              </button>
            </div>
          </div>

          {/* Quick Contact & WhatsApp Action Card */}
          <div className="lg:col-span-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-wider uppercase text-amber-300">
                  {t.hero_direct_inquiry}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <div>
                <h2 className="text-lg font-black text-white">{COMPANY_INFO.name}</h2>
                <p className="text-xs text-blue-200 mt-1">
                  {t.hero_card_desc}
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-black/30 rounded-xl border border-white/10 flex items-center justify-between">
                  <span className="text-slate-300">{t.hero_official_email}</span>
                  <span className="font-bold text-white truncate max-w-[170px]">{COMPANY_INFO.email}</span>
                </div>
                <div className="p-3 bg-black/30 rounded-xl border border-white/10 flex items-center justify-between">
                  <span className="text-slate-300">{t.hero_direct_phone}</span>
                  <span className="font-bold text-amber-300">9819927174</span>
                </div>
              </div>

              {/* Direct Safe WhatsApp Quote Button */}
              <a
                href={`https://wa.me/${COMPANY_INFO.phones[0].wa}?text=${encodeURIComponent('Hello E-Buildcon Enterprises! I would like to inquire about AAC Blocks / ReadyMix Plaster.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 transition-transform active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t.quick_wa_quote} (WhatsApp)</span>
              </a>

              <p className="text-[10px] text-center text-blue-200 font-medium">
                {t.badge_no_price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
