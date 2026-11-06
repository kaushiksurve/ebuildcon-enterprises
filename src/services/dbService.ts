import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';
import { Order, OrderStatus, UserProfile } from '../types';
import {
  loadOrders,
  saveOrders,
  loadRegisteredUsers,
  saveRegisteredUsers,
  DEFAULT_FACTORY_ORDERS,
  DEFAULT_USERS
} from '../utils/storage';

const ORDERS_COLLECTION = 'orders';
const USERS_COLLECTION = 'users';

/**
 * Sanitizes payloads to strip any undefined values before sending to Firestore,
 * preventing 'Unsupported field value: undefined' errors.
 */
function cleanFirestorePayload<T extends Record<string, any>>(obj: T): T {
  const cleaned: Record<string, any> = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val !== undefined) {
      if (Array.isArray(val)) {
        cleaned[key] = val.map(item =>
          typeof item === 'object' && item !== null ? cleanFirestorePayload(item) : item
        );
      } else if (typeof val === 'object' && val !== null) {
        cleaned[key] = cleanFirestorePayload(val);
      } else {
        cleaned[key] = val;
      }
    }
  }
  return cleaned as T;
}

// ============================================================================
// ORDERS CLOUD SYNCHRONIZATION
// ============================================================================

/**
 * Subscribes to real-time order updates across all connected devices.
 * If Firebase is configured, listens via onSnapshot from Cloud Firestore.
 * If running offline/locally, listens to storage events and initial local data.
 */
export function subscribeOrders(callback: (orders: Order[]) => void): () => void {
  if (isFirebaseConfigured() && db) {
    try {
      const ordersRef = collection(db, ORDERS_COLLECTION);
      const q = query(ordersRef, orderBy('id', 'desc'));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const cloudOrders: Order[] = [];
            snapshot.forEach((docSnap) => {
              const data = docSnap.data() as Order;
              cloudOrders.push({ ...data, id: Number(data.id) });
            });
            // Cache locally for offline availability
            saveOrders(cloudOrders);
            callback(cloudOrders);
          } else {
            // First time seeding if database is empty
            const initial = loadOrders();
            if (initial.length > 0) {
              initial.forEach((ord) => {
                const docRef = doc(db!, ORDERS_COLLECTION, String(ord.id));
                setDoc(docRef, cleanFirestorePayload(ord)).catch(console.error);
              });
              callback(initial);
            } else {
              callback(DEFAULT_FACTORY_ORDERS);
            }
          }
        },
        (error) => {
          console.warn('⚠️ [E-Buildcon DB] Firestore onSnapshot error, falling back to local storage:', error);
          callback(loadOrders());
        }
      );

      return unsubscribe;
    } catch (err) {
      console.warn('⚠️ [E-Buildcon DB] Error setting up orders snapshot:', err);
    }
  }

  // Local Resilience Mode
  callback(loadOrders());
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === 'ebuild_final_perfect_v10') {
      callback(loadOrders());
    }
  };
  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
}

/**
 * Creates or places a new order and syncs it to Cloud Firestore.
 */
export async function createOrderInDb(newOrder: Order): Promise<Order> {
  // Update local storage immediately for responsive UI
  const currentOrders = loadOrders();
  const updatedOrders = [newOrder, ...currentOrders.filter((o) => o.id !== newOrder.id)];
  saveOrders(updatedOrders);

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, ORDERS_COLLECTION, String(newOrder.id));
      await setDoc(docRef, cleanFirestorePayload(newOrder));
      console.log(`✅ [E-Buildcon Cloud DB] Order #EB-${newOrder.id} saved to Firestore.`);
    } catch (err) {
      console.error('❌ [E-Buildcon Cloud DB] Failed to save order to Firestore:', err);
    }
  }

  return newOrder;
}

/**
 * Updates status of an order in Cloud Firestore.
 */
export async function updateOrderStatusInDb(
  orderId: number,
  status: OrderStatus,
  driverInfo?: { driverName: string; driverPhone: string; vehicleType: string }
): Promise<void> {
  const currentOrders = loadOrders();
  const updatedOrders = currentOrders.map((o) =>
    o.id === orderId
      ? {
          ...o,
          status,
          ...(driverInfo || {})
        }
      : o
  );
  saveOrders(updatedOrders);

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, ORDERS_COLLECTION, String(orderId));
      const payload: Partial<Order> = { status };
      if (driverInfo) {
        payload.driverName = driverInfo.driverName;
        payload.driverPhone = driverInfo.driverPhone;
        payload.vehicleType = driverInfo.vehicleType;
      }
      await setDoc(docRef, cleanFirestorePayload(payload), { merge: true });
    } catch (err) {
      console.error(`❌ [E-Buildcon Cloud DB] Failed to update status for order #EB-${orderId}:`, err);
    }
  }
}

/**
 * Updates delivery date of an order in Cloud Firestore.
 */
