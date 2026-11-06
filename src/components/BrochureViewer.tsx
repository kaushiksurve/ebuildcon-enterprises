import React, { useState } from 'react';
import { getLocalizedBrochure } from '../data/brochure';
import { TranslationDictionary } from '../data/translations';
import { Language } from '../types';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Grid,
  Layers,
  Download,
  X
} from 'lucide-react';

interface BrochureViewerProps {
  t: TranslationDictionary;
  lang: Language;
}

export const BrochureViewer: React.FC<BrochureViewerProps> = ({ t, lang }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'book' | 'gallery'>('book');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const pages = getLocalizedBrochure(lang);
  const currentPage = pages[currentPageIndex] || pages[0];

  const allImages = pages.flatMap(p =>
    p.images.map(img => ({ ...img, pageNumber: p.pageNumber, pageTitle: p.title }))
  );

  const handlePrev = () => {
    setCurrentPageIndex(prev => (prev > 0 ? prev - 1 : pages.length - 1));
    setZoomLevel(1);
  };

  const handleNext = () => {
    setCurrentPageIndex(prev => (prev < pages.length - 1 ? prev + 1 : 0));
    setZoomLevel(1);
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-md space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-900 flex items-center justify-center font-black">
              <BookOpen className="w-5 h-5 text-indigo-700" />
            </div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              {t.brochure_header_title}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t.brochure_header_sub}
          </p>
        </div>

        {/* View Mode Toggle & Counter */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1">
            <button
              type="button"
              onClick={() => setViewMode('book')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-colors ${
                viewMode === 'book' ? 'bg-white text-indigo-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t.brochure_tab_book}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('gallery')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-colors ${
                viewMode === 'gallery' ? 'bg-white text-indigo-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>{t.brochure_tab_gallery}</span>
            </button>
          </div>

          <a
            href={pages[0]?.images[0]?.src || '/brochure/page1_img0.jpg'}
            download="E-Buildcon-Brochure-Cover.jpg"
            className="h-9 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.brochure_download_btn}</span>
          </a>
        </div>
      </div>

      {/* VIEW MODE: BOOK / PAGE BY PAGE */}
      {viewMode === 'book' && (
        <div className="space-y-4">
          {/* Main Display Area */}
          <div className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800 min-h-[420px] sm:min-h-[580px] flex flex-col justify-between">
            {/* Top Bar inside Viewer */}
            <div className="bg-slate-950/80 backdrop-blur-md px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between text-white border-b border-white/10 z-10 gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                <span className="bg-amber-400 text-slate-950 text-[10px] sm:text-xs font-black px-2 sm:px-2.5 py-0.5 rounded-full shrink-0">
                  {t.brochure_page_label} {currentPage.pageNumber} / {pages.length}
                </span>
                <span className="text-xs font-bold text-slate-200 truncate max-w-[100px] sm:max-w-xs md:max-w-md">
                  {currentPage.title}
                </span>
              </div>

              {/* Zoom & Fullscreen Controls */}
              <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  title="Zoom Out"
                  className="p-1 sm:p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <span className="text-[11px] sm:text-xs font-mono px-1 text-slate-300 hidden sm:inline">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  title="Zoom In"
                  className="p-1 sm:p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  title="Reset Zoom"
                  className="p-1 sm:p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxImage(currentPage.images[0].src)}
                  title="Fullscreen"
                  className="p-1 sm:p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors ml-0.5 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Content Body: Page Images */}
            <div className="flex-1 p-4 sm:p-6 flex items-center justify-center overflow-auto">
              {currentPage.pageNumber === 10 ? (
                // Special handling for Page 10 (12 icons/photos)
                <div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full max-w-4xl transition-transform duration-200"
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
                >
                  {currentPage.images.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLightboxImage(img.src)}
                      className="bg-white rounded-2xl overflow-hidden p-2 border border-slate-200 shadow-md cursor-pointer hover:shadow-xl transition-all group"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-28 object-contain group-hover:scale-105 transition-transform"
                      />
                      <div className="text-[10px] text-center font-bold text-slate-700 mt-2 truncate">
                        {img.caption}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="relative max-w-3xl w-full flex flex-col items-center justify-center transition-transform duration-200 cursor-zoom-in"
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
                  onClick={() => setLightboxImage(currentPage.images[0].src)}
                >
                  <img
                    src={currentPage.images[0].src}
                    alt={currentPage.images[0].alt}
                    className="max-h-[500px] w-auto object-contain rounded-2xl shadow-2xl border border-white/10"
                  />
                  <p className="text-xs text-center text-slate-300 font-bold mt-3">
                    {currentPage.description}
                  </p>
                </div>
              )}
            </div>

            {/* Navigation Bottom Controls */}
            <div className="bg-slate-950/80 backdrop-blur-md px-4 py-3 flex items-center justify-between text-white border-t border-white/10">
              <button
                type="button"
                onClick={handlePrev}
                className="h-10 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-black flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t.brochure_prev_btn}</span>
              </button>

              <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 font-bold">
                <span>{currentPage.description}</span>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="h-10 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center gap-1.5 transition-colors shadow-md"
              >
                <span>{t.brochure_next_btn}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Thumbnail Slider Bar */}
          <div className="flex gap-2 overflow-x-auto py-2 px-1 scrollbar-thin">
            {pages.map((page, idx) => {
              const isSelected = currentPageIndex === idx;
              return (
                <button
                  key={page.pageNumber}
                  type="button"
                  onClick={() => {
                    setCurrentPageIndex(idx);
                    setZoomLevel(1);
                  }}
                  className={`shrink-0 w-20 sm:w-24 rounded-xl overflow-hidden border-2 text-left transition-all ${
                    isSelected
                      ? 'border-indigo-600 ring-2 ring-indigo-400 scale-105 shadow-md'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="h-14 bg-slate-100 overflow-hidden flex items-center justify-center">
                    <img
                      src={page.images[0].src}
                      alt={page.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-slate-900 text-white p-1 text-[10px] font-black text-center truncate">
                    {t.brochure_page_label} {page.pageNumber}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW MODE: GALLERY OF ALL 23 PHOTOS */}
      {viewMode === 'gallery' && (
        <div className="space-y-6">
          <div className="bg-blue-50/70 p-3 rounded-2xl border border-blue-100 flex items-center justify-between text-xs text-blue-900 font-bold">
            <span>{t.brochure_all_photos_note}</span>
            <span className="text-indigo-700">{t.brochure_total_photos}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allImages.map((img, i) => (
              <div
                key={i}
                onClick={() => setLightboxImage(img.src)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative h-44 bg-slate-100 overflow-hidden flex items-center justify-center">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {t.brochure_page_label} {img.pageNumber}
                  </span>
                  <div className="absolute inset-0 bg-indigo-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="w-6 h-6 text-white drop-shadow" />
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                  <div className="text-xs font-black text-slate-800 truncate">{img.caption}</div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                    {img.src.replace('/brochure/', '')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-[90vh] overflow-auto flex items-center justify-center p-2">
            <img
              src={lightboxImage}
              alt="Brochure Fullscreen"
              className="max-h-[85vh] w-auto object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
