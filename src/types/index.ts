export type Language = 'mr' | 'en' | 'hi';

export type ProductType = 'block' | 'plaster' | 'mortar' | 'adhesive';

export interface BlockSizeInfo {
  inch: string;
  inchNum: number;
  mm: string;
  perCbm: number;
  description?: string;
}

export interface ProductInfo {
  id: ProductType;
  name: string;
  category: string;
  packageSize: string;
  coverage: string;
  features: string[];
  description: string;
  badge?: string;
  image: string;
  infoNote: string;
}

export interface OrderItem {
  id: string;
  type: 'block' | 'other';
  prod: ProductType;
  name: string;
  icon?: string;
  inch?: string;
  qty: number;
  per?: number;
  cbm?: string;
  cbmVal?: number;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Dispatched' | 'Delivered' | 'Cancelled';

export interface UserProfile {
  id: string; // e.g. "usr_9819927174"
  name: string; // Shop / Builder Name
  phone: string; // Primary Mobile Number (10 digits)
  pin: string; // Security PIN (e.g. "1234")
  supervisorName?: string;
  supervisorPhone?: string;
  siteAddress?: string;
  deliveryLocation?: string;
  rememberMe?: boolean;
  createdAt: string;
  lastLoginAt: string;
}

export interface Order {
  id: number;
  userId?: string; // Associated User ID
  name: string; // Party / Shop / Builder Name
  supName: string; // Site Supervisor Name
  supPhone: string; // Supervisor Phone
  phone: string; // Party Phone
  site: string; // Site Address
  del?: string; // Delivery Location (Optional)
  origDel?: string; // Original Delivery Location if edited
  maps?: string; // Google Maps Link (Optional)
  date: string; // Required Delivery Date DD/MM/YYYY
  origDate?: string; // Original Date if edited
  items: OrderItem[];
  tot: string; // Summary string e.g. "6" 800नग 14.55CBM + ReadyMix Plaster 10Bag"
  status: OrderStatus;
  createdAt?: string;
  driverName?: string;
  driverPhone?: string;
  vehicleType?: string;
}

export interface Vehicle {
  name: string;
  type: string;
  capacityTon: string;
  cbmCapacity: number;
  description: string;
  badge?: string;
  icon: string;
}

export interface BrochurePage {
  pageNumber: number;
  title: string;
  description: string;
  images: {
    src: string;
    caption: string;
    alt: string;
  }[];
}

export interface GeolocationState {
  loading: boolean;
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  mapsUrl: string | null;
  addressSummary: string | null;
  placeName?: string | null;
  statusMessage: string;
  statusCode: 'idle' | 'loading' | 'success' | 'denied' | 'gps_off' | 'timeout' | 'error';
}
