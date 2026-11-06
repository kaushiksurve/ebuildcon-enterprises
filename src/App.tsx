import React, { useState, useEffect } from 'react';
import { useLanguage } from './hooks/useLanguage';
import { useOrders } from './hooks/useOrders';
import { useUserAuth } from './hooks/useUserAuth';
import { getLocalizedProducts } from './data/products';
import { registerServiceWorker } from './utils/notification';

// Components
import { LoginPage } from './components/LoginPage';
import { UserProfileModal } from './components/UserProfileModal';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { WhyChooseUs } from './components/WhyChooseUs';
import { BrochureViewer } from './components/BrochureViewer';
import { BlockCalculator } from './components/BlockCalculator';
import { VehicleFleet } from './components/VehicleFleet';
import { OrderCtaSection } from './components/OrderCtaSection';
import { OrderBuilder } from './components/OrderBuilder';
import { MyOrders } from './components/MyOrders';
import { CompanyPanel } from './components/CompanyPanel';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Toast, ToastMessage } from './components/Toast';

export function App() {
  const { lang, setLang, t } = useLanguage();
  const {
    currentUser,
    isLoggedIn,
    login,
    signup,
    logout,
    updateProfile
  } = useUserAuth();

  const {
    orders,
    addOrder,
    updateOrderStatus,
    updateOrderDate,
    updateOrderLocation,
    deleteOrder,
    clearAllOrders
  } = useOrders();

  const [activeTab, setActiveTab] = useState<'brochure' | 'order' | 'myorders' | 'company'>('brochure');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [initialBlockSelection, setInitialBlockSelection] = useState<{ inch: string; qty: number } | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Get dynamic localized products based on currently selected language
  const products = getLocalizedProducts(lang);
  const selectedProduct = selectedProductId ? products.find(p => p.id === selectedProductId) || null : null;

  // Register Service Worker on initial load
  useEffect(() => {
    registerServiceWorker();
  }, []);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Scroll to section helper
  const handleScrollToSection = (sectionId: string) => {
    if (activeTab !== 'brochure') {
      setActiveTab('brochure');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Bridge from Block Calculator directly into Order Form
  const handleApplyBlockToOrder = (inch: string, qty: number) => {
    setInitialBlockSelection({ inch, qty });
    setActiveTab('order');
    showToast(`${t.toast_block_applied} (${inch}, ${qty})`, 'success');
  };

  // Bridge from Product Card to Order Form
  const handleAddProductToOrder = (_productId: string) => {
    setActiveTab('order');
    showToast(t.toast_product_selected, 'info');
  };

  // If user is not signed in / logged in, require sign in / login first
  if (!isLoggedIn || !currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 antialiased font-devanagari">
        <LoginPage
          t={t}
          lang={lang}
          setLang={(l) => {
            setLang(l);
            showToast(t.lang_saved, 'success');
          }}
          onLogin={(phone, pin, remember) => {
            const res = login(phone, pin, remember);
            if (res.success) {
              showToast(`${t.auth_welcome_back}!`, 'success');
            }
            return res;
          }}
          onSignup={(data) => {
            const res = signup(data);
            if (res.success) {
              showToast(`${t.auth_welcome_back} ${data.name}!`, 'success');
            }
            return res;
          }}
        />
        <Toast toasts={toasts} onDismiss={handleDismissToast} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-devanagari overflow-x-hidden">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={(l) => {
          setLang(l);
          showToast(t.lang_saved, 'success');
        }}
        t={t}
        ordersCount={orders.length}
        currentUser={currentUser}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onLogout={() => {
          logout();
          showToast(t.auth_logout_btn, 'info');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* TAB 1: BROCHURE & COMPLETE HOMEPAGE JOURNEY */}
        {activeTab === 'brochure' && (
          <div className="space-y-12 md:space-y-16 pb-16">
            {/* Hero Section */}
            <Hero
              t={t}
              onNavigateTab={setActiveTab}
              onScrollToSection={handleScrollToSection}
            />

            <div className="max-w-7xl mx-auto px-4 space-y-12 md:space-y-16">
              {/* Products Section */}
              <section id="products-section" className="scroll-mt-24 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      {t.prod_title}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      {t.prod_subtitle}
                    </p>
                  </div>
                  <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {t.no_price_badge}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map(prod => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      t={t}
                      onViewDetails={(p) => setSelectedProductId(p.id)}
                      onAddToOrder={handleAddProductToOrder}
                    />
                  ))}
                </div>
              </section>

              {/* Why Choose Us */}
              <WhyChooseUs t={t} />

              {/* Brochure Section */}
              <section id="brochure-section" className="scroll-mt-24">
                <BrochureViewer t={t} lang={lang} />
              </section>

              {/* AAC Block Size Calculator & Chart */}
              <section id="calculator-section" className="scroll-mt-24">
                <BlockCalculator
                  t={t}
                  lang={lang}
                  onApplyToOrder={handleApplyBlockToOrder}
                />
              </section>

              {/* Vehicles Fleet */}
              <section id="vehicles-section" className="scroll-mt-24">
                <VehicleFleet t={t} lang={lang} />
              </section>

              {/* Order Call to Action Banner */}
              <OrderCtaSection
                t={t}
                onNavigateToOrder={() => setActiveTab('order')}
              />

              {/* Contact Section */}
              <ContactSection t={t} />
            </div>
          </div>
        )}

        {/* TAB 2: ORDER BUILDER */}
        {activeTab === 'order' && (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <OrderBuilder
              t={t}
              lang={lang}
              currentUser={currentUser}
              onOrderPlaced={(newOrd) => {
                addOrder(newOrd);
                showToast(t.toast_order_placed, 'success');
              }}
              onNavigateToMyOrders={() => setActiveTab('myorders')}
              initialBlockSelection={initialBlockSelection}
            />
          </div>
        )}

        {/* TAB 3: MY ORDERS */}
        {activeTab === 'myorders' && (
          <div className="max-w-5xl mx-auto px-4 py-8">
            <MyOrders
              orders={orders}
              t={t}
              lang={lang}
              currentUser={currentUser}
              onDeleteOrder={(id) => {
                deleteOrder(id);
                showToast(t.toast_order_deleted, 'info');
              }}
              onClearAll={() => {
                clearAllOrders();
                showToast(t.toast_orders_cleared, 'info');
              }}
              onNavigateToNewOrder={() => setActiveTab('order')}
            />
          </div>
        )}

        {/* TAB 4: COMPANY PANEL */}
        {activeTab === 'company' && (
          <div className="max-w-5xl mx-auto px-4 py-8">
            <CompanyPanel
              orders={orders}
              t={t}
              lang={lang}
              currentUser={currentUser}
              onUpdateOrderStatus={(id, status, driverInfo) => {
                updateOrderStatus(id, status, driverInfo);
                showToast(`${t.toast_status_updated}: ${status}`, 'success');
              }}
              onUpdateOrderDate={(id, newDate) => {
                updateOrderDate(id, newDate);
                showToast(`${t.toast_date_updated}: ${newDate}`, 'success');
              }}
              onUpdateOrderLocation={(id, newLoc) => {
                updateOrderLocation(id, newLoc);
                showToast(`${t.toast_location_updated}: ${newLoc}`, 'success');
              }}
            />
          </div>
        )}
      </main>

      {/* User Profile Modal */}
      {currentUser && (
        <UserProfileModal
          user={currentUser}
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          onUpdateProfile={(updates) => {
            updateProfile(updates);
            showToast(t.auth_profile_updated, 'success');
          }}
          onLogout={logout}
          ordersCount={
            orders.filter(
              o =>
                o.userId === currentUser.id ||
                o.phone.replace(/\D/g, '').slice(-10) === currentUser.phone.replace(/\D/g, '').slice(-10)
            ).length
          }
          t={t}
          lang={lang}
        />
      )}

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        t={t}
        onClose={() => setSelectedProductId(null)}
        onAddToOrder={(id) => {
          handleAddProductToOrder(id);
        }}
      />

      {/* Footer */}
      <Footer t={t} onNavigateTab={setActiveTab} />

      {/* Toasts */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
export default App;
