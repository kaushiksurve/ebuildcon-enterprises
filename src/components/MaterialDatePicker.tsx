import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Pencil, Calendar as CalendarIcon, X } from 'lucide-react';
import { Language } from '../types';

export interface MaterialDatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string; // Format: "DD/MM/YYYY"
  onDateChange: (newDateStr: string) => void;
  title?: string;
  lang?: Language;
}

const SHORT_MONTHS_MAP: Record<Language, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  hi: ['जन', 'फ़र', 'मार्च', 'अप्रै', 'मई', 'जून', 'जुला', 'अग', 'सित', 'अक्टू', 'नवं', 'दिसं'],
  mr: ['जाने', 'फेब्रु', 'मार्च', 'एप्रि', 'मे', 'जून', 'जुलै', 'ऑग', 'सप्टें', 'ऑक्टो', 'नोव्हें', 'डिसें']
};

const FULL_MONTHS_MAP: Record<Language, string[]> = {
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  hi: [
    'जनवरी',
    'फ़रवरी',
    'मार्च',
    'अप्रैल',
    'मई',
    'जून',
    'जुलाई',
    'अगस्त',
    'सितंबर',
    'अक्टूबर',
    'नवंबर',
    'दिसंबर'
  ],
  mr: [
    'जानेवारी',
    'फेब्रुवारी',
    'मार्च',
    'एप्रिल',
    'मे',
    'जून',
    'जुलै',
    'ऑगस्ट',
    'सप्टेंबर',
    'ऑक्टोबर',
    'नोव्हेंबर',
    'डिसेंबर'
  ]
};

const WEEKDAYS_MAP: Record<Language, string[]> = {
  en: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  hi: ['सो', 'मं', 'बु', 'गु', 'शु', 'श', 'र'],
  mr: ['सो', 'मं', 'बु', 'गु', 'शु', 'श', 'र']
};

const LABELS_MAP = {
  en: {
    defaultTitle: 'Select date',
    cancel: 'Cancel',
    ok: 'OK',
    selectYear: 'Select Year',
    selectMonth: 'Select Month',
    dateLabel: 'Date (DD/MM/YYYY)',
    helper: 'Enter date in DD/MM/YYYY format or click calendar icon to pick from calendar.'
  },
  hi: {
    defaultTitle: 'तारीख चुनें',
    cancel: 'रद्द करें',
    ok: 'ठीक है',
    selectYear: 'वर्ष चुनें',
    selectMonth: 'महीना चुनें',
    dateLabel: 'तारीख (DD/MM/YYYY)',
    helper: 'तारीख DD/MM/YYYY प्रारूप में दर्ज करें या कैलेंडर आइकॉन दबाएं।'
  },
  mr: {
    defaultTitle: 'तारीख निवडा',
    cancel: 'रद्द करा',
    ok: 'निश्चित करा',
    selectYear: 'वर्ष निवडा',
    selectMonth: 'महिना निवडा',
    dateLabel: 'तारीख (DD/MM/YYYY)',
    helper: 'तारीख DD/MM/YYYY फॉरमॅट मध्ये टाका किंवा कॅलेंडरमधून निवडा.'
  }
};

function parseDateString(str: string): Date {
  if (!str) return new Date();
  const parts = str.split('/');
  if (parts.length === 3) {
    const d = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const y = parseInt(parts[2], 10);
    if (!isNaN(d) && !isNaN(m) && !isNaN(y) && y > 1900 && m >= 0 && m < 12 && d >= 1 && d <= 31) {
      return new Date(y, m, d);
    }
  }
  const isoParsed = new Date(str);
  return isNaN(isoParsed.getTime()) ? new Date() : isoParsed;
}

