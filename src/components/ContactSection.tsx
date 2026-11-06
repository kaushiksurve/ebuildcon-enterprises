import React from 'react';
import { COMPANY_INFO } from '../data/company';
import { TranslationDictionary } from '../data/translations';
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';

interface ContactSectionProps {
  t: TranslationDictionary;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ t }) => {
  return (
    <section id="contact-section" className="scroll-mt-24 space-y-6">
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-indigo-800/60 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-black border border-white/20 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{COMPANY_INFO.legalStatus}</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
              {t.contact_title}
            </h2>
            <p className="text-xs sm:text-sm text-blue-200 mt-1">
              {t.contact_subtitle}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email Card (Company Email Only - Checked) */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 flex items-start gap-4 hover:border-amber-400/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-white text-indigo-950 flex items-center justify-center font-black shrink-0 shadow-md">
                <Mail className="w-6 h-6 text-indigo-800" />
              </div>
              <div className="space-y-1">
                <div className="text-xs text-blue-200 font-bold uppercase tracking-wide">
                  {t.hero_official_email}
                </div>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-base sm:text-lg font-black text-white hover:text-amber-300 transition-colors block break-all"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>

            {/* Phone & WhatsApp Card (3 numbers) */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 flex items-start gap-4 hover:border-amber-400/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-md">
                <Phone className="w-6 h-6 text-slate-950" />
              </div>
              <div className="space-y-1 w-full">
                <div className="text-xs text-blue-200 font-bold uppercase tracking-wide">
                  {t.call_or_wa}
                </div>
                <div className="text-sm sm:text-base font-black text-white flex flex-wrap gap-2 pt-1">
                  {COMPANY_INFO.phones.map((phone, i) => (
                    <a
                      key={i}
                      href={`tel:${phone.raw}`}
                      className="hover:text-amber-300 transition-colors inline-block"
                    >
                      {phone.display}
                      {i < COMPANY_INFO.phones.length - 1 ? ' / ' : ''}
                    </a>
                  ))}
                </div>
                <div className="text-[11px] text-blue-200 font-medium flex items-center gap-1 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>9:00 AM - 7:30 PM (सोम - शनि) | जलद प्रतिसाद</span>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Chat Bar */}
          <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <div className="text-xs font-black text-white">{t.contact_direct_wa}</div>
                <div className="text-[11px] text-emerald-200">{t.contact_wa_sub}</div>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {COMPANY_INFO.phones.map((p, idx) => (
                <a
                  key={idx}
                  href={`https://wa.me/${p.wa}?text=${encodeURIComponent('Hello E-Buildcon! I would like to inquire about construction materials.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 shadow transition-all"
                >
                  <span>📱 {p.display}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Factory Address and Directions */}
          <div className="bg-black/30 rounded-2xl p-5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-slate-300 uppercase">
                  {t.factory_addr}
                </div>
                <div className="text-sm font-bold text-white mt-0.5">
                  {COMPANY_INFO.address}
                </div>
              </div>
            </div>

            <a
              href={COMPANY_INFO.mapsLocationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-black flex items-center gap-1.5 border border-white/20 self-start sm:self-auto transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-amber-400" />
              <span>{t.contact_view_maps}</span>
            </a>
          </div>

          {/* Policy Banner Footer */}
          <div className="p-3 bg-black/40 rounded-xl text-[11px] text-blue-200 flex flex-wrap items-center justify-between gap-2 border border-white/10">
            <span>{t.tagline}</span>
            <span className="text-amber-400 font-bold">{t.contact_vasai_city}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
