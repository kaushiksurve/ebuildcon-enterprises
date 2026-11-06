import React from 'react';
import { ProductInfo } from '../types';
import { TranslationDictionary } from '../data/translations';
import { X, CheckCircle2, ShieldCheck, Package, ShoppingCart } from 'lucide-react';

interface ProductDetailsModalProps {
  product: ProductInfo | null;
  t: TranslationDictionary;
  onClose: () => void;
  onAddToOrder: (productId: string) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  t,
  onClose,
  onAddToOrder
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label={t.modal_close}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image & Badges */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-900 mb-5 max-h-60 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover object-top"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/brochure/page1_img0.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
          <span className="absolute top-3 left-3 bg-indigo-950/85 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full shadow border border-white/20">
            {product.category}
          </span>
          {product.badge && (
            <span className="absolute top-3 right-3 bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full shadow border border-amber-300">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-black text-slate-900">{product.name}</h2>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 py-2">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">{t.modal_packing_size}</span>
              <span className="text-sm font-black text-indigo-900 flex items-center gap-1.5 mt-0.5">
                <Package className="w-4 h-4 text-amber-500" />
                {product.packageSize}
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">{t.modal_coverage}</span>
              <span className="text-sm font-black text-emerald-700 flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                {product.coverage}
              </span>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-2">
              {t.modal_key_features}
            </h3>
            <ul className="space-y-2">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-bold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Notice */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-800">
            ℹ️ {product.infoNote}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                onAddToOrder(product.id);
                onClose();
              }}
              className="flex-1 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:brightness-105 active:scale-95 transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{t.modal_add_to_order}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
            >
              {t.modal_close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