export async function updateOrderDateInDb(orderId: number, newDate: string): Promise<void> {
  const currentOrders = loadOrders();
  const updatedOrders = currentOrders.map((o) => {
    if (o.id === orderId) {
      return {
        ...o,
        origDate: o.origDate || o.date,
        date: newDate
      };
    }
    return o;
  });
  saveOrders(updatedOrders);

  if (isFirebaseConfigured() && db) {
    try {
      const target = updatedOrders.find((o) => o.id === orderId);
      if (target) {
        const docRef = doc(db, ORDERS_COLLECTION, String(orderId));
        await setDoc(
          docRef,
          cleanFirestorePayload({
            date: newDate,
            origDate: target.origDate
          }),
          { merge: true }
        );
      }
    } catch (err) {
      console.error(`❌ [E-Buildcon Cloud DB] Failed to update date for order #EB-${orderId}:`, err);
    }
  }
}

/**
 * Updates delivery location of an order in Cloud Firestore.
 */
export async function updateOrderLocationInDb(orderId: number, newLocation: string): Promise<void> {
  const currentOrders = loadOrders();
  const updatedOrders = currentOrders.map((o) => {
    if (o.id === orderId) {
      return {
        ...o,
        origDel: o.origDel || o.del,
        del: newLocation
      };
    }
    return o;
  });
  saveOrders(updatedOrders);

  if (isFirebaseConfigured() && db) {
    try {
      const target = updatedOrders.find((o) => o.id === orderId);
      if (target) {
        const docRef = doc(db, ORDERS_COLLECTION, String(orderId));
        await setDoc(
          docRef,
          cleanFirestorePayload({
            del: newLocation,
            origDel: target.origDel
          }),
          { merge: true }
        );
      }
    } catch (err) {
      console.error(`❌ [E-Buildcon Cloud DB] Failed to update location for order #EB-${orderId}:`, err);
    }
  }
}

/**
 * Deletes an order from Cloud Firestore.
 */
export async function deleteOrderFromDb(orderId: number): Promise<void> {
  const currentOrders = loadOrders();
  saveOrders(currentOrders.filter((o) => o.id !== orderId));

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, ORDERS_COLLECTION, String(orderId));
      await deleteDoc(docRef);
    } catch (err) {
      console.error(`❌ [E-Buildcon Cloud DB] Failed to delete order #EB-${orderId}:`, err);
    }
  }
}

/**
 * Clears all orders.
 */
export async function clearAllOrdersFromDb(): Promise<void> {
  saveOrders([]);

  if (isFirebaseConfigured() && db) {
    try {
      const ordersRef = collection(db, ORDERS_COLLECTION);
      const snapshot = await getDocs(ordersRef);
      const batchPromises = snapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
      await Promise.all(batchPromises);
    } catch (err) {
      console.error('❌ [E-Buildcon Cloud DB] Failed to clear orders in Firestore:', err);
    }
  }
}

// ============================================================================
// BUILDERS / USERS CLOUD SYNCHRONIZATION
// ============================================================================

/**
 * Subscribes to real-time builder profile updates.
 */
export function subscribeUsers(callback: (users: UserProfile[]) => void): () => void {
  if (isFirebaseConfigured() && db) {
    try {
      const usersRef = collection(db, USERS_COLLECTION);
      const unsubscribe = onSnapshot(
        usersRef,
        (snapshot) => {
          if (!snapshot.empty) {
            const cloudUsers: UserProfile[] = [];
            snapshot.forEach((docSnap) => {
              cloudUsers.push(docSnap.data() as UserProfile);
            });
            saveRegisteredUsers(cloudUsers);
            callback(cloudUsers);
          } else {
            const initial = loadRegisteredUsers();
            if (initial.length > 0) {
              initial.forEach((u) => {
                const docRef = doc(db!, USERS_COLLECTION, u.id);
                setDoc(docRef, cleanFirestorePayload(u)).catch(console.error);
              });
              callback(initial);
            } else {
              callback(DEFAULT_USERS);
            }
          }
        },
        (error) => {
          console.warn('⚠️ [E-Buildcon DB] Users onSnapshot error, falling back to local users:', error);
          callback(loadRegisteredUsers());
        }
      );
      return unsubscribe;
    } catch (err) {
      console.warn('⚠️ [E-Buildcon DB] Error setting up users snapshot:', err);
    }
  }

  callback(loadRegisteredUsers());
  return () => {};
}

/**
 * Saves or updates a builder profile in Cloud Firestore.
 */
export async function saveUserToDb(user: UserProfile): Promise<void> {
  const current = loadRegisteredUsers();
  const updated = [user, ...current.filter((u) => u.id !== user.id)];
  saveRegisteredUsers(updated);

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, USERS_COLLECTION, user.id);
      await setDoc(docRef, cleanFirestorePayload(user), { merge: true });
      console.log(`✅ [E-Buildcon Cloud DB] User ${user.name} (${user.phone}) saved to Firestore.`);
    } catch (err) {
      console.error('❌ [E-Buildcon Cloud DB] Failed to save user in Firestore:', err);
    }
  }
}
