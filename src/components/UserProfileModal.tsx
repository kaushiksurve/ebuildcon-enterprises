import React, { useState } from 'react';
import { UserProfile, Language } from '../types';
import { TranslationDictionary } from '../data/translations';
import {
  X,
  User,
  Phone,
  Building,
  MapPin,
  LogOut,
  Save,
  CheckCircle2,
  Calendar,
  Package
} from 'lucide-react';

interface UserProfileModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onLogout: () => void;
  ordersCount: number;
  t: TranslationDictionary;
  lang: Language;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  user,
  isOpen,
  onClose,
  onUpdateProfile,
  onLogout,
  ordersCount,
  t,
  lang
}) => {
  const [name, setName] = useState(user.name);
  const [supervisorName, setSupervisorName] = useState(user.supervisorName || '');
  const [supervisorPhone, setSupervisorPhone] = useState(user.supervisorPhone || '');
  const [siteAddress, setSiteAddress] = useState(user.siteAddress || '');
  const [deliveryLocation, setDeliveryLocation] = useState(user.deliveryLocation || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name,
      supervisorName,
      supervisorPhone,
      siteAddress,
      deliveryLocation
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleLogoutClick = () => {
    if (window.confirm(t.auth_logout_confirm)) {
      onLogout();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-4 sm:p-7 shadow-2xl border border-slate-200 space-y-4 sm:space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-700 text-white flex items-center justify-center font-black text-lg shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                {t.auth_profile_title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {user.phone} • {ordersCount} {lang === 'en' ? 'orders recorded' : 'ऑर्डर्स नोंदविल्या'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success Alert */}
        {savedSuccess && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t.auth_profile_updated}</span>
          </div>
        )}

        {/* Profile Form */}
        <form onSubmit={handleSave} className="space-y-4 text-xs font-medium text-slate-700">
          <div>
            <label className="text-xs font-black text-slate-800 block">
              {t.auth_name_label}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 h-11 px-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-500"
            />
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-3">
            <div className="text-xs font-black text-indigo-950 uppercase tracking-wider">
              {t.auth_default_site_title}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block">
                  {t.sup_name_label}
                </label>
                <input
                  type="text"
                  value={supervisorName}
                  onChange={(e) => setSupervisorName(e.target.value)}
                  placeholder={t.sup_name_placeholder}
                  className="w-full mt-1 h-10 px-3 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block">
                  {t.sup_phone_label}
                </label>
                <input
                  type="tel"
                  value={supervisorPhone}
                  onChange={(e) => setSupervisorPhone(e.target.value)}
                  placeholder={t.sup_phone_placeholder}
                  className="w-full mt-1 h-10 px-3 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block">
                {t.site_label}
              </label>
              <input
                type="text"
                value={siteAddress}
                onChange={(e) => setSiteAddress(e.target.value)}
                placeholder={t.site_placeholder}
                className="w-full mt-1 h-10 px-3 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block">
                {t.del_loc_label}
              </label>
              <input
                type="text"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                placeholder={t.del_loc_placeholder}
                className="w-full mt-1 h-10 px-3 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
            <button
              type="submit"
              className="w-full sm:flex-1 h-11 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl font-black text-xs shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{t.auth_update_profile_btn}</span>
            </button>

            <button
              type="button"
              onClick={handleLogoutClick}
              className="w-full sm:w-auto h-11 px-4 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>{t.auth_logout_btn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