function formatDateToDDMMYYYY(d: Date): string {
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export const MaterialDatePicker: React.FC<MaterialDatePickerProps> = ({
  isOpen,
  onClose,
  selectedDate,
  onDateChange,
  title,
  lang = 'mr'
}) => {
  const activeLang: Language = lang === 'en' || lang === 'hi' || lang === 'mr' ? lang : 'mr';
  const labels = LABELS_MAP[activeLang];
  const shortMonths = SHORT_MONTHS_MAP[activeLang];
  const fullMonths = FULL_MONTHS_MAP[activeLang];
  const weekdays = WEEKDAYS_MAP[activeLang];

  const modalTitle = title || labels.defaultTitle;

  const [activeDate, setActiveDate] = useState<Date>(() => parseDateString(selectedDate));
  const [viewYear, setViewYear] = useState<number>(() => parseDateString(selectedDate).getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(() => parseDateString(selectedDate).getMonth());
  const [showYearMonthPicker, setShowYearMonthPicker] = useState<boolean>(false);
  const [isTextInputMode, setIsTextInputMode] = useState<boolean>(false);
  const [textInputValue, setTextInputValue] = useState<string>(() => selectedDate || formatDateToDDMMYYYY(new Date()));
  const [textInputError, setTextInputError] = useState<string>('');

  // Sync state when modal opens with new selectedDate
  useEffect(() => {
    if (isOpen) {
      const parsed = parseDateString(selectedDate);
      setActiveDate(parsed);
      setViewYear(parsed.getFullYear());
      setViewMonth(parsed.getMonth());
      setShowYearMonthPicker(false);
      setIsTextInputMode(false);
      setTextInputValue(selectedDate || formatDateToDDMMYYYY(parsed));
      setTextInputError('');
    }
  }, [isOpen, selectedDate]);

  if (!isOpen) return null;

  // Header Display Date: e.g. "10 Oct 2026"
  const formattedHeaderDate = `${activeDate.getDate()} ${shortMonths[activeDate.getMonth()]} ${activeDate.getFullYear()}`;

  // Month navigation
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  // Days calculations
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  // Monday-based offset (0 = Monday, ..., 6 = Sunday)
  const startOffset = (firstDayOfMonth + 6) % 7;

  const today = new Date();
  const isToday = (day: number) =>
    today.getDate() === day && today.getMonth() === viewMonth && today.getFullYear() === viewYear;

  const isSelected = (day: number) =>
    activeDate.getDate() === day && activeDate.getMonth() === viewMonth && activeDate.getFullYear() === viewYear;

  const handleDayClick = (day: number) => {
    const newDate = new Date(viewYear, viewMonth, day);
    setActiveDate(newDate);
    setTextInputValue(formatDateToDDMMYYYY(newDate));
    setTextInputError('');
  };

  // Direct Text Input Handler
  const handleTextInputChange = (val: string) => {
    const raw = val.replace(/\D/g, '').substring(0, 8);
    const d = raw.substring(0, 2);
    const m = raw.substring(2, 4);
    const y = raw.substring(4, 8);

    let formatted = raw;
    if (raw.length >= 5) formatted = `${d}/${m}/${y}`;
    else if (raw.length >= 3) formatted = `${d}/${m}`;

    setTextInputValue(formatted);

    if (raw.length === 8) {
      const dayNum = parseInt(d, 10);
      const monthNum = parseInt(m, 10) - 1;
      const yearNum = parseInt(y, 10);
      if (monthNum >= 0 && monthNum <= 11 && dayNum >= 1 && dayNum <= 31 && yearNum >= 2020) {
        const candidate = new Date(yearNum, monthNum, dayNum);
        setActiveDate(candidate);
        setViewYear(yearNum);
        setViewMonth(monthNum);
        setTextInputError('');
      } else {
        setTextInputError('Invalid date format');
      }
    }
  };

  // Submit / Confirm
  const handleConfirm = () => {
    if (isTextInputMode) {
      const parts = textInputValue.split('/');
      if (parts.length === 3) {
        const d = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10) - 1;
        const y = parseInt(parts[2], 10);
        if (m >= 0 && m <= 11 && d >= 1 && d <= 31 && y >= 2020) {
          onDateChange(textInputValue);
          onClose();
          return;
        }
      }
      setTextInputError('Please enter a valid DD/MM/YYYY date');
      return;
    }

    onDateChange(formatDateToDDMMYYYY(activeDate));
    onClose();
  };

  // Available years for quick pick
  const currentYear = new Date().getFullYear();
  const yearList = Array.from({ length: 12 }, (_, i) => currentYear - 1 + i);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      {/* Dialog Surface - Material 3 Dark Palette: #241814 */}
      <div
        className="relative w-full max-w-[340px] sm:max-w-[360px] bg-[#241814] rounded-[28px] shadow-2xl border border-white/5 p-6 text-[#f5ebe6] select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="space-y-1 pb-4">
          <div className="text-xs font-normal text-[#d7c2b8] tracking-wide">
            {modalTitle}
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-normal text-[#f5ebe6] tracking-tight">
              {formattedHeaderDate}
            </h2>

            {/* Pencil / Calendar Toggle Icon */}
            <button
              type="button"
              onClick={() => {
                setIsTextInputMode(!isTextInputMode);
                setShowYearMonthPicker(false);
              }}
              title={isTextInputMode ? 'Switch to calendar' : 'Edit date directly'}
              className="p-2 text-[#d7c2b8] hover:text-[#f5ebe6] hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              {isTextInputMode ? (
                <CalendarIcon className="w-5 h-5 text-[#f5a582]" />
              ) : (
                <Pencil className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Content Mode 1: Text Input Mode */}
        {isTextInputMode ? (
          <div className="py-6 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#d7c2b8] block">{labels.dateLabel}</label>
              <input
                type="text"
                autoFocus
                maxLength={10}
                value={textInputValue}
                onChange={(e) => handleTextInputChange(e.target.value)}
                placeholder="DD/MM/YYYY"
                className="w-full h-12 rounded-xl bg-[#382721] border border-white/10 px-4 text-lg font-medium text-[#f5ebe6] focus:outline-none focus:border-[#f5a582] tracking-wider"
              />
              {textInputError && (
                <p className="text-xs text-red-400 font-medium">{textInputError}</p>
              )}
            </div>
            <p className="text-xs text-[#b5a097]">
              {labels.helper}
            </p>
          </div>
        ) : showYearMonthPicker ? (
          /* Content Mode 2: Quick Year & Month Selector */
          <div className="py-2 space-y-4 max-h-[310px] overflow-y-auto pr-1">
            <div>
              <div className="text-xs font-semibold text-[#d7c2b8] mb-2 uppercase tracking-wider">{labels.selectYear}</div>
              <div className="grid grid-cols-4 gap-2">
                {yearList.map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setViewYear(y)}
                    className={`py-1.5 px-2 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                      viewYear === y
                        ? 'bg-[#f5a582] text-[#241814] font-bold'
                        : 'bg-[#382721] text-[#f5ebe6] hover:bg-[#4a342c]'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-[#d7c2b8] mb-2 uppercase tracking-wider">{labels.selectMonth}</div>
              <div className="grid grid-cols-3 gap-2">
                {fullMonths.map((mName, mIdx) => (
                  <button
                    key={mName}
                    type="button"
                    onClick={() => {
                      setViewMonth(mIdx);
                      setShowYearMonthPicker(false);
                    }}
                    className={`py-1.5 px-2 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                      viewMonth === mIdx
                        ? 'bg-[#f5a582] text-[#241814] font-bold'
                        : 'bg-[#382721] text-[#f5ebe6] hover:bg-[#4a342c]'
                    }`}
                  >
                    {shortMonths[mIdx]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Content Mode 3: Visual Calendar Grid */
          <div>
            {/* Month-Year Selector & Navigation Arrows */}
            <div className="flex items-center justify-between pb-3">
              {/* Dropdown Pill: e.g. "October 2026 ▼" */}
              <button
                type="button"
                onClick={() => setShowYearMonthPicker(true)}
                className="bg-[#382721] hover:bg-[#4a342c] text-[#f5ebe6] text-sm font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{`${fullMonths[viewMonth]} ${viewYear}`}</span>
                <ChevronDown className="w-4 h-4 text-[#d7c2b8]" />
              </button>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  aria-label="Previous Month"
                  className="p-1.5 text-[#d7c2b8] hover:text-[#f5ebe6] hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  aria-label="Next Month"
                  className="p-1.5 text-[#d7c2b8] hover:text-[#f5ebe6] hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Weekdays Row: M T W T F S S */}
            <div className="grid grid-cols-7 text-center py-2">
              {weekdays.map((w, idx) => (
                <div key={idx} className="text-xs font-medium text-[#b5a097]">
                  {w}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-y-1.5 text-center items-center justify-items-center py-1">
              {/* Empty leading cells */}
              {Array.from({ length: startOffset }).map((_, i) => (
                <div key={`empty-${i}`} className="w-9 h-9" />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const dayNum = i + 1;
                const selected = isSelected(dayNum);
                const current = isToday(dayNum);

                return (
                  <button
                    key={dayNum}
                    type="button"
                    onClick={() => handleDayClick(dayNum)}
                    className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-normal transition-all duration-150 cursor-pointer ${
                      selected
                        ? 'bg-[#f5a582] text-[#241814] font-bold shadow-md scale-105'
                        : current
                        ? 'border border-[#f5a582] text-[#f5a582] font-medium hover:bg-white/10'
                        : 'text-[#f5ebe6] hover:bg-white/10'
                    }`}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Actions: Cancel & OK */}
        <div className="flex items-center justify-end gap-2 pt-4 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-[#f5a582] hover:bg-white/5 rounded-full transition-colors cursor-pointer"
          >
            {labels.cancel}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-2 text-sm font-medium text-[#f5a582] hover:bg-white/5 rounded-full transition-colors cursor-pointer"
          >
            {labels.ok}
          </button>
        </div>
      </div>
    </div>
  );
};
