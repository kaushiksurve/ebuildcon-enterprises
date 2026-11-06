import React, { useState, useMemo, useEffect } from 'react';
import { Order, OrderStatus, Language, UserProfile } from '../types';
import { TranslationDictionary } from '../data/translations';
import { COMPANY_INFO } from '../data/company';
import { isFirebaseConfigured } from '../config/firebase';
import {
  verifyCompanyAccess,
  getInitialAuthState,
  logoutCompany,
  AuthState,
  AUTHORIZED_COMPANY_PHONES,
  AUTHORIZED_COMPANY_EMAIL,
  isAuthorizedCompanyIdentifier
} from '../utils/auth';
import {
  generateDateChangeWhatsAppUrl,
  generateDateChangeSmsUrl,
  generateConfirmationWhatsAppUrl,
  generateDispatchWhatsAppUrl,
  getCustomerReplyTemplates,
  generateCustomerReplyWhatsAppUrl,
  generateCustomerReplySmsUrl,
  CustomerReplyTemplate
} from '../utils/orderUtils';
import { requestNotificationPermission } from '../utils/notification';
import { MaterialDatePicker } from './MaterialDatePicker';
import { DeliveryChallanModal } from './DeliveryChallanModal';
import {
  Building2,
  ShieldCheck,
  Bell,
  Calendar,
  Truck,
  CheckCircle2,
  MapPin,
  ExternalLink,
  LogOut,
  AlertTriangle,
  MessageSquare,
  Phone,
  User,
  Search,
  Filter,
  Send,
  X,
  Copy,
  Check,
  Clock,
  Package,
  Layers,
  ArrowUpDown,
  FileText,
  Printer
} from 'lucide-react';

interface CompanyPanelProps {
  orders: Order[];
  t: TranslationDictionary;
  lang?: Language;
  currentUser?: UserProfile | null;
  onUpdateOrderStatus: (
    orderId: number,
    status: OrderStatus,
    driverInfo?: { driverName: string; driverPhone: string; vehicleType: string }
  ) => void;
  onUpdateOrderDate: (orderId: number, newDate: string) => void;
  onUpdateOrderLocation: (orderId: number, newLocation: string) => void;
}

