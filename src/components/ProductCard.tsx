import React from 'react';
import { ProductInfo } from '../types';
import { TranslationDictionary } from '../data/translations';
import { CheckCircle2, PackagePlus, Eye, Info } from 'lucide-react';

interface ProductCardProps {
  product: ProductInfo;
  t: TranslationDictionary;
  onViewDetails: (product: ProductInfo) => void;
  onAddToOrder: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  t,
  onViewDetails,
  onAddToOrder
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1">
      {/* Top Image & Badge */}
      <div className="relative h-52 bg-slate-900 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/brochure/page1_img0.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        {/* Top Badges - flex container preventing collision and duplication */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className="bg-slate-950/85 backdrop-blur-md text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow border border-white/20 truncate">
            {product.packageSize}
          </span>
          {product.badge && product.badge !== product.packageSize && (
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow border border-amber-300 shrink-0">
              {product.badge}
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <h2 className="text-base sm:text-lg font-black text-white leading-tight drop-shadow-lg">
            {product.name}
          </h2>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Coverage Highlight */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-2.5 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">{t.coverage_label}</span>
            <span className="text-xs font-black text-blue-900">{product.coverage}</span>
          </div>

          {/* Features Checklist */}
          <ul className="space-y-1.5">
            {product.features.slice(0, 3).map((feat, i) => (
              <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>

          {/* Info Only Tag */}
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 bg-amber-50/80 px-2.5 py-1 rounded-lg border border-amber-200/60">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>{product.infoNote}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-700" />
            <span>{t.view_details}</span>
          </button>

          <button
            type="button"
            onClick={() => onAddToOrder(product.id)}
            className="h-10 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow hover:shadow-md transition-all active:scale-95"
          >
            <PackagePlus className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.add_to_order_action}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
