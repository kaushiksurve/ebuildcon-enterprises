import React from 'react';
import { getLocalizedVehicles } from '../data/vehicles';
import { TranslationDictionary } from '../data/translations';
import { Language } from '../types';
import { Truck, ShieldCheck, Box } from 'lucide-react';

interface VehicleFleetProps {
  t: TranslationDictionary;
  lang: Language;
}

export const VehicleFleet: React.FC<VehicleFleetProps> = ({ t, lang }) => {
  const vehicles = getLocalizedVehicles(lang);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-md space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <span>{t.vehicle_title}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.vehicle_subtitle}
          </p>
        </div>
        <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t.vehicle_owned_badge}</span>
        </span>
      </div>

      {/* Grid of 4 Vehicles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {vehicles.map((v, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-5 shadow-lg border border-slate-800 flex flex-col justify-between hover:border-indigo-500/50 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wide">
                  {v.name}
                </span>
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                  <Truck className="w-4 h-4" />
                </div>
              </div>

              <div className="text-2xl font-black text-white mt-2">
                {v.capacityTon}
              </div>

              <div className="mt-3 bg-white/10 backdrop-blur-sm rounded-xl py-2 px-3 flex items-center justify-between border border-white/10">
                <span className="text-[11px] text-slate-300 font-bold flex items-center gap-1">
                  <Box className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.vehicle_capacity_label}</span>
                </span>
                <span className="text-sm font-black text-amber-300">{v.cbmCapacity} CBM</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-4 leading-relaxed font-medium">
              {v.description}
            </p>
          </div>
        ))}
      </div>

      <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl flex items-center justify-between text-xs text-blue-900 font-bold">
        <span>{t.vehicle_fleet_footer}</span>
        <span className="hidden sm:inline text-indigo-700">ISO 9001:2015</span>
      </div>
    </div>
  );
};
