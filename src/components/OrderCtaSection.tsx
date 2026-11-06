import React from 'react';
import { TranslationDictionary } from '../data/translations';
import { PackagePlus, Phone, ShieldCheck, ArrowRight } from 'lucide-react';

interface OrderCtaSectionProps {
  t: TranslationDictionary;
  onNavigateToOrder: () => void;
}

export const OrderCtaSection: React.FC<OrderCtaSectionProps> = ({
  t,
  onNavigateToOrder
}) => {
  return (
    <section className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-3xl p-6 sm:p-10 shadow-2xl text-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-2 max-w-xl">
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-950/10 text-slate-950 text-xs font-black">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{t.cta_direct_badge}</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
          {t.cta_headline}
        </h2>
        <p className="text-xs sm:text-sm font-bold text-slate-900/80 leading-relaxed">
          {t.cta_description}
        </p>
      </div>

      <div className="shrink-0 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onNavigateToOrder}
          className="h-12 min-h-[48px] px-8 rounded-full bg-slate-950 hover:bg-slate-900 active:scale-95 text-white font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <PackagePlus className="w-5 h-5 text-amber-400" />
          <span>{t.cta_button}</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
        </button>
      </div>
    </section>
  );
};
