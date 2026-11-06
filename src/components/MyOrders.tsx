import React, { useState } from 'react';
import { Order, OrderStatus, Language, UserProfile } from '../types';
import { TranslationDictionary } from '../data/translations';
import { COMPANY_INFO } from '../data/company';
import { generateWhatsAppOrderUrl } from '../utils/orderUtils';
import { DeliveryChallanModal } from './DeliveryChallanModal';
import {
  ListOrdered,
  Search,
  Calendar,
  MapPin,
  ExternalLink,
  Trash2,
  MessageCircle,
  User,
  Sparkles,
  Filter,
  FileText
} from 'lucide-react';

interface MyOrdersProps {
  orders: Order[];
  t: TranslationDictionary;
  lang?: Language;
  onDeleteOrder: (orderId: number) => void;
  onClearAll: () => void;
  onNavigateToNewOrder: () => void;
  currentUser?: UserProfile | null;
}

export const MyOrders: React.FC<MyOrdersProps> = ({
  orders,
  t,
  lang = 'mr',
  onDeleteOrder,
  onClearAll,
  onNavigateToNewOrder,
  currentUser
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewScope, setViewScope] = useState<'my' | 'all'>('my');
  const [selectedOrderForWa, setSelectedOrderForWa] = useState<Order | null>(null);
  const [selectedOrderForChallan, setSelectedOrderForChallan] = useState<Order | null>(null);

  // Clean phone helper
  const cleanPhone = (val?: string) => (val || '').replace(/\D/g, '').slice(-10);

  // Orders tied to current logged-in user
  const userOrders = currentUser
    ? orders.filter(o => {
        const uPhone = cleanPhone(currentUser.phone);
        const oPhone = cleanPhone(o.phone);
        return (
          o.userId === currentUser.id ||
          oPhone === uPhone ||
          o.name.toLowerCase().includes(currentUser.name.toLowerCase())
        );
      })
    : orders;

  const activeOrdersList = viewScope === 'my' && currentUser ? userOrders : orders;

  // Filter orders by search and status
  const filteredOrders = activeOrdersList.filter(o => {
    const matchesSearch =
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.phone.includes(searchQuery) ||
      o.supName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.site.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || o.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Dispatched':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <ListOrdered className="w-5 h-5 text-indigo-700" />
            <span>{t.myorders_title}</span>
          </h2>
          <div className="flex items-center gap-2 flex-wrap mt-1">
            <p className="text-xs text-slate-500">
              {currentUser ? (
                <span>
                  {t.auth_welcome_back} <b className="text-slate-800">{currentUser.name}</b>
                </span>
              ) : (
                t.myorders_subtitle
              )}{' '}
              ({filteredOrders.length} {t.myorders_count_label})
            </p>
            {currentUser && orders.length > userOrders.length && (
              <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-100 text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => setViewScope('my')}
                  className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                    viewScope === 'my' ? 'bg-white text-indigo-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lang === 'en' ? `My Orders (${userOrders.length})` : `माझे ऑर्डर्स (${userOrders.length})`}
                </button>
                <button
                  type="button"
                  onClick={() => setViewScope('all')}
                  className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                    viewScope === 'all' ? 'bg-white text-indigo-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lang === 'en' ? `All Device (${orders.length})` : `सर्व डिव्हाइस (${orders.length})`}
                </button>
              </div>
            )}
          </div>
        </div>

        {orders.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Clear all saved orders?')) {
                  onClearAll();
                }
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
            >
              {t.myorders_clear_all}
            </button>
            <button
              type="button"
              onClick={onNavigateToNewOrder}
              className="px-4 py-2 rounded-xl text-xs font-black bg-indigo-900 text-white hover:bg-indigo-800 transition-colors"
            >
              {t.myorders_new_order_btn}
            </button>
          </div>
        )}
      </div>

      {/* Search & Status Filters */}
      {orders.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <input
              type="text"
              placeholder={t.search_orders_placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50/50 focus:bg-white focus:border-indigo-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          </div>

          <div className="sm:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50/50"
            >
              <option value="all">{t.myorders_filter_status}</option>
              <option value="Pending">{t.myorders_status_pending}</option>
              <option value="Confirmed">{t.myorders_status_confirmed}</option>
              <option value="Dispatched">{t.myorders_status_dispatched}</option>
              <option value="Delivered">{t.myorders_status_delivered}</option>
            </select>
          </div>
        </div>
      )}

      {/* Orders List */}
      <div id="myOrdersBox" className="space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-12 px-4 space-y-3">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <ListOrdered className="w-8 h-8" />
            </div>
            <p className="text-sm font-bold text-slate-500">
              {t.no_orders_yet}
            </p>
            <button
              type="button"
              onClick={onNavigateToNewOrder}
              className="h-11 px-6 rounded-full bg-indigo-900 text-white font-black text-xs hover:bg-indigo-800 transition-colors"
            >
              {t.myorders_new_order_btn}
            </button>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500 font-bold">
            {t.myorders_no_result}
          </div>
        ) : (
          filteredOrders.map((ord) => (
            <div
              key={ord.id}
              className="border border-slate-200 rounded-2xl p-4 sm:p-5 bg-slate-50/60 shadow-sm hover:shadow-md transition-all space-y-3"
            >
              {/* Card Header: Customer name & Status badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-sm sm:text-base text-slate-900">
                    {ord.name}
                  </span>
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                    {ord.tot}
                  </span>
                  {ord.supName && (
                    <span className="text-xs text-slate-600 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{ord.supName}</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span
                    className={`text-[11px] font-black px-2.5 py-1 rounded-full border shadow-sm ${getStatusBadge(
                      ord.status
                    )}`}
                  >
                    {ord.status}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Delete this order?')) {
                        onDeleteOrder(ord.id);
                      }
                    }}
                    title="Delete order"
                    className="p-1 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="text-xs text-slate-600 space-y-1 bg-white p-3 rounded-xl border border-slate-200">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-red-700 font-black flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t.myorders_req_date_label} {ord.date}</span>
                  </span>
                  {ord.origDate && ord.origDate !== ord.date && (
                    <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                      (Orig: {ord.origDate})
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-slate-500 font-bold">{t.myorders_site_label} </span>
                  <span className="font-semibold text-slate-800">{ord.site}</span>
                </div>

                {ord.del && (
                  <div>
                    <span className="text-slate-500 font-bold">{t.myorders_del_loc_label} </span>
                    <span className="font-semibold text-slate-800">{ord.del}</span>
                  </div>
                )}

                {ord.maps && (
                  <div className="pt-1">
                    <a
                      href={ord.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-bold underline text-xs"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{t.myorders_view_maps}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Items Breakdown list */}
              <div className="text-[11px] text-slate-500 font-medium">
                <span className="font-bold text-slate-700">{t.myorders_items_breakdown} </span>
                {ord.items.map((it, idx) => (
                  <span key={idx}>
                    {it.inch ? `${it.inch}: ${it.qty} (${it.cbm} CBM)` : `${it.name}: ${it.qty} Bag`}
                    {idx < ord.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>

              {/* Actions row: View Challan / Order Slip + Re-send on WhatsApp */}
              <div className="pt-2 flex flex-wrap items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedOrderForChallan(ord)}
                  className="px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 active:scale-95 text-white text-xs font-black flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.challan_btn_view}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedOrderForWa(ord)}
                  className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-black flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{t.myorders_resend_wa_btn}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* WhatsApp Modal for My Orders */}
      {selectedOrderForWa && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-4 sm:p-6 shadow-2xl border border-emerald-200 space-y-4">
            <h3 className="text-base font-black text-slate-900">
              📱 {selectedOrderForWa.name}
            </h3>
            <p className="text-xs text-slate-500">
              WhatsApp:
            </p>

            <div className="space-y-2">
              <a
                href={generateWhatsAppOrderUrl(COMPANY_INFO.phones[0].wa, selectedOrderForWa, lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl flex items-center justify-center gap-2 font-black text-xs shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>📱 {t.wa_send_main_btn} (Main: {COMPANY_INFO.phones[0].display})</span>
              </a>

              <div className="grid grid-cols-2 gap-2 pt-1">
                {COMPANY_INFO.phones.slice(1).map((phone, idx) => {
                  const waUrl = generateWhatsAppOrderUrl(phone.wa, selectedOrderForWa, lang);
                  return (
                    <a
                      key={idx}
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl flex items-center justify-center gap-1 font-bold text-xs transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{phone.display}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedOrderForWa(null)}
              className="w-full h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-full transition-colors cursor-pointer"
            >
              {t.myorders_close_btn}
            </button>
          </div>
        </div>
      )}

      {/* Official Delivery Challan & Order Slip Modal */}
      <DeliveryChallanModal
        order={selectedOrderForChallan}
        isOpen={Boolean(selectedOrderForChallan)}
        onClose={() => setSelectedOrderForChallan(null)}
        t={t}
        lang={lang}
      />
    </div>
  );
};
