import React from 'react';
import { Order, Language } from '../types';
import { TranslationDictionary } from '../data/translations';
import { COMPANY_INFO } from '../data/company';
import {
  Printer,
  Share2,
  X,
  Building2,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Truck,
  Calendar,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface DeliveryChallanModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  t: TranslationDictionary;
  lang?: Language;
}

export const DeliveryChallanModal: React.FC<DeliveryChallanModalProps> = ({
  order,
  isOpen,
  onClose,
  t,
  lang = 'mr'
}) => {
  if (!isOpen || !order) return null;

  const challanNo = `EBC/CH-2026/${String(order.id).padStart(4, '0')}`;
  const bookingDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB') : order.date;

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const summary = `*📄 E-BUILDCON ENTERPRISES - DELIVERY CHALLAN*\nChallan No: ${challanNo}\nOrder Ref: #EB-${order.id}\nCustomer: ${order.name}\nSite: ${order.site}\nDelivery Place: ${order.del || '---'}\nDelivery Date: ${order.date}\nMaterial: ${order.tot}\nStatus: ${order.status}${order.driverName ? `\nDriver: ${order.driverName} (${order.driverPhone || ''}) - ${order.vehicleType || ''}` : ''}\n\nFactory: Kaman, Vasai (East) - 401202\nEmail: ${COMPANY_INFO.email}\nISO 9001:2015 Certified`;
    const num = order.phone.replace(/\D/g, '').slice(-10);
    const target = num.length === 10 ? `91${num}` : num;
    const url = `https://wa.me/${target}?text=${encodeURIComponent(summary)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn overflow-y-auto print:p-0 print:bg-white print:static">
      {/* Container - Printable Sheet */}
      <div className="bg-white text-slate-900 rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-4 sm:my-8 print:shadow-none print:border-none print:m-0 print:max-w-none print:w-full">
        {/* Screen Action Bar (Hidden during Print) */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            <span className="font-black text-sm">{t.challan_modal_title}</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-amber-300">
              {challanNo}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.challan_btn_print}</span>
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer hidden sm:flex"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{t.challan_btn_share}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* =============================================================== */}
        {/* PRINTABLE CHALLAN DOCUMENT BODY */}
        {/* =============================================================== */}
        <div className="p-6 sm:p-8 space-y-6 font-sans text-xs sm:text-sm text-slate-800">
          {/* Document Header with Company Letterhead */}
          <div className="border-b-2 border-slate-900 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 text-amber-400 font-black text-xl flex items-center justify-center">
                    E
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950">
                    {COMPANY_INFO.name}
                  </h1>
                </div>

                <p className="text-xs font-bold text-slate-600 mt-1">
                  Manufacturer of High-Strength AAC Blocks (2" to 9"), ReadyMix Plaster & Construction Chemicals
                </p>

                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  📍 {COMPANY_INFO.address}
                </p>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-600 mt-1 font-medium">
                  <span>✉️ {COMPANY_INFO.email}</span>
                  <span>•</span>
                  <span>📞 {COMPANY_INFO.phones.map(p => p.display).join(' / ')}</span>
                </div>
              </div>

              {/* Status & ISO Badge */}
              <div className="text-right sm:self-start">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-indigo-50 text-indigo-900 border border-indigo-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-700" />
                  <span>{COMPANY_INFO.legalStatus}</span>
                </span>
                <div className="mt-2 text-right">
                  <span className="inline-block px-3 py-1 rounded-lg text-xs font-black bg-slate-900 text-amber-300 font-mono">
                    STATUS: {order.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Document Title Ribbon */}
            <div className="mt-4 bg-slate-100 p-2.5 rounded-xl border border-slate-300 text-center">
              <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-wider uppercase">
                {t.challan_doc_heading}
              </h2>
              <div className="text-[11px] text-slate-600 font-semibold">
                {t.challan_doc_sub}
              </div>
            </div>
          </div>

          {/* Challan Metadata Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 font-bold text-xs">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">{t.challan_number_label}:</span>
              <span className="text-slate-950 font-black font-mono">{challanNo}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">{t.challan_order_ref}:</span>
              <span className="text-indigo-700 font-black font-mono">#EB-{order.id}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">{t.challan_booking_date}:</span>
              <span className="text-slate-800">{bookingDate}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">{t.comp_del_date}:</span>
              <span className="text-emerald-800 font-black">{order.date}</span>
            </div>
          </div>

          {/* Two-Column Party & Destination Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Consignee */}
            <div className="border border-slate-200 rounded-2xl p-4 bg-white space-y-2">
              <div className="text-xs font-black uppercase text-indigo-900 border-b border-slate-100 pb-1 flex items-center justify-between">
                <span>{t.challan_consignee_heading}</span>
                <span className="text-[10px] text-slate-400">Buyer</span>
              </div>
              <div className="space-y-1">
                <div className="font-black text-sm text-slate-950">{order.name}</div>
                <div className="text-xs text-slate-700 font-medium">
                  📞 Phone: <b className="font-mono">{order.phone}</b>
                </div>
                {order.supName && (
                  <div className="text-xs text-slate-600 font-medium">
                    👷 Site Supervisor: <b>{order.supName}</b> {order.supPhone ? `(📞 ${order.supPhone})` : ''}
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Destination */}
            <div className="border border-slate-200 rounded-2xl p-4 bg-white space-y-2">
              <div className="text-xs font-black uppercase text-indigo-900 border-b border-slate-100 pb-1 flex items-center justify-between">
                <span>{t.challan_destination_heading}</span>
                <span className="text-[10px] text-slate-400">Site Unloading</span>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-800">
                  <span className="text-slate-500 font-bold block">Site Address:</span>
                  <b className="text-slate-950">{order.site}</b>
                </div>
                {order.del && (
                  <div className="text-xs text-slate-700">
                    <span className="text-slate-500 font-bold block">Delivery Place:</span>
                    <span className="font-black text-indigo-900">{order.del}</span>
                  </div>
                )}
                {order.maps && (
                  <div className="text-[11px] pt-1">
                    <a
                      href={order.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline font-bold inline-flex items-center gap-1"
                    >
                      <MapPin className="w-3 h-3 text-blue-600" />
                      <span>Google Maps Location Verified</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Transport & Fleet Dispatch Details */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-2">
            <div className="text-xs font-black uppercase text-slate-800 border-b border-slate-200 pb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-indigo-700" />
                <span>{t.challan_dispatch_heading}</span>
              </span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                100% Company Fleet
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div>
                <span className="text-slate-500 block">Vehicle Type:</span>
                <b className="text-slate-900">{order.vehicleType || 'Truck 4.5T (6.9 CBM)'}</b>
              </div>
              <div>
                <span className="text-slate-500 block">Driver Name:</span>
                <b className="text-slate-900">{order.driverName || 'Factory Assigned Driver'}</b>
              </div>
              <div>
                <span className="text-slate-500 block">Driver Phone:</span>
                <b className="text-slate-900 font-mono">{order.driverPhone || 'On-Call Contact'}</b>
              </div>
            </div>
          </div>

          {/* Itemized Supplied Materials Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-1">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                {t.challan_items_heading}
              </h3>
              <span className="text-xs font-black text-slate-900 bg-amber-100 px-2.5 py-0.5 rounded-lg border border-amber-300">
                Total Material: {order.tot}
              </span>
            </div>

            <div className="border-2 border-slate-900 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white font-black">
                    <th className="p-2.5 sm:px-3 w-12 text-center">Sr.</th>
                    <th className="p-2.5 sm:px-3">Description of Goods</th>
                    <th className="p-2.5 sm:px-3">Size / Spec</th>
                    <th className="p-2.5 sm:px-3 text-center">Quantity</th>
                    <th className="p-2.5 sm:px-3 text-right">Volume (CBM)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((it, idx) => (
                      <tr key={it.id || idx} className="hover:bg-slate-50">
                        <td className="p-2.5 sm:px-3 text-center font-bold text-slate-500">{idx + 1}</td>
                        <td className="p-2.5 sm:px-3 font-bold text-slate-900">
                          {it.type === 'block' ? 'Autoclaved Aerated Concrete (AAC) Block' : it.name || it.prod}
                        </td>
                        <td className="p-2.5 sm:px-3 font-mono font-bold text-slate-700">
                          {it.type === 'block' ? `${it.inch || '6"'}` : 'Standard Bag'}
                        </td>
                        <td className="p-2.5 sm:px-3 text-center font-black text-slate-900">
                          {it.qty} {it.type === 'block' ? (lang === 'en' ? 'Pcs' : 'नग') : 'Bag'}
                        </td>
                        <td className="p-2.5 sm:px-3 text-right font-black text-indigo-900 font-mono">
                          {it.cbm ? `${it.cbm} CBM` : '---'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-3 text-center font-bold text-slate-700">
                        {order.tot}
                      </td>
                    </tr>
                  )}
                  {/* Summary Row */}
                  <tr className="bg-slate-100 font-black border-t-2 border-slate-900 text-slate-950">
                    <td colSpan={3} className="p-2.5 sm:px-3 text-right uppercase">
                      Total Consignment:
                    </td>
                    <td colSpan={2} className="p-2.5 sm:px-3 text-right text-indigo-950 text-sm">
                      {order.tot}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Standard Delivery Terms */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-[10px] sm:text-[11px] text-slate-600 space-y-1 leading-relaxed">
            <span className="font-black text-slate-900 uppercase block">{t.challan_terms_heading}</span>
            <ol className="list-decimal pl-4 space-y-0.5">
              <li>Material is dispatched in 100% sound condition directly from Kaman, Vasai factory.</li>
              <li>Consignee or site supervisor must inspect goods before unloading sign-off.</li>
              <li>No claims for transit damage or shortages will be entertained once signed.</li>
              <li>This is an official delivery consignment note; tax invoice issued separately.</li>
            </ol>
          </div>

          {/* Three Signatures Block */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 text-center text-xs">
            <div className="space-y-8">
              <div className="font-bold text-slate-400 italic">E-Buildcon Factory</div>
              <div className="border-t border-slate-400 pt-1.5 font-black text-slate-900">
                {t.challan_sign_dispatcher}
              </div>
            </div>

            <div className="space-y-8">
              <div className="font-bold text-slate-400 italic">Goods Received in Transit</div>
              <div className="border-t border-slate-400 pt-1.5 font-black text-slate-900">
                {t.challan_sign_driver}
              </div>
            </div>

            <div className="space-y-8">
              <div className="font-bold text-slate-400 italic">Material Verified & Unloaded</div>
              <div className="border-t border-slate-400 pt-1.5 font-black text-slate-900">
                {t.challan_sign_receiver}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
