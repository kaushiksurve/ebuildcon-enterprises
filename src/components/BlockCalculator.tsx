import React, { useState } from 'react';
import { AAC_BLOCK_SIZES } from '../data/products';
import { TranslationDictionary } from '../data/translations';
import { getRecommendedVehicle } from '../data/vehicles';
import { Calculator, ArrowRight, Truck, Info } from 'lucide-react';
import { Language } from '../types';

interface BlockCalculatorProps {
  t: TranslationDictionary;
  lang: Language;
  onApplyToOrder: (inch: string, qty: number) => void;
}

export const BlockCalculator: React.FC<BlockCalculatorProps> = ({
  t,
  lang,
  onApplyToOrder
}) => {
  const [selectedInch, setSelectedInch] = useState<string>('3"');
  const [quantity, setQuantity] = useState<number | ''>(800);

  const selectedSizeInfo = AAC_BLOCK_SIZES.find(s => s.inch === selectedInch) || AAC_BLOCK_SIZES[1];
  const perCbm = selectedSizeInfo.perCbm;
  const numQty = typeof quantity === 'number' ? quantity : 0;
  const estimatedCbm = numQty > 0 ? (numQty / perCbm).toFixed(2) : '0.00';
  const cbmNumber = parseFloat(estimatedCbm);
  const recommendedVehicle = getRecommendedVehicle(cbmNumber, lang);

  return (
    <div className="space-y-6">
      {/* Interactive CBM Calculator Card */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-indigo-800/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black border border-amber-500/30">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">
                {t.calc_title}
              </h2>
              <p className="text-xs text-blue-200">
                {t.calc_subtitle}
              </p>
            </div>
          </div>
          <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            {t.calc_accurate_badge}
          </span>
        </div>

        {/* Inputs Grid */}
        <div className="grid md:grid-cols-12 gap-5 pt-5">
          {/* Block Size Selection */}
          <div className="md:col-span-5 space-y-2">
            <label className="text-xs font-bold text-blue-200 block">
              {t.calc_label_size}:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {AAC_BLOCK_SIZES.map(s => {
                const isSelected = selectedInch === s.inch;
                return (
                  <button
                    key={s.inch}
                    type="button"
                    onClick={() => setSelectedInch(s.inch)}
                    className={`h-11 rounded-xl font-black text-xs transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 scale-105'
                        : 'bg-white/10 hover:bg-white/20 text-slate-200'
                    }`}
                  >
                    {s.inch}
                    <span className="block text-[9px] font-normal opacity-80">{s.perCbm}/CBM</span>
                  </button>
                );
              })}
            </div>
            <div className="text-[11px] text-blue-300 pt-1 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{t.calc_selected_size} {selectedSizeInfo.mm} mm ({selectedSizeInfo.perCbm} {t.calc_pcs_unit} / CBM)</span>
            </div>
          </div>

          {/* Quantity Input */}
          <div className="md:col-span-3 space-y-2">
            <label className="text-xs font-bold text-blue-200 block">
              {t.calc_label_qty}:
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                placeholder="800"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value === '' ? '' : parseInt(e.target.value))}
                className="w-full h-11 px-3 bg-white/10 border border-white/20 rounded-xl text-white font-black text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <span className="absolute right-3 top-3 text-xs font-bold text-slate-400">{t.calc_pcs_unit}</span>
            </div>

            {/* Quick Presets */}
            <div className="flex gap-1.5 pt-1">
              {[400, 800, 1200, 1600].map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setQuantity(p)}
                  className="px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/15 text-[10px] font-bold text-slate-300"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Result & Vehicle Recommendation Box */}
          <div className="md:col-span-4 bg-white/10 rounded-2xl p-4 border border-white/15 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-300 uppercase block">
                {t.calc_res_cbm}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-0.5">
                {estimatedCbm} <span className="text-sm font-bold text-white">CBM</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-1">
                {selectedInch} • {numQty} {t.calc_pcs_unit} ({selectedSizeInfo.perCbm} {t.pcs_per_cbm})
              </div>
            </div>

            {recommendedVehicle && (
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>{t.calc_rec_vehicle_label}</span>
                </span>
                <span className="font-black text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                  {recommendedVehicle.name} ({recommendedVehicle.capacityTon})
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={() => onApplyToOrder(selectedInch, numQty || 800)}
              className="mt-4 w-full h-10 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20 active:scale-95 transition-all"
            >
              <span>{t.calc_add_to_cart}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* AAC BLOCK SIZE CHART 2 TO 9 (7" EXCLUDED) */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              {t.size_title}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.size_subtitle}
            </p>
          </div>
          <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-black bg-blue-50 text-indigo-900 border border-blue-200">
            {lang === 'en' ? '✓ 2" to 9" - All Sizes' : lang === 'hi' ? '✓ 2" से 9" - सभी Sizes' : '✓ 2" ते 9" - सर्व Sizes'}
          </span>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-xs sm:text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-black">
                <th className="p-3.5 sm:px-4">Size ({t.calc_inch_unit})</th>
                <th className="p-3.5 sm:px-4">Size (mm)</th>
                <th className="p-3.5 sm:px-4 text-amber-300">{t.pcs_per_cbm}</th>
                <th className="p-3.5 sm:px-4 text-slate-400">{t.weight_col_note}</th>
                <th className="p-3.5 sm:px-4 text-right">{t.calc_action_col}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-bold text-slate-800">
              {AAC_BLOCK_SIZES.map((row) => (
                <tr
                  key={row.inch}
                  className="hover:bg-blue-50/50 transition-colors group cursor-pointer"
                  onClick={() => {
                    setSelectedInch(row.inch);
                  }}
                >
                  <td className="p-3 sm:px-4 font-black text-indigo-950 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 group-hover:scale-125 transition-transform" />
                    <span>{row.inch} {t.calc_inch_unit}</span>
                  </td>
                  <td className="p-3 sm:px-4 text-slate-600 font-medium font-mono">
                    {row.mm}
                  </td>
                  <td className="p-3 sm:px-4 text-blue-700 font-black">
                    {row.perCbm} {t.calc_pcs_unit}
                  </td>
                  <td className="p-3 sm:px-4 text-slate-400 font-medium text-xs">
                    {t.weight_col_note}
                  </td>
                  <td className="p-3 sm:px-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInch(row.inch);
                        onApplyToOrder(row.inch, 800);
                      }}
                      className="px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-900 text-[11px] font-black transition-colors"
                    >
                      {t.calc_action_select}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
