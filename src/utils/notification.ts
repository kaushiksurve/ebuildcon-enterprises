export interface NotificationStatus {
  isSupported: boolean;
  permission: NotificationPermission;
  hasServiceWorker: boolean;
}

export function checkNotificationSupport(): NotificationStatus {
  const isSupported = typeof window !== 'undefined' && 'Notification' in window;
  const hasServiceWorker = typeof navigator !== 'undefined' && 'serviceWorker' in navigator;
  const permission = isSupported ? Notification.permission : 'denied';

  return {
    isSupported,
    permission,
    hasServiceWorker
  };
}

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully:', reg.scope);
      return reg;
    } catch (e) {
      console.warn('Service Worker registration skipped or failed:', e);
      return null;
    }
  }
  return null;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    alert('या ब्राउझरमध्ये Web Notifications उपलब्ध नाहीत.');
    return 'denied';
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      sendLocalNotification(
        'E BUILDCON ENTERPRISES - Notifications Active',
        'नवीन ऑर्डर आल्यावर बॅकग्राउंड मध्ये अलर्ट मिळेल!'
      );
    }
    return permission;
  } catch (e) {
    console.error('Error requesting notification permission:', e);
    return 'denied';
  }
}

export function sendLocalNotification(title: string, body: string, url: string = '/') {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  try {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then(reg => {
        reg.showNotification(title, {
          body,
          icon: '/brochure/page10_img1.jpg',
          badge: '/brochure/page10_img1.jpg',
          data: { url }
        });
      });
    } else {
      new Notification(title, {
        body,
        icon: '/brochure/page10_img1.jpg'
      });
    }
  } catch (e) {
    console.error('Failed to trigger notification:', e);
  }
}