export const CompanyPanel: React.FC<CompanyPanelProps> = ({
  orders,
  t,
  lang = 'mr',
  currentUser,
  onUpdateOrderStatus,
  onUpdateOrderDate,
  onUpdateOrderLocation
}) => {
  // Authentication State
  const [authState, setAuthState] = useState<AuthState>(() => getInitialAuthState());
  const [identifierInput, setIdentifierInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [authMode, setAuthMode] = useState<'demo' | 'production'>('demo');
  const [authError, setAuthError] = useState<string | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'date'>('newest');

  // Modals state
  const [editingDateOrder, setEditingDateOrder] = useState<Order | null>(null);
  const [newDateInput, setNewDateInput] = useState('');
  const [dateChangeAlertBox, setDateChangeAlertBox] = useState<{
    order: Order;
    oldDate: string;
    newDate: string;
  } | null>(null);

  const [editingLocOrder, setEditingLocOrder] = useState<Order | null>(null);
  const [newLocInput, setNewLocInput] = useState('');

  const [dispatchingOrder, setDispatchingOrder] = useState<Order | null>(null);
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [vehicleType, setVehicleType] = useState('4.5T (6.9 CBM)');

  // Customer Contact / Reply Modal State
  const [replyingOrder, setReplyingOrder] = useState<Order | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('confirm');
  const [replyMessage, setReplyMessage] = useState<string>('');
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  // Delivery Challan Modal State
  const [selectedOrderForChallan, setSelectedOrderForChallan] = useState<Order | null>(null);

  // Check if current logged-in user in App is an authorized company staff
  const currentUserCompanyCheck = useMemo(() => {
    if (!currentUser?.phone) return { isAuthorized: false, cleanId: '' };
    return isAuthorizedCompanyIdentifier(currentUser.phone);
  }, [currentUser]);

  // Pre-fill identifier input if currentUser is authorized company staff and identifier is empty
  useEffect(() => {
    if (!authState.isAuthenticated && currentUserCompanyCheck.isAuthorized && !identifierInput) {
      setIdentifierInput(currentUserCompanyCheck.cleanId);
    }
  }, [authState.isAuthenticated, currentUserCompanyCheck, identifierInput]);

  // When replying order changes, populate initial template
  useEffect(() => {
    if (replyingOrder) {
      const templates = getCustomerReplyTemplates(replyingOrder, lang);
      const defaultTemplate = templates.find(t => t.id === 'confirm') || templates[0];
      if (defaultTemplate) {
        setSelectedTemplateId(defaultTemplate.id);
        setReplyMessage(defaultTemplate.message);
      }
    }
  }, [replyingOrder, lang]);

  // Handle Authentication Submission
  const handleVerifyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const inputId = identifierInput.trim();
    if (!inputId) {
      setAuthError(t.comp_auth_id_input_label);
      return;
    }

    const result = verifyCompanyAccess(inputId, otpInput, authMode, authState.remainingAttempts, lang);
    if (result.success && result.session) {
      setAuthState(result.session);
      setOtpInput('');
      setAuthError(null);
    } else {
      setAuthError(result.error || 'Authentication Failed');
      setAuthState(prev => ({
        ...prev,
        remainingAttempts: result.remainingAttempts,
        isLocked: result.isLocked
      }));
    }
  };

  // Quick select an authorized account
  const handleSelectAuthorizedAccount = (acc: string) => {
    setIdentifierInput(acc);
    setAuthError(null);
    if (authMode === 'demo') {
      setOtpInput('1234');
    }
  };

  const handleLogout = () => {
    logoutCompany();
    setAuthState({
      isAuthenticated: false,
      mode: 'demo',
      remainingAttempts: 5,
      isLocked: false
    });
    setOtpInput('');
  };

  // Background Notification enabler
  const handleEnableNotification = async () => {
    const permission = await requestNotificationPermission();
    if (permission === 'granted') {
      alert(lang === 'en' ? 'Background Notifications Enabled!' : 'बॅकग्राउंड नोटिफिकेशन्स सुरू झाले!');
    } else {
      alert(lang === 'en' ? 'Notification permission not granted.' : 'नोटिफिकेशन परवानगी मिळाली नाही.');
    }
  };

  // 1. Confirm Order
  const handleConfirmOrder = (order: Order) => {
    onUpdateOrderStatus(order.id, 'Confirmed');
    const waUrl = generateConfirmationWhatsAppUrl(order.phone, order);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // 2. Open Date Edit Modal
  const handleOpenDateModal = (order: Order) => {
    setEditingDateOrder(order);
    setNewDateInput(order.date);
  };

  // 3. Open Delivery Location Modal
  const handleOpenLocModal = (order: Order) => {
    setEditingLocOrder(order);
    setNewLocInput(order.del || '');
  };

  const handleSaveLocation = () => {
    if (!editingLocOrder) return;
    onUpdateOrderLocation(editingLocOrder.id, newLocInput.trim());
    setEditingLocOrder(null);
  };

  // 4. Open Dispatch Modal
  const handleOpenDispatchModal = (order: Order) => {
    setDispatchingOrder(order);
    setDriverName('');
    setDriverPhone('');
  };

  const handleSaveDispatch = () => {
    if (!dispatchingOrder || !driverName.trim()) {
      alert(lang === 'en' ? 'Please enter driver name' : 'कृपया ड्रायव्हरचे नाव टाका');
      return;
    }

    onUpdateOrderStatus(dispatchingOrder.id, 'Dispatched', {
      driverName: driverName.trim(),
      driverPhone: driverPhone.trim(),
      vehicleType
    });

    const waUrl = generateDispatchWhatsAppUrl(
      dispatchingOrder.phone,
      dispatchingOrder,
      driverName.trim(),
      driverPhone.trim(),
      vehicleType
    );
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setDispatchingOrder(null);
  };

  // 5. Mark Delivered
  const handleMarkDelivered = (order: Order) => {
    onUpdateOrderStatus(order.id, 'Delivered');
  };

  // 6. Open Reply Modal
  const handleOpenReplyModal = (order: Order) => {
    setReplyingOrder(order);
  };

  const handleSelectTemplate = (template: CustomerReplyTemplate) => {
    setSelectedTemplateId(template.id);
    setReplyMessage(template.message);
  };

  const handleSendReplyWhatsApp = (targetPhone: string) => {
    if (!replyMessage.trim()) return;
    const url = generateCustomerReplyWhatsAppUrl(targetPhone, replyMessage.trim());
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSendReplySms = (targetPhone: string) => {
    if (!replyMessage.trim()) return;
    const url = generateCustomerReplySmsUrl(targetPhone, replyMessage.trim());
    window.location.href = url;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedPhone(text);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  // Filtered and Sorted Orders
  const filteredOrders = useMemo(() => {
    let list = [...orders];

    // Status filter
    if (statusFilter !== 'all') {
      list = list.filter(o => o.status.toLowerCase() === statusFilter.toLowerCase());
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(o => {
        return (
          o.name.toLowerCase().includes(q) ||
          o.phone.includes(q) ||
          o.site.toLowerCase().includes(q) ||
          (o.supName && o.supName.toLowerCase().includes(q)) ||
          (o.supPhone && o.supPhone.includes(q)) ||
          (o.del && o.del.toLowerCase().includes(q)) ||
          (o.tot && o.tot.toLowerCase().includes(q)) ||
          String(o.id).includes(q)
        );
      });
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'oldest') return a.id - b.id;
      if (sortBy === 'date') return a.date.localeCompare(b.date);
      return b.id - a.id; // newest first
    });

    return list;
  }, [orders, statusFilter, searchQuery, sortBy]);

  // Order summary metrics
  const metrics = useMemo(() => {
    let totalCbm = 0;
    let pending = 0;
    let confirmed = 0;
    let dispatched = 0;
    let delivered = 0;

    orders.forEach(o => {
      if (o.status === 'Pending') pending++;
      else if (o.status === 'Confirmed') confirmed++;
      else if (o.status === 'Dispatched') dispatched++;
      else if (o.status === 'Delivered') delivered++;

      if (o.items && o.items.length > 0) {
        o.items.forEach(it => {
          if (it.type === 'block') {
            totalCbm += it.cbmVal || parseFloat(it.cbm || '0');
          }
        });
      } else {
        const match = o.tot.match(/([\d.]+)\s*CBM/i);
        if (match) totalCbm += parseFloat(match[1]);
      }
    });

    return {
      total: orders.length,
      totalCbm: totalCbm.toFixed(2),
      pending,
      confirmed,
      dispatched,
      delivered
    };
  }, [orders]);

  // =========================================================================
  // VIEW A: ACCESS RESTRICTION LOCK SCREEN (UNAUTHENTICATED)
  // Only 9819927174 / 9359162253 / 9356709489 or ebuildconenterprises@gmail.com
  // =========================================================================
  if (!authState.isAuthenticated) {
    return (
      <div className="max-w-xl mx-auto space-y-6 animate-fadeIn py-4">
        {/* Main Security Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-indigo-900 text-amber-400 mx-auto flex items-center justify-center shadow-lg shadow-indigo-900/20">
              <Building2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {t.comp_auth_gate_title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              {t.comp_auth_gate_desc}
            </p>
          </div>

          {/* Detected Account Alert if currentUser is company staff */}
          {currentUserCompanyCheck.isAuthorized && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-between gap-3 text-emerald-900 text-xs font-bold shadow-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-black text-emerald-950 block">{t.comp_auth_detected_badge}</span>
                  <span className="text-[11px] text-emerald-800">
                    {currentUser?.name} (📞 {currentUser?.phone})
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleSelectAuthorizedAccount(currentUserCompanyCheck.cleanId)}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-black shrink-0 transition-colors cursor-pointer"
              >
                Auto Fill
              </button>
            </div>
          )}

          {/* Authorized Credentials Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-700" />
                <span>{t.comp_auth_allowed_ids_label}</span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                Staff Only
              </span>
            </div>

            {/* 3 Company Phone Numbers + 1 Company Email Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {AUTHORIZED_COMPANY_PHONES.map(phone => (
                <button
                  key={phone}
                  type="button"
                  onClick={() => handleSelectAuthorizedAccount(phone)}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    identifierInput === phone
                      ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-[1.02]'
                      : 'bg-white hover:bg-indigo-50/70 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Phone className={`w-3.5 h-3.5 ${identifierInput === phone ? 'text-amber-300' : 'text-indigo-600'}`} />
                    <span className="font-black">{phone}</span>
                  </div>
                  <span className={`text-[10px] font-bold ${identifierInput === phone ? 'text-indigo-200' : 'text-slate-500'}`}>
                    Select
                  </span>
                </button>
              ))}

              <button
                type="button"
                onClick={() => handleSelectAuthorizedAccount(AUTHORIZED_COMPANY_EMAIL)}
                className={`p-2.5 rounded-xl border text-left flex items-center justify-between sm:col-span-2 transition-all cursor-pointer ${
                  identifierInput.toLowerCase() === AUTHORIZED_COMPANY_EMAIL.toLowerCase()
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-[1.01]'
                    : 'bg-white hover:bg-indigo-50/70 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-xs">✉️</span>
                  <span className="font-bold text-[11px] truncate">{AUTHORIZED_COMPANY_EMAIL}</span>
                </div>
                <span className={`text-[10px] font-bold shrink-0 ml-1 ${
                  identifierInput.toLowerCase() === AUTHORIZED_COMPANY_EMAIL.toLowerCase() ? 'text-indigo-200' : 'text-slate-500'
                }`}>
                  Select
                </span>
              </button>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="bg-slate-100 p-1 rounded-xl flex text-xs font-black">
            <button
              type="button"
              onClick={() => {
                setAuthMode('demo');
                setAuthError(null);
                if (!otpInput) setOtpInput('1234');
              }}
              className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer ${
                authMode === 'demo' ? 'bg-white text-indigo-950 shadow' : 'text-slate-600'
              }`}
            >
              {t.comp_mode_demo}
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('production');
                setAuthError(null);
                setOtpInput('');
              }}
              className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer ${
                authMode === 'production' ? 'bg-white text-indigo-950 shadow' : 'text-slate-600'
              }`}
            >
              {t.comp_mode_prod}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleVerifyAccess} className="space-y-4">
            {/* Input 1: Company Phone or Email */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t.comp_auth_id_input_label}
              </label>
              <input
                id="companyIdentifierIn"
                type="text"
                disabled={authState.isLocked}
                value={identifierInput}
                onChange={(e) => {
                  setIdentifierInput(e.target.value);
                  setAuthError(null);
                }}
                placeholder={t.comp_auth_id_placeholder}
                className="w-full h-12 rounded-2xl border-2 border-slate-300 px-4 text-sm font-black text-slate-900 focus:border-indigo-600 focus:outline-none transition-colors"
              />
            </div>

            {/* Input 2: OTP / PIN */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">
                  {t.comp_auth_pin_label}
                </label>
                <span className="text-[11px] text-indigo-600 font-bold">
                  {authMode === 'demo' ? t.comp_demo_hint : t.comp_prod_hint}
                </span>
              </div>
              <input
                id="companyOtpIn"
                type="password"
                maxLength={6}
                disabled={authState.isLocked}
                value={otpInput}
                onChange={(e) => {
                  setOtpInput(e.target.value);
                  setAuthError(null);
                }}
                placeholder={authMode === 'demo' ? '1234' : '******'}
                className="w-full h-12 rounded-2xl border-2 border-slate-300 text-center text-2xl tracking-[0.3em] font-black focus:border-indigo-600 focus:outline-none transition-colors"
              />
            </div>

            {/* Error Message */}
            {authError && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-700 flex items-start gap-2 animate-fadeIn">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{authError}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={authState.isLocked || !identifierInput.trim() || !otpInput.trim()}
              className="w-full h-12 rounded-full bg-indigo-900 hover:bg-indigo-950 active:scale-95 text-white font-black text-sm shadow-lg shadow-indigo-900/20 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{authMode === 'demo' ? t.verify_otp_btn : t.comp_verify_secure}</span>
            </button>
          </form>

          {/* Strict Security Policy Note */}
          <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-2xl text-[11px] text-indigo-950 space-y-1">
            <div className="font-black flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.comp_auth_system}</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {authMode === 'demo' ? t.comp_auth_demo_desc : t.comp_auth_prod_desc}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW B: AUTHORIZED COMPANY SECTION (FULL REGISTRY & ORDER REPLY WORKFLOW)
  // =========================================================================
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Controls Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-indigo-700" />
              <span>{t.comp_orders_all_title}</span>
            </h2>
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>{t.comp_verified_session}</span>
            </span>
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-200">
              {authState.authorizedIdentifier}
            </span>
            {isFirebaseConfigured() ? (
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Cloud Firestore Active</span>
              </span>
            ) : (
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>Local Offline Mode (Syncs in Browser)</span>
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t.comp_orders_all_sub} • {COMPANY_INFO.email}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => window.print()}
            className="h-10 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white text-xs font-black flex items-center gap-1.5 shadow transition-all cursor-pointer"
            title="Print daily orders manifest"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Print Manifest</span>
          </button>

          <button
            type="button"
            onClick={handleEnableNotification}
            className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-black flex items-center gap-1.5 shadow transition-all cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span>{t.enable_noti_btn}</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="h-10 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-600" />
            <span>{t.comp_logout}</span>
          </button>
        </div>
      </div>

      {/* Metrics Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-slate-500">{t.comp_stat_total_orders}</div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{metrics.total}</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-slate-500">{t.comp_stat_total_cbm}</div>
          <div className="text-xl sm:text-2xl font-black text-indigo-700 mt-1">{metrics.totalCbm} <span className="text-xs font-bold text-slate-500">CBM</span></div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-sm">
          <div className="text-[11px] font-bold text-amber-700">{t.comp_filter_pending}</div>
          <div className="text-xl sm:text-2xl font-black text-amber-600 mt-1">{metrics.pending}</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-blue-200 shadow-sm">
          <div className="text-[11px] font-bold text-blue-700">{t.comp_filter_dispatched}</div>
          <div className="text-xl sm:text-2xl font-black text-blue-600 mt-1">{metrics.dispatched}</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-emerald-200 shadow-sm col-span-2 sm:col-span-1">
          <div className="text-[11px] font-bold text-emerald-700">{t.comp_filter_delivered}</div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">{metrics.delivered}</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.comp_search_orders}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-500 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="h-11 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:border-indigo-600"
            >
              <option value="newest">Newest Orders First</option>
              <option value="oldest">Oldest Orders First</option>
              <option value="date">Delivery Date</option>
            </select>
          </div>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: t.comp_filter_all, count: orders.length },
            { id: 'pending', label: t.comp_filter_pending, count: metrics.pending },
            { id: 'confirmed', label: t.comp_filter_confirmed, count: metrics.confirmed },
            { id: 'dispatched', label: t.comp_filter_dispatched, count: metrics.dispatched },
            { id: 'delivered', label: t.comp_filter_delivered, count: metrics.delivered }
          ].map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer ${
                statusFilter === f.id
                  ? 'bg-indigo-900 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>{f.label}</span>
              <span className={`ml-1.5 px-1.5 py-0.2 rounded-md text-[10px] ${
                statusFilter === f.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders Registry List */}
      <div id="compOrdersBox" className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-md space-y-3">
            <Package className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-600">
              {searchQuery || statusFilter !== 'all'
                ? t.myorders_no_result
                : t.no_company_orders}
            </p>
          </div>
        ) : (
          filteredOrders.map((ord) => {
            const isDispatched = ord.status === 'Dispatched';
            const isDelivered = ord.status === 'Delivered';
            const isConfirmed = ord.status === 'Confirmed';

            return (
              <div
                key={ord.id}
                className="bg-white border-2 border-indigo-100 hover:border-indigo-300 rounded-3xl p-5 sm:p-6 shadow-md transition-all space-y-4"
              >
                {/* Header: Order ID, Builder Name, Contact, Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-mono font-black px-2 py-0.5 rounded-md bg-slate-900 text-amber-300">
                        #EB-{ord.id}
                      </span>
                      <h3 className="font-black text-base sm:text-lg text-slate-900">
                        {ord.name}
                      </h3>
                      <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-indigo-600" />
                        <a href={`tel:${ord.phone}`} className="hover:text-indigo-600 underline font-mono">
                          {ord.phone}
                        </a>
                      </span>
                    </div>

                    {/* Supervisor details */}
                    {ord.supName && (
                      <div className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1.5 flex-wrap">
                        <span>{t.comp_party_supervisor_label}</span>
                        <b className="text-slate-800">{ord.supName}</b>
                        {ord.supPhone && (
                          <a
                            href={`tel:${ord.supPhone}`}
                            className="text-indigo-600 underline font-mono font-bold"
                          >
                            ({ord.supPhone})
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Status Badge & Direct Status Switcher */}
                  <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                    <span
                      className={`text-xs font-black px-3 py-1 rounded-full border shadow-sm ${
                        isDelivered
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : isDispatched
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : isConfirmed
                          ? 'bg-indigo-100 text-indigo-800 border-indigo-300'
                          : 'bg-amber-100 text-amber-900 border-amber-300'
                      }`}
                    >
                      {ord.status}
                    </span>

                    <select
                      value={ord.status}
                      onChange={(e) => {
                        const newStatus = e.target.value as OrderStatus;
                        if (newStatus === 'Dispatched') {
                          handleOpenDispatchModal(ord);
                        } else {
                          onUpdateOrderStatus(ord.id, newStatus);
                        }
                      }}
                      className="h-7 px-2 rounded-lg text-[11px] font-bold border border-slate-300 bg-white text-slate-800 hover:border-indigo-500 focus:outline-none focus:border-indigo-600 cursor-pointer shadow-xs"
                      title={t.comp_change_status_title}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Delivery Information Box */}
                <div className="text-xs bg-slate-50/80 border border-slate-200 rounded-2xl p-4 space-y-2 text-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-500 font-semibold block">{t.comp_site_addr}</span>
                      <b className="text-slate-900 text-xs sm:text-sm">{ord.site}</b>
                    </div>

                    <div>
                      <span className="text-slate-500 font-semibold block">{t.comp_del_loc}</span>
                      <b className="text-slate-900 text-xs sm:text-sm">{ord.del || '---'}</b>
                      {ord.origDel && (
                        <span className="text-[10px] text-red-600 font-bold ml-2">
                          (Orig: {ord.origDel})
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-slate-500 font-semibold">{t.comp_del_date}</span>
                      <span className="text-indigo-900 text-sm font-black bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-200">
                        📅 {ord.date}
                      </span>
                      {ord.origDate && (
                        <span className="text-[10px] text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200 font-bold">
                          (Orig: {ord.origDate} ➔ {ord.date})
                        </span>
                      )}
                    </div>

                    {ord.maps && (
                      <a
                        href={ord.maps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl font-black text-xs transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        <span>{t.comp_open_maps}</span>
                        <ExternalLink className="w-3 h-3 text-blue-500" />
                      </a>
                    )}
                  </div>

                  {/* Driver / Dispatch Details if assigned */}
                  {ord.driverName && (
                    <div className="pt-2 border-t border-slate-200/60 text-indigo-900 font-bold flex items-center gap-2 flex-wrap">
                      <Truck className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>{t.comp_driver_details_heading}</span>
                      <span className="bg-indigo-50 text-indigo-950 px-2.5 py-0.5 rounded-lg border border-indigo-200">
                        👤 {ord.driverName} {ord.driverPhone ? `(📞 ${ord.driverPhone})` : ''} • 🚛 {ord.vehicleType || 'Truck'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Ordered Material Details Breakdown */}
                <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1 border-b border-amber-200/60">
                    <span className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-amber-700" />
                      <span>{t.comp_order_items_heading}</span>
                    </span>
                    <span className="text-xs font-black text-slate-900 bg-white px-2.5 py-0.5 rounded-lg border border-amber-300">
                      Total: {ord.tot}
                    </span>
                  </div>

                  {/* Itemized Table or List */}
                  {ord.items && ord.items.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {ord.items.map((it, idx) => (
                        <div
                          key={it.id || idx}
                          className="bg-white/80 rounded-xl p-2.5 border border-amber-200/70 text-xs flex items-center justify-between gap-2"
                        >
                          <div className="font-bold text-slate-800">
                            {idx + 1}. {it.type === 'block' ? `AAC Block ${it.inch || ''}` : it.name || it.prod}
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-black text-indigo-700">
                              {it.qty} {it.type === 'block' ? (lang === 'en' ? 'Pcs' : 'नग') : 'Bag'}
                            </span>
                            {it.cbm && (
                              <span className="text-[10px] text-slate-500 block">
                                ({it.cbm} CBM)
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs font-bold text-slate-700">{ord.tot}</div>
                  )}
                </div>

                {/* Action Buttons: Reply, Challan, Change Date, Change Location, Dispatch, Delivered */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
                  {/* BUTTON 1: Prominent Reply to Customer */}
                  <button
                    type="button"
                    onClick={() => handleOpenReplyModal(ord)}
                    className="h-11 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 active:scale-95 text-white text-xs font-black shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-200" />
                    <span className="truncate">{t.comp_btn_reply_customer}</span>
                  </button>

                  {/* BUTTON 2: View / Print Delivery Challan */}
                  <button
                    type="button"
                    onClick={() => setSelectedOrderForChallan(ord)}
                    className="h-11 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white text-xs font-black shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span className="truncate">{t.challan_btn_view}</span>
                  </button>

                  {/* BUTTON 3: Change Date */}
                  <button
                    type="button"
                    onClick={() => handleOpenDateModal(ord)}
                    className="h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-black shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-indigo-200" />
                    <span className="truncate">{t.btn_change_date}</span>
                  </button>

                  {/* BUTTON 4: Change Location */}
                  <button
                    type="button"
                    onClick={() => handleOpenLocModal(ord)}
                    className="h-11 rounded-xl bg-violet-600 hover:bg-violet-700 active:scale-95 text-white text-xs font-black shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-violet-200" />
                    <span className="truncate">{t.btn_change_del}</span>
                  </button>

                  {/* BUTTON 5: Dispatch Vehicle */}
                  <button
                    type="button"
                    onClick={() => handleOpenDispatchModal(ord)}
                    className="h-11 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-black shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Truck className="w-3.5 h-3.5 text-blue-200" />
                    <span className="truncate">{t.btn_dispatch}</span>
                  </button>

                  {/* BUTTON 6: Mark Delivered */}
                  <button
                    type="button"
                    onClick={() => handleMarkDelivered(ord)}
                    disabled={isDelivered}
                    className="h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white text-xs font-black shadow flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span className="truncate">{t.btn_delivered}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ===================================================================== */}
      {/* MODAL 1: CUSTOMER REPLY / CONTACT MODAL */}
      {/* ===================================================================== */}
      {replyingOrder && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-xl w-full space-y-5 shadow-2xl border border-indigo-200 my-8">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                  <MessageSquare className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    {t.comp_reply_modal_title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {replyingOrder.name} • {replyingOrder.tot}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setReplyingOrder(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Customer & Supervisor Quick Call Bar */}
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block">Party / Builder:</span>
                  <span className="font-black text-slate-900">{replyingOrder.name}</span>
                  <div className="font-mono text-slate-600">{replyingOrder.phone}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(replyingOrder.phone)}
                    title="Copy Phone"
                    className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    {copiedPhone === replyingOrder.phone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <a
                    href={`tel:${replyingOrder.phone}`}
                    className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-black text-xs flex items-center gap-1 transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block">Site Supervisor:</span>
                  <span className="font-black text-slate-900">{replyingOrder.supName || 'Not specified'}</span>
                  <div className="font-mono text-slate-600">{replyingOrder.supPhone || '---'}</div>
                </div>
                {replyingOrder.supPhone && (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(replyingOrder.supPhone)}
                      title="Copy Phone"
                      className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      {copiedPhone === replyingOrder.supPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <a
                      href={`tel:${replyingOrder.supPhone}`}
                      className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-black text-xs flex items-center gap-1 transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Response Templates */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-800 block">
                {t.comp_reply_templates_label}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {getCustomerReplyTemplates(replyingOrder, lang).map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => handleSelectTemplate(template)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      selectedTemplateId === template.id
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-black shadow-sm'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 font-bold'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{template.label}</span>
                      {selectedTemplateId === template.id && (
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Editable Custom Message Box */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-800">
                  {t.comp_reply_custom_label}
                </label>
                <span className="text-[10px] text-slate-500 font-bold">
                  {replyMessage.length} characters
                </span>
              </div>
              <textarea
                rows={5}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type customized reply message to builder..."
                className="w-full rounded-2xl border-2 border-slate-200 p-3 text-xs sm:text-sm font-medium text-slate-800 focus:border-emerald-600 focus:outline-none transition-colors"
              />
            </div>

            {/* Send Dispatch Actions */}
            <div className="space-y-2 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Send WhatsApp to Customer */}
                <button
                  type="button"
                  onClick={() => handleSendReplyWhatsApp(replyingOrder.phone)}
                  disabled={!replyMessage.trim()}
                  className="h-11 px-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="truncate">{t.comp_reply_send_wa_party}</span>
                </button>

                {/* Send WhatsApp to Supervisor */}
                {replyingOrder.supPhone ? (
                  <button
                    type="button"
                    onClick={() => handleSendReplyWhatsApp(replyingOrder.supPhone)}
                    disabled={!replyMessage.trim()}
                    className="h-11 px-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="truncate">{t.comp_reply_send_wa_sup}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSendReplySms(replyingOrder.phone)}
                    disabled={!replyMessage.trim()}
                    className="h-11 px-3 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-black text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span className="truncate">{t.comp_reply_send_sms}</span>
                  </button>
                )}
              </div>

              {/* Send SMS alternative if supervisor exists */}
              {replyingOrder.supPhone && (
                <button
                  type="button"
                  onClick={() => handleSendReplySms(replyingOrder.phone)}
                  disabled={!replyMessage.trim()}
                  className="w-full h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                  <span>{t.comp_reply_send_sms}</span>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setReplyingOrder(null)}
              className="w-full h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-full transition-colors cursor-pointer"
            >
              {t.comp_reply_close}
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2: EDIT DELIVERY DATE (MATERIAL 3 DATE PICKER) */}
      {/* ===================================================================== */}
      {editingDateOrder && (
        <MaterialDatePicker
          isOpen={Boolean(editingDateOrder)}
          onClose={() => setEditingDateOrder(null)}
          selectedDate={newDateInput || editingDateOrder.date}
          lang={lang}
          onDateChange={(newDate) => {
            if (!editingDateOrder || !newDate.trim()) return;
            const oldDate = editingDateOrder.origDate || editingDateOrder.date;
            onUpdateOrderDate(editingDateOrder.id, newDate.trim());
            setDateChangeAlertBox({
              order: editingDateOrder,
              oldDate,
              newDate: newDate.trim()
            });
            setEditingDateOrder(null);
          }}
          title={`${t.btn_change_date} - ${editingDateOrder.name}`}
        />
      )}

      {/* ===================================================================== */}
      {/* MODAL 3: DATE CHANGE NOTIFICATION ACTION BOX */}
      {/* ===================================================================== */}
      {dateChangeAlertBox && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full space-y-4 shadow-2xl border border-emerald-200">
            <div className="text-center space-y-1">
              <h3 className="text-base font-black text-emerald-800">
                {t.comp_notify_party_title}
              </h3>
              <p className="text-xs text-slate-600">
                {t.comp_old_date_label}: <b>{dateChangeAlertBox.oldDate}</b> ➔ {t.comp_new_date_label}:{' '}
                <b className="text-indigo-700">{dateChangeAlertBox.newDate}</b>
              </p>
            </div>

            <div className="space-y-2">
              <a
                href={generateDateChangeWhatsAppUrl(
                  dateChangeAlertBox.order.phone,
                  dateChangeAlertBox.order,
                  dateChangeAlertBox.newDate
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center justify-center gap-2 font-black text-xs transition-colors"
              >
                <span>📱 {t.comp_wa_party_btn} ({dateChangeAlertBox.order.phone})</span>
              </a>

              {dateChangeAlertBox.order.supPhone && (
                <a
                  href={generateDateChangeWhatsAppUrl(
                    dateChangeAlertBox.order.supPhone,
                    dateChangeAlertBox.order,
                    dateChangeAlertBox.newDate
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-2 font-black text-xs transition-colors"
                >
                  <span>👷 {t.comp_wa_sup_btn} ({dateChangeAlertBox.order.supPhone})</span>
                </a>
              )}

              <a
                href={generateDateChangeSmsUrl(
                  dateChangeAlertBox.order.phone,
                  dateChangeAlertBox.order,
                  dateChangeAlertBox.newDate
                )}
                className="w-full h-11 bg-amber-600 hover:bg-amber-700 text-white rounded-xl flex items-center justify-center gap-2 font-black text-xs transition-colors"
              >
                <span>💬 {t.comp_sms_party_btn}</span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => setDateChangeAlertBox(null)}
              className="w-full h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-full transition-colors cursor-pointer"
            >
              {t.comp_close_btn}
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 4: EDIT DELIVERY LOCATION */}
      {/* ===================================================================== */}
      {editingLocOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-base font-black text-slate-900">
              {t.btn_change_del}
            </h3>
            <p className="text-xs text-slate-500">
              {t.del_loc_label}: <b>{editingLocOrder.del || '---'}</b>
            </p>

            <input
              type="text"
              placeholder={t.del_loc_placeholder}
              value={newLocInput}
              onChange={(e) => setNewLocInput(e.target.value)}
              className="w-full h-12 rounded-xl border-2 border-indigo-300 px-3 text-sm font-bold text-slate-900 focus:outline-none"
            />

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={handleSaveLocation}
                className="h-11 rounded-full bg-violet-600 text-white font-black text-xs hover:bg-violet-700 transition-colors cursor-pointer"
              >
                {t.comp_save_btn}
              </button>
              <button
                type="button"
                onClick={() => setEditingLocOrder(null)}
                className="h-11 rounded-full bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors cursor-pointer"
              >
                {t.comp_cancel_btn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 5: DISPATCH VEHICLE MODAL */}
      {/* ===================================================================== */}
      {dispatchingOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-base font-black text-slate-900">
              {t.btn_dispatch}
            </h3>
            <p className="text-xs text-slate-500">
              {dispatchingOrder.name} - {dispatchingOrder.tot}
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Driver Name:
                </label>
                <input
                  type="text"
                  placeholder="Driver Name"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="w-full h-11 rounded-xl border border-slate-300 px-3 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Driver Phone:
                </label>
                <input
                  type="tel"
                  placeholder="98XXXXXXXX"
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  className="w-full h-11 rounded-xl border border-slate-300 px-3 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Vehicle Type:
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full h-11 rounded-xl border border-slate-300 px-3 text-xs font-bold text-slate-900 bg-white"
                >
                  <option value="Tempo 1.5T (2.3 CBM)">Tempo 1.5 Ton (2.3 CBM)</option>
                  <option value="Truck 4.5T (6.9 CBM)">Truck 4.5 Ton (6.9 CBM)</option>
                  <option value="Truck 13T (18 CBM)">Truck 13 Ton (18 CBM)</option>
                  <option value="Truck 22T (32 CBM)">Truck 22 Ton (32 CBM)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={handleSaveDispatch}
                className="h-11 rounded-full bg-blue-600 text-white font-black text-xs hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Dispatch & WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setDispatchingOrder(null)}
                className="h-11 rounded-full bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Delivery Challan Modal */}
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
