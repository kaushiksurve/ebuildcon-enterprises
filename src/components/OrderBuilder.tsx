import React, { useState, useEffect } from 'react';
import { ProductType, OrderItem, Order, Language, UserProfile } from '../types';
import { TranslationDictionary } from '../data/translations';
import { COMPANY_INFO } from '../data/company';
import { AAC_BLOCK_SIZES } from '../data/products';
import {
  calculateBlockCbm,
  calculateOrderTotals,
  getTodayFormatted,
  generateWhatsAppOrderUrl,
  generateWhatsAppOrderMessage
} from '../utils/orderUtils';
import { useGeolocation } from '../hooks/useGeolocation';
import { MaterialDatePicker } from './MaterialDatePicker';
import {
  MapPin,
  Calendar,
  Building,
  Plus,
  Trash2,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Check,
  Copy,
  PenLine,
  Navigation,
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface OrderBuilderProps {
  t: TranslationDictionary;
  lang: Language;
  onOrderPlaced: (order: Order) => void;
  onNavigateToMyOrders: () => void;
  initialBlockSelection?: { inch: string; qty: number } | null;
  currentUser?: UserProfile | null;
}

export const OrderBuilder: React.FC<OrderBuilderProps> = ({
  t,
  lang = 'mr',
  onOrderPlaced,
  onNavigateToMyOrders,
  initialBlockSelection,
  currentUser
}) => {
  // Order Form Fields (Pre-populated from logged-in user profile if available)
  const [partyName, setPartyName] = useState(() => currentUser?.name || '');
  const [supervisorName, setSupervisorName] = useState(() => currentUser?.supervisorName || '');
  const [supervisorPhone, setSupervisorPhone] = useState(() => currentUser?.supervisorPhone || '');
  const [partyPhone, setPartyPhone] = useState(() => currentUser?.phone || '');
  const [siteAddr, setSiteAddr] = useState(() => currentUser?.siteAddress || '');
  const [deliveryLoc, setDeliveryLoc] = useState(() => currentUser?.deliveryLocation || '');
  const [mapsLink, setMapsLink] = useState('');
  const [reqDate, setReqDate] = useState(() => getTodayFormatted());

  // Keep form synced when currentUser changes or logs in
  useEffect(() => {
    if (currentUser) {
      setPartyName(prev => prev || currentUser.name);
      setPartyPhone(prev => prev || currentUser.phone);
      if (currentUser.supervisorName) setSupervisorName(prev => prev || currentUser.supervisorName || '');
      if (currentUser.supervisorPhone) setSupervisorPhone(prev => prev || currentUser.supervisorPhone || '');
      if (currentUser.siteAddress) setSiteAddr(prev => prev || currentUser.siteAddress || '');
      if (currentUser.deliveryLocation) setDeliveryLoc(prev => prev || currentUser.deliveryLocation || '');
    }
  }, [currentUser]);

  // Item Addition State
  const [prodType, setProdType] = useState<ProductType>('block');
  const [blkSize, setBlkSize] = useState<string>('6" (55/CBM)');
  const [blkQty, setBlkQty] = useState<number | ''>(800);
  const [otherQty, setOtherQty] = useState<number | ''>('');
  const [items, setItems] = useState<OrderItem[]>([]);

  // Location Mode: 2 Options (1: Manual Entry, 2: Google Maps / GPS)
  const [locationMode, setLocationMode] = useState<'manual' | 'gps'>('manual');

  // Geolocation Hook (Localized to current language)
  const {
    loading: geoLoading,
    mapsUrl: geoMapsUrl,
    addressSummary: geoAddressSummary,
    statusMessage: geoStatusMessage,
    statusCode: geoStatusCode,
    requestLocation
  } = useGeolocation(lang);

  // Submission & WhatsApp Confirmation Modal State
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);
  const [showWaConfirmation, setShowWaConfirmation] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Sync initial block selection if passed from Calculator
  useEffect(() => {
    if (initialBlockSelection) {
      setProdType('block');
      const found = AAC_BLOCK_SIZES.find(s => s.inch === initialBlockSelection.inch);
      if (found) {
        setBlkSize(`${found.inch} (${found.perCbm}/CBM)`);
      }
      setBlkQty(initialBlockSelection.qty);
    }
  }, [initialBlockSelection]);

  // Sync Geolocation into deliveryLoc and mapsLink
  useEffect(() => {
    if (geoMapsUrl) {
      setMapsLink(geoMapsUrl);
    }
    if (geoAddressSummary) {
      setDeliveryLoc(geoAddressSummary);
    }
  }, [geoMapsUrl, geoAddressSummary]);

  // Date input auto-formatter for DD/MM/YYYY
  const handleDateInput = (val: string) => {
    const raw = val.replace(/\D/g, '').substring(0, 8);
    const d = raw.substring(0, 2);
    const m = raw.substring(2, 4);
    const y = raw.substring(4, 8);
    if (raw.length >= 5) setReqDate(`${d}/${m}/${y}`);
    else if (raw.length >= 3) setReqDate(`${d}/${m}`);
    else setReqDate(raw);
  };

  // Add Item to Order
  const handleAddItem = () => {
    if (prodType === 'block') {
      const match = blkSize.match(/(\d+)"/);
      const inch = match ? `${match[1]}"` : '6"';
      const qty = typeof blkQty === 'number' ? blkQty : 0;
      if (!qty || qty <= 0) {
        alert(`${t.calc_label_qty}`);
        return;
      }
      const { cbm, cbmVal, per } = calculateBlockCbm(inch, qty);
      const newItem: OrderItem = {
        id: `blk_${Date.now()}`,
        type: 'block',
        prod: 'block',
        inch,
        qty,
        per,
        cbm,
        cbmVal,
        name: `AAC Block ${inch}`
      };
      setItems(prev => [...prev, newItem]);
      setBlkQty('');
    } else {
      const qty = typeof otherQty === 'number' ? otherQty : 0;
      if (!qty || qty <= 0) {
        alert('Quantity required');
        return;
      }
      let name = '';
      let icon = '';
      if (prodType === 'plaster') {
        name = 'ReadyMix Plaster - 40kg';
        icon = '🏗️';
      } else if (prodType === 'mortar') {
        name = 'Block Mortar / Jointing Motor - 40kg';
        icon = '🧱';
      } else if (prodType === 'adhesive') {
        name = 'Tile Adhesive - 20/40kg';
        icon = '🏠';
      }
      const newItem: OrderItem = {
        id: `oth_${Date.now()}`,
        type: 'other',
        prod: prodType,
        qty,
        name,
        icon
      };
      setItems(prev => [...prev, newItem]);
      setOtherQty('');
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  // Totals
  const { totalCbm, combinedSummary } = calculateOrderTotals(items, lang);

  // Dynamic helper text for product selection
  const getHelperText = () => {
    if (prodType === 'block') return t.calc_info_block;
    if (prodType === 'plaster') return t.calc_info_plaster;
    if (prodType === 'mortar') return t.calc_info_mortar;
    return t.calc_info_adhesive;
  };

  // Submit Order
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!partyName.trim()) errors.partyName = t.shop_label;
    if (!supervisorName.trim()) errors.supervisorName = t.sup_name_label;
    if (!supervisorPhone.trim()) errors.supervisorPhone = t.sup_phone_label;
    if (!partyPhone.trim()) errors.partyPhone = t.phone_label;
    if (!siteAddr.trim()) errors.siteAddr = t.site_label;
    if (!reqDate.trim() || reqDate.length < 8) errors.reqDate = t.date_label;

    if (items.length === 0) {
      errors.items = t.no_item;
      alert(t.no_item);
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    // Build Order Object
    const newOrder: Order = {
      id: Date.now(),
      name: partyName.trim(),
      supName: supervisorName.trim(),
      supPhone: supervisorPhone.trim(),
      userId: currentUser?.id,
      phone: partyPhone.trim(),
      site: siteAddr.trim(),
      del: deliveryLoc.trim() || undefined,
      maps: mapsLink.trim() || undefined,
      date: reqDate.trim(),
      items: [...items],
      tot: combinedSummary,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    onOrderPlaced(newOrder);
    setSubmittedOrder(newOrder);
    setShowWaConfirmation(true);

    // Direct WhatsApp Pathway: automatically open WhatsApp with the formatted order
    const primaryWaUrl = generateWhatsAppOrderUrl(COMPANY_INFO.phones[0].wa, newOrder, lang);
    try {
      window.open(primaryWaUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.warn('Popup blocked; confirmation modal provides direct click button', e);
    }

    // Reset items and mapsLink, retain user profile information
    setItems([]);
    setMapsLink('');
    setPartyName(currentUser?.name || '');
    setPartyPhone(currentUser?.phone || '');
    setSupervisorName(currentUser?.supervisorName || '');
    setSupervisorPhone(currentUser?.supervisorPhone || '');
    setSiteAddr(currentUser?.siteAddress || '');
    setDeliveryLoc(currentUser?.deliveryLocation || '');
  };

  const handleCopyMessage = () => {
    if (!submittedOrder) return;
    const text = generateWhatsAppOrderMessage(submittedOrder, lang);
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
      {/* Title & Notes */}
      <div className="pb-4 border-b border-slate-100">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
          <span>{t.order_title}</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {t.order_subtitle}
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="space-y-6">
        {/* SECTION 1: CUSTOMER & SUPERVISOR DETAILS */}
        <div className="bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-4">
          {currentUser && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-900 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-between flex-wrap gap-1.5 shadow-sm">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>
                  {t.auth_welcome_back} <b>{currentUser.name}</b> ({currentUser.phone})
                </span>
              </div>
              <span className="text-[10px] text-blue-700 bg-white/80 px-2 py-0.5 rounded-full border border-blue-200/60 font-semibold">
                {lang === 'en' ? 'Profile Details Auto-loaded' : 'तपशील प्रोफाईलवरून ऑटो-लोड'}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs font-black uppercase text-indigo-900 tracking-wider">
            <Building className="w-4 h-4 text-indigo-700" />
            <span>{t.order_sec_customer}</span>
          </div>

          {/* Shop / Builder Name */}
          <div>
            <label className="text-xs font-black text-slate-800 block">
              {t.shop_label}
            </label>
            <input
              id="partyName"
              type="text"
              required
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
              placeholder={t.shop_placeholder}
              className={`w-full mt-1.5 h-12 rounded-xl border-2 px-3 text-xs sm:text-sm font-black transition-colors ${
                validationErrors.partyName
                  ? 'border-red-500 bg-red-50 text-red-900'
                  : 'border-blue-600 bg-blue-50/50 text-slate-900 focus:bg-white'
              }`}
            />
            {validationErrors.partyName && (
              <p className="text-[11px] font-bold text-red-600 mt-1">{validationErrors.partyName}</p>
            )}
          </div>

          {/* Supervisor Name and Supervisor Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black text-indigo-900 block">
                {t.sup_name_label}
              </label>
              <input
                id="supervisorName"
                type="text"
                required
                value={supervisorName}
                onChange={(e) => setSupervisorName(e.target.value)}
                placeholder={t.sup_name_placeholder}
                className="w-full mt-1.5 h-12 rounded-xl border-2 border-indigo-200 px-3 text-xs sm:text-sm font-bold text-slate-900 bg-white focus:border-indigo-600"
              />
              {validationErrors.supervisorName && (
                <p className="text-[11px] font-bold text-red-600 mt-1">{validationErrors.supervisorName}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-black text-indigo-900 block">
                {t.sup_phone_label}
              </label>
              <input
                id="supervisorPhone"
                type="tel"
                required
                value={supervisorPhone}
                onChange={(e) => setSupervisorPhone(e.target.value)}
                placeholder={t.sup_phone_placeholder}
                className="w-full mt-1.5 h-12 rounded-xl border-2 border-indigo-200 px-3 text-xs sm:text-sm font-bold text-slate-900 bg-white focus:border-indigo-600"
              />
              {validationErrors.supervisorPhone && (
                <p className="text-[11px] font-bold text-red-600 mt-1">{validationErrors.supervisorPhone}</p>
              )}
            </div>
          </div>

          {/* Customer Phone & Site Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black text-slate-800 block">
                {t.phone_label}
              </label>
              <input
                id="partyPhone"
                type="tel"
                required
                value={partyPhone}
                onChange={(e) => setPartyPhone(e.target.value)}
                placeholder={t.phone_placeholder}
                className="w-full mt-1.5 h-12 rounded-xl border-2 border-blue-200 px-3 text-xs sm:text-sm font-bold text-slate-900 bg-white focus:border-blue-600"
              />
              {validationErrors.partyPhone && (
                <p className="text-[11px] font-bold text-red-600 mt-1">{validationErrors.partyPhone}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-black text-slate-800 block">
                {t.site_label}
              </label>
              <input
                id="siteAddr"
                type="text"
                required
                value={siteAddr}
                onChange={(e) => setSiteAddr(e.target.value)}
                placeholder={t.site_placeholder}
                className="w-full mt-1.5 h-12 rounded-xl border-2 border-blue-200 px-3 text-xs sm:text-sm font-bold text-slate-900 bg-white focus:border-blue-600"
              />
              {validationErrors.siteAddr && (
                <p className="text-[11px] font-bold text-red-600 mt-1">{validationErrors.siteAddr}</p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: DELIVERY LOCATION & GPS SHARING (2 OPTIONS) */}
        <div className="bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-indigo-900 tracking-wider">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>{t.order_sec_delivery}</span>
            </div>
            <span className="text-[11px] font-bold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-full">
              {lang === 'en' ? 'Optional' : 'ऐच्छिक'}
            </span>
          </div>

          {/* 2-Option Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-800 block">
              {t.loc_option_title}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option 1 Button: Manual Entry */}
              <button
                type="button"
                onClick={() => setLocationMode('manual')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-start gap-3 cursor-pointer ${
                  locationMode === 'manual'
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    locationMode === 'manual' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <PenLine className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <span>{t.loc_opt_manual_title}</span>
                    {locationMode === 'manual' && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 font-medium leading-tight">
                    {t.loc_opt_manual_desc}
                  </div>
                </div>
              </button>

              {/* Option 2 Button: Fetch via Google Maps / GPS */}
              <button
                type="button"
                onClick={() => {
                  setLocationMode('gps');
                  if (!deliveryLoc && !geoLoading && geoStatusCode === 'idle') {
                    requestLocation();
                  }
                }}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-start gap-3 cursor-pointer ${
                  locationMode === 'gps'
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    locationMode === 'gps' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <span>{t.loc_opt_gps_title}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      GPS
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 font-medium leading-tight">
                    {t.loc_opt_gps_desc}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* OPTION 1 CONTENT: MANUAL ADDRESS ENTRY */}
          {locationMode === 'manual' && (
            <div className="space-y-3 bg-white p-4 rounded-2xl border border-blue-100 shadow-sm">
              <div className="text-xs text-blue-900 bg-blue-50/70 p-2.5 rounded-xl border border-blue-200/60 font-medium">
                {t.loc_manual_tip}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block">
                    {t.del_loc_label}
                  </label>
                  <input
                    id="deliveryLoc"
                    type="text"
                    value={deliveryLoc}
                    onChange={(e) => setDeliveryLoc(e.target.value)}
                    placeholder={t.del_loc_placeholder}
                    className="w-full mt-1.5 h-11 rounded-xl border border-slate-300 px-3 text-xs sm:text-sm font-medium text-slate-800 bg-slate-50/50 focus:bg-white focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block">
                    {t.maps_link_label}
                  </label>
                  <input
                    id="mapsLink"
                    type="text"
                    value={mapsLink}
                    onChange={(e) => setMapsLink(e.target.value)}
                    placeholder={t.maps_link_placeholder}
                    className="w-full mt-1.5 h-11 rounded-xl border border-slate-300 px-3 text-xs sm:text-sm font-medium text-slate-800 bg-slate-50/50 focus:bg-white focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* OPTION 2 CONTENT: GOOGLE MAPS / GPS FETCH */}
          {locationMode === 'gps' && (
            <div className="space-y-3 bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm">
              {/* Trigger / Re-fetch Button */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={requestLocation}
                  disabled={geoLoading}
                  className="h-11 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-black shadow flex items-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
                >
                  {geoLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : geoStatusCode === 'success' ? (
                    <RefreshCw className="w-4 h-4" />
                  ) : (
                    <MapPin className="w-4 h-4" />
                  )}
                  <span>
                    {geoLoading
                      ? t.gps_fetching_place
                      : geoStatusCode === 'success'
                      ? t.loc_gps_refetch_btn
                      : t.share_gps_btn}
                  </span>
                </button>

                {mapsLink && (
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-black flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{t.order_view_on_maps}</span>
                  </a>
                )}
              </div>

              {/* Status Feedback Display */}
              <div
                id="locStatus"
                className={`text-xs p-3.5 rounded-xl font-bold flex items-start gap-2.5 transition-all ${
                  geoStatusCode === 'success'
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                    : geoStatusCode === 'loading'
                    ? 'bg-amber-50 text-amber-800 border border-amber-300 animate-pulse'
                    : geoStatusCode === 'denied' ||
                      geoStatusCode === 'gps_off' ||
                      geoStatusCode === 'timeout' ||
                      geoStatusCode === 'error'
                    ? 'bg-red-50 text-red-800 border border-red-300'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {geoStatusCode === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {geoStatusCode === 'loading' && <RefreshCw className="w-4 h-4 text-amber-600 animate-spin" />}
                  {(geoStatusCode === 'denied' ||
                    geoStatusCode === 'gps_off' ||
                    geoStatusCode === 'timeout' ||
                    geoStatusCode === 'error') && (
                    <MapPin className="w-4 h-4 text-red-600" />
                  )}
                  {geoStatusCode === 'idle' && <MapPin className="w-4 h-4 text-slate-500" />}
                </div>
                <div className="flex-1 space-y-1">
                  <div>{geoStatusMessage}</div>
                  {deliveryLoc && geoStatusCode === 'success' && (
                    <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 p-2 rounded-lg border border-emerald-200">
                      <span className="font-bold">{t.loc_gps_detected_place}</span> {deliveryLoc}
                    </div>
                  )}
                </div>
              </div>

              {/* Editable Place Name and Google Maps Link fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="text-xs font-bold text-slate-700 block">
                    {t.del_loc_label}
                  </label>
                  <input
                    id="deliveryLoc"
                    type="text"
                    value={deliveryLoc}
                    onChange={(e) => setDeliveryLoc(e.target.value)}
                    placeholder={t.del_loc_placeholder}
                    className="w-full mt-1.5 h-11 rounded-xl border border-slate-300 px-3 text-xs sm:text-sm font-medium text-slate-800 bg-slate-50/50 focus:bg-white focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block">
                    {t.maps_link_label}
                  </label>
                  <input
                    id="mapsLink"
                    type="text"
                    value={mapsLink}
                    onChange={(e) => setMapsLink(e.target.value)}
                    placeholder={t.maps_link_placeholder}
                    className="w-full mt-1.5 h-11 rounded-xl border border-slate-300 px-3 text-xs sm:text-sm font-medium text-slate-800 bg-slate-50/50 focus:bg-white focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: REQUIRED DELIVERY DATE */}
        <div className="bg-red-50/60 p-4 sm:p-5 rounded-2xl border-2 border-red-200 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-red-700 block">
              {t.date_label}
            </label>
            <button
              type="button"
              onClick={() => setIsDatePickerOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 hover:text-red-800 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-full transition-colors active:scale-95 cursor-pointer shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-red-600" />
              <span>{t.date_picker_title}</span>
            </button>
          </div>

          <div className="relative">
            <input
              id="reqDate"
              type="text"
              required
              maxLength={10}
              value={reqDate}
              onClick={() => setIsDatePickerOpen(true)}
              onChange={(e) => handleDateInput(e.target.value)}
              placeholder={t.date_placeholder}
              className="w-full h-12 rounded-xl border-2 border-red-300 bg-white px-3 pr-11 text-sm font-black text-slate-900 focus:border-red-500 cursor-pointer"
            />
            <button
              type="button"
              onClick={() => setIsDatePickerOpen(true)}
              title="Open Calendar"
              className="absolute right-2 top-2 p-1.5 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
            </button>
          </div>

          {validationErrors.reqDate && (
            <p className="text-[11px] font-bold text-red-600">{validationErrors.reqDate}</p>
          )}

          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <p>{t.order_date_note}</p>
            {reqDate && reqDate.length >= 8 && (
              <span className="font-bold text-red-700 bg-red-100/80 px-2 py-0.5 rounded-md">
                📅 {reqDate}
              </span>
            )}
          </div>
        </div>

        {/* Material 3 Date Picker Modal */}
        <MaterialDatePicker
          isOpen={isDatePickerOpen}
          onClose={() => setIsDatePickerOpen(false)}
          selectedDate={reqDate}
          lang={lang}
          onDateChange={(newDateStr) => {
            setReqDate(newDateStr);
            if (validationErrors.reqDate) {
              setValidationErrors((prev) => {
                const updated = { ...prev };
                delete updated.reqDate;
                return updated;
              });
            }
          }}
          title={t.date_picker_title}
        />

        {/* SECTION 4: PRODUCT ITEM BUILDER */}
        <div className="bg-blue-50/80 rounded-2xl p-4 sm:p-6 border border-blue-200 space-y-4">
          <div className="font-black text-xs sm:text-sm text-indigo-950 flex items-center gap-2">
            <span>{t.item_add_title}</span>
          </div>

          <div className="space-y-3">
            {/* Product Type Dropdown */}
            <select
              id="prodType"
              value={prodType}
              onChange={(e) => setProdType(e.target.value as ProductType)}
              className="w-full h-12 rounded-xl border-2 border-indigo-300 bg-white px-3 text-xs sm:text-sm font-black text-slate-900 focus:border-indigo-600"
            >
              <option value="block">{t.block_opt}</option>
              <option value="plaster">{t.plaster_opt}</option>
              <option value="mortar">{t.mortar_opt}</option>
              <option value="adhesive">{t.adhesive_opt}</option>
            </select>

            {/* Block Size & Quantity Row */}
            {prodType === 'block' ? (
              <div id="blockRow" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  id="blkSize"
                  value={blkSize}
                  onChange={(e) => setBlkSize(e.target.value)}
                  className="h-11 rounded-xl border-2 border-slate-200 px-3 text-xs font-bold bg-white text-slate-900"
                >
                  {AAC_BLOCK_SIZES.map(s => (
                    <option key={s.inch} value={`${s.inch} (${s.perCbm}/CBM)`}>
                      {s.inch} ({s.perCbm}/CBM)
                    </option>
                  ))}
                </select>

                <div className="relative">
                  <input
                    id="blkQty"
                    type="number"
                    min="1"
                    placeholder="800"
                    value={blkQty}
                    onChange={(e) => setBlkQty(e.target.value === '' ? '' : parseInt(e.target.value))}
                    className="w-full h-11 rounded-xl border-2 border-slate-200 px-3 text-xs font-bold bg-white text-slate-900"
                  />
                  <span className="absolute right-3 top-3 text-xs font-bold text-slate-400">{t.calc_pcs_unit}</span>
                </div>
              </div>
            ) : (
              <div id="otherRow">
                <div className="relative">
                  <input
                    id="otherQty"
                    type="number"
                    min="1"
                    placeholder="Bag - 10"
                    value={otherQty}
                    onChange={(e) => setOtherQty(e.target.value === '' ? '' : parseInt(e.target.value))}
                    className="w-full h-11 rounded-xl border-2 border-amber-300 bg-amber-50 px-3 text-xs font-bold text-slate-900"
                  />
                  <span className="absolute right-3 top-3 text-xs font-bold text-amber-700">Bag</span>
                </div>
              </div>
            )}

            {/* Dynamic Helper Info */}
            <div id="calcInfo" className="text-xs text-slate-600 font-bold bg-white/70 p-2.5 rounded-xl border border-blue-100">
              {getHelperText()}
            </div>
          </div>

          {/* Add Item Button */}
          <button
            type="button"
            id="add-item-btn"
            onClick={handleAddItem}
            className="w-full h-11 rounded-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black text-xs sm:text-sm shadow flex items-center justify-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{t.add_item_btn}</span>
            <span id="cbmPrev" className="bg-indigo-800 px-2 py-0.5 rounded-full text-xs">
              {totalCbm} CBM
            </span>
          </button>

          {/* Added Items List */}
          <div id="itemsBox" className="space-y-2 pt-2">
            {items.length === 0 ? (
              <div className="text-center py-4 text-xs text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                {t.no_item}
              </div>
            ) : (
              items.map((it, idx) => (
                <div
                  key={it.id || idx}
                  className={`flex justify-between items-center gap-2 rounded-xl p-3 text-xs font-bold shadow-sm border ${
                    it.type === 'block'
                      ? 'bg-white border-slate-200'
                      : 'bg-amber-50 border-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="shrink-0">{it.icon || '🧱'}</span>
                    <span className="break-words">
                      {it.name} - {it.qty} {it.type === 'block' ? t.calc_pcs_unit : 'Bag'}
                      {it.cbm ? ` - ${it.cbm} CBM (${it.per}/CBM)` : ` - ${t.order_items_col_separate}`}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(idx)}
                    title="Remove Item"
                    className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Total Display Box */}
          <div className="bg-indigo-950 text-white rounded-xl p-3.5 flex justify-between items-center">
            <span id="total-label" className="text-xs font-bold text-blue-200">
              {t.total_label}:
            </span>
            <span id="totalCbm" className="font-black text-xs sm:text-sm text-amber-300">
              {combinedSummary}
            </span>
          </div>
        </div>

        {/* Place Order Button - Connected with WhatsApp */}
        <div className="space-y-2 pt-2">
          <button
            type="submit"
            id="place-order-btn"
            className="w-full min-h-[58px] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-500 hover:to-green-500 active:scale-[0.99] text-white font-black text-sm sm:text-base shadow-xl shadow-emerald-950/20 flex items-center justify-center gap-3 transition-all cursor-pointer border border-emerald-400/30"
          >
            <MessageCircle className="w-6 h-6 shrink-0 fill-white/20 stroke-[2.5]" />
            <div className="text-left sm:text-center">
              <div className="text-sm sm:text-base font-black tracking-wide leading-tight">
                {t.place_order_btn}
              </div>
              <div className="text-[11px] text-emerald-100 font-semibold leading-tight pt-0.5">
                📱 {COMPANY_INFO.phones[0].display} • {t.factory_dispatch_note}
              </div>
            </div>
          </button>

          <p className="text-[11px] text-center text-slate-500 font-medium">
            {t.order_location_optional_note}
          </p>
        </div>
      </form>

      {/* WHATSAPP CONFIRMATION MODAL / ACTION BOX */}
      {showWaConfirmation && submittedOrder && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-4 sm:p-7 shadow-2xl border border-emerald-300 space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <MessageCircle className="w-8 h-8 fill-emerald-600 text-white stroke-[2]" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-emerald-950 leading-snug">
                {t.wa_order_success_title}
              </h3>
              <p className="text-xs text-slate-600">
                {t.wa_order_success_desc}
              </p>
            </div>

            {/* Primary WhatsApp Action */}
            <div className="space-y-2">
              <a
                href={generateWhatsAppOrderUrl(COMPANY_INFO.phones[0].wa, submittedOrder, lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-14 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 active:scale-95 text-white rounded-2xl flex items-center justify-center gap-3 font-black text-sm shadow-lg shadow-emerald-900/20 transition-all border border-emerald-400/40"
              >
                <MessageCircle className="w-5 h-5 fill-white/20 stroke-[2.5]" />
                <span>📱 {t.wa_send_main_btn} ({COMPANY_INFO.phones[0].display})</span>
              </a>

              {/* Alternate Sales Contacts */}
              <div className="text-[11px] font-bold text-slate-500 text-center pt-1">
                {t.wa_send_alternate_label}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {COMPANY_INFO.phones.slice(1).map((phone, idx) => {
                  const waUrl = generateWhatsAppOrderUrl(phone.wa, submittedOrder, lang);
                  return (
                    <a
                      key={idx}
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-11 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl flex items-center justify-center gap-1.5 font-bold text-xs transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{phone.display}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Order Preview Box */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1.5 font-medium text-slate-700">
              <div className="font-bold text-slate-900 pb-1 border-b border-slate-200 flex items-center justify-between">
                <span>📋 {t.order_summary_heading}</span>
                <span className="text-emerald-700 font-mono text-[11px]">#{submittedOrder.id.toString().slice(-6)}</span>
              </div>
              <div>{t.order_summary_customer} <b className="text-slate-950">{submittedOrder.name}</b> ({submittedOrder.phone})</div>
              <div>{t.order_summary_supervisor} <b className="text-slate-950">{submittedOrder.supName} ({submittedOrder.supPhone})</b></div>
              <div>{t.order_summary_material} <b className="text-indigo-900">{submittedOrder.tot}</b></div>
              <div>{t.order_summary_req_date} <b className="text-red-700 font-bold">📅 {submittedOrder.date}</b></div>
              <div>{t.order_summary_site} <b className="text-slate-950">{submittedOrder.site}</b></div>
              {submittedOrder.del && (
                <div>{t.del_loc_label}: <b className="text-slate-950">{submittedOrder.del}</b></div>
              )}
              {submittedOrder.maps && (
                <div className="pt-0.5">
                  <a href={submittedOrder.maps} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-[11px] font-bold inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>Google Maps Link</span>
                  </a>
                </div>
              )}
            </div>

            {/* Quick Copy Button */}
            <button
              type="button"
              onClick={handleCopyMessage}
              className="w-full h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copiedMessage ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-black">{t.wa_copy_success}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>{t.wa_copy_btn}</span>
                </>
              )}
            </button>

            {/* Close & Navigate to My Orders */}
            <button
              type="button"
              onClick={() => {
                setShowWaConfirmation(false);
                onNavigateToMyOrders();
              }}
              className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-black text-xs transition-colors cursor-pointer shadow-md"
            >
              {t.close_view_my_orders}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
