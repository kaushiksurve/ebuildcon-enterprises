import React from 'react';
import { COMPANY_INFO } from '../data/company';
import { TranslationDictionary } from '../data/translations';
import { ShieldCheck, Mail, Phone } from 'lucide-react';

interface FooterProps {
  t: TranslationDictionary;
  onNavigateTab: (tab: 'brochure' | 'order' | 'myorders' | 'company') => void;
}

export const Footer: React.FC<FooterProps> = ({ t, onNavigateTab }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand & Address */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-lg">
                E
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                {COMPANY_INFO.name}
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {t.footer_desc}
            </p>

            <div className="flex items-center gap-2 text-[11px] text-amber-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{COMPANY_INFO.legalStatus}</span>
            </div>

            <div className="text-slate-400 text-[11px] leading-relaxed pt-1">
              📍 {COMPANY_INFO.address}
            </div>
          </div>

          {/* Quick Navigation Tabs */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-black uppercase text-white tracking-wider">
              {t.footer_quick_links_heading}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateTab('brochure')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.footer_brochure_link}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateTab('order')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.footer_order_link}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateTab('myorders')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.footer_myorders_link}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateTab('company')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.footer_company_link}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Policy Summary */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-black uppercase text-white tracking-wider">
              {t.footer_contacts_heading}
            </h3>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white truncate">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{COMPANY_INFO.phones.map(p => p.display).join(' / ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-850 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. {t.footer_all_rights}
          </div>
          <div className="flex items-center gap-4">
            <span>{t.footer_vasai_address}</span>
            <span>•</span>
            <span className="text-amber-400 font-bold">{COMPANY_INFO.legalStatus}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
