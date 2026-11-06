import { Order, Language, UserProfile } from '../types';

const ORDERS_KEY = 'ebuild_final_perfect_v10';
const LANG_KEY = 'ebuild_lang';
const USERS_KEY = 'ebuild_registered_users_v1';
const ACTIVE_USER_KEY = 'ebuild_active_user_v1';

export const DEFAULT_USERS: UserProfile[] = [
  {
    id: 'usr_9819927174',
    name: 'Ramesh Builders',
    phone: '9819927174',
    pin: '1234',
    supervisorName: 'Sunil Patil',
    supervisorPhone: '9876543210',
    siteAddress: 'Plot 14, Vasai West, Near Station',
    deliveryLocation: 'Vasai Road, Vasai, Palghar - 401207',
    rememberMe: true,
    createdAt: '2026-10-01T10:00:00.000Z',
    lastLoginAt: new Date().toISOString()
  },
  {
    id: 'usr_9359162253',
    name: 'Patil Traders & Constructions',
    phone: '9359162253',
    pin: '1234',
    supervisorName: 'Dinesh Sharma',
    supervisorPhone: '9356709489',
    siteAddress: 'Sector 5, Nalasopara East, Golden Nest',
    deliveryLocation: 'Nalasopara East, Palghar - 401209',
    rememberMe: true,
    createdAt: '2026-10-05T12:00:00.000Z',
    lastLoginAt: new Date().toISOString()
  },
  {
    id: 'usr_09067720256',
    name: 'Kaushik Enterprises & Developers',
    phone: '09067720256',
    pin: '1234',
    supervisorName: 'Dinesh',
    supervisorPhone: '9356709489',
    siteAddress: 'Khandipada Road, Kaman, Vasai East',
    deliveryLocation: 'Kaman, Vasai East, Palghar - 401202',
    rememberMe: true,
    createdAt: '2026-10-10T15:00:00.000Z',
    lastLoginAt: new Date().toISOString()
  }
];

export const DEFAULT_FACTORY_ORDERS: Order[] = [
  {
    id: 101,
    userId: 'usr_9819927174',
    name: 'Ramesh Builders',
    phone: '9819927174',
    supName: 'Sunil Patil',
    supPhone: '9876543210',
    site: 'Plot 14, Vasai West, Near Railway Station',
    del: 'Vasai Road, Vasai, Palghar - 401207',
    maps: 'https://www.google.com/maps?q=19.380398,72.828974',
    date: '06/11/2026',
    items: [
      { id: 'item_101_1', type: 'block', prod: 'block', name: 'AAC Block 6"', inch: '6"', qty: 800, cbm: '14.55', cbmVal: 14.55, per: 55 },
      { id: 'item_101_2', type: 'other', prod: 'plaster', name: 'ReadyMix Plaster', qty: 20 }
    ],
    tot: '14.55 CBM (800 Pcs) + 20 Bag ReadyMix Plaster',
    status: 'Dispatched',
    createdAt: '2026-11-02T10:30:00.000Z',
    driverName: 'Raju Yadav',
    driverPhone: '9823456781',
    vehicleType: 'Truck 13T (18 CBM)'
  },
  {
    id: 102,
    userId: 'usr_9359162253',
    name: 'Patil Traders & Constructions',
    phone: '9359162253',
    supName: 'Dinesh Sharma',
    supPhone: '9356709489',
    site: 'Sector 5, Nalasopara East, Golden Nest',
    del: 'Nalasopara East, Palghar - 401209',
    maps: 'https://www.google.com/maps?q=19.4183,72.8125',
    date: '08/11/2026',
    items: [
      { id: 'item_102_1', type: 'block', prod: 'block', name: 'AAC Block 4"', inch: '4"', qty: 1100, cbm: '13.75', cbmVal: 13.75, per: 80 },
      { id: 'item_102_2', type: 'other', prod: 'mortar', name: 'Block Jointing Mortar', qty: 15 }
    ],
    tot: '13.75 CBM (1100 Pcs) + 15 Bag Block Mortar',
    status: 'Confirmed',
    createdAt: '2026-11-03T09:15:00.000Z'
  },
  {
    id: 103,
    userId: 'usr_09067720256',
    name: 'Kaushik Enterprises & Developers',
    phone: '09067720256',
    supName: 'Dinesh',
    supPhone: '9356709489',
    site: 'Khandipada Road, Kaman, Vasai East',
    del: 'Kaman, Vasai East, Palghar - 401202',
    maps: 'https://www.google.com/maps?q=19.380262,72.828822',
    date: '09/11/2026',
    items: [
      { id: 'item_103_1', type: 'block', prod: 'block', name: 'AAC Block 8"', inch: '8"', qty: 400, cbm: '10.00', cbmVal: 10.00, per: 40 }
    ],
    tot: '10.00 CBM (400 Pcs)',
    status: 'Pending',
    createdAt: '2026-11-03T14:45:00.000Z'
  }
];

export function loadRegisteredUsers(): UserProfile[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_USERS;
  } catch (e) {
    console.error('Error loading registered users:', e);
    return DEFAULT_USERS;
  }
}

export function saveRegisteredUsers(users: UserProfile[]): void {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Error saving registered users:', e);
  }
}

export function loadActiveUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(ACTIVE_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading active user session:', e);
    return null;
  }
}

export function saveActiveUser(user: UserProfile | null): void {
  try {
    if (user) {
      localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(ACTIVE_USER_KEY);
    }
  } catch (e) {
    console.error('Error saving active user session:', e);
  }
}

export function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) {
      // Seed default active factory orders
      localStorage.setItem(ORDERS_KEY, JSON.stringify(DEFAULT_FACTORY_ORDERS));
      return DEFAULT_FACTORY_ORDERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_FACTORY_ORDERS;
  } catch (e) {
    console.error('Error loading orders from localStorage:', e);
    return DEFAULT_FACTORY_ORDERS;
  }
}

export function saveOrders(orders: Order[]): void {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Error saving orders to localStorage:', e);
  }
}

export function loadLanguage(): Language {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'mr' || saved === 'en' || saved === 'hi') {
      return saved;
    }
  } catch (e) {
    console.error('Error loading language from localStorage:', e);
  }
  return 'mr'; // default Marathi
}

export function saveLanguage(lang: Language): void {
  try {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
  } catch (e) {
    console.error('Error saving language to localStorage:', e);
  }
}
