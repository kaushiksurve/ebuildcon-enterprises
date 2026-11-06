import React from 'react';
import { TranslationDictionary } from '../data/translations';
import { COMPANY_INFO } from '../data/company';
import { ShieldCheck, Truck, Factory, Layers, PackageCheck, BadgePercent } from 'lucide-react';

interface WhyChooseUsProps {
  t: TranslationDictionary;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ t }) => {
  const iconList = [ShieldCheck, Truck, Factory, Layers, PackageCheck, BadgePercent];

  return (
    <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-black uppercase text-amber-400 tracking-wider block mb-1">
            {t.why_choose_tag}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {t.why_choose_title}
          </h2>
        </div>
        <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-black bg-blue-500/20 text-blue-200 border border-blue-400/30">
          {COMPANY_INFO.legalStatus}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        {t.why_points.map((p, idx) => {
          const Icon = iconList[idx % iconList.length];
          return (
            <div
              key={idx}
              className="bg-white/5 hover:bg-white/10 rounded-2xl p-5 border border-white/10 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-black group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-300 bg-white/10 px-2 py-0.5 rounded-full">
                  {p.badge}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-black text-white">{p.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
