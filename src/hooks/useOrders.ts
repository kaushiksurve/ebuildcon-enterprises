import { useState, useEffect, useCallback } from 'react';
import { Order, OrderStatus } from '../types';
import { loadOrders } from '../utils/storage';
import {
  subscribeOrders,
  createOrderInDb,
  updateOrderStatusInDb,
  updateOrderDateInDb,
  updateOrderLocationInDb,
  deleteOrderFromDb,
  clearAllOrdersFromDb
} from '../services/dbService';
import { isFirebaseConfigured } from '../config/firebase';
import { sendLocalNotification } from '../utils/notification';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(() => loadOrders());
  const [isCloudSync, setIsCloudSync] = useState<boolean>(() => isFirebaseConfigured());

  // Real-time synchronization: listens to Cloud Firestore (or local storage events when offline)
  useEffect(() => {
    setIsCloudSync(isFirebaseConfigured());
    const unsubscribe = subscribeOrders((cloudOrders) => {
      setOrders(cloudOrders);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  // Add new order
  const addOrder = useCallback((newOrder: Order) => {
    // Optimistically update state
    setOrders(prev => [newOrder, ...prev.filter(o => o.id !== newOrder.id)]);

    // Persist to Cloud Firestore + local storage fallback
    createOrderInDb(newOrder).catch(console.error);

    // Dispatch local browser notification
    sendLocalNotification(
      'नवीन ऑर्डर नोंदवली!',
      `${newOrder.name} - ${newOrder.tot} - तारीख: ${newOrder.date}`
    );
  }, []);

  // Update order status with driver details
  const updateOrderStatus = useCallback((
    orderId: number,
    status: OrderStatus,
    driverInfo?: { driverName: string; driverPhone: string; vehicleType: string }
  ) => {
    // Optimistically update state
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status,
            ...(driverInfo || {})
          };
        }
        return ord;
      })
    );

    // Persist to Cloud Firestore
    updateOrderStatusInDb(orderId, status, driverInfo).catch(console.error);
  }, []);

  // Update delivery date
  const updateOrderDate = useCallback((orderId: number, newDate: string) => {
    // Optimistically update state
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const origDate = ord.origDate || ord.date;
          return {
            ...ord,
            origDate,
            date: newDate
          };
        }
        return ord;
      })
    );

    // Persist to Cloud Firestore
    updateOrderDateInDb(orderId, newDate).catch(console.error);
  }, []);

  // Update delivery location
  const updateOrderLocation = useCallback((orderId: number, newLocation: string) => {
    // Optimistically update state
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const origDel = ord.origDel || ord.del;
          return {
            ...ord,
            origDel,
            del: newLocation
          };
        }
        return ord;
      })
    );

    // Persist to Cloud Firestore
    updateOrderLocationInDb(orderId, newLocation).catch(console.error);
  }, []);

  // Delete single order
  const deleteOrder = useCallback((orderId: number) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    deleteOrderFromDb(orderId).catch(console.error);
  }, []);

  // Clear all orders
  const clearAllOrders = useCallback(() => {
    setOrders([]);
    clearAllOrdersFromDb().catch(console.error);
  }, []);

  return {
    orders,
    isCloudSync,
    addOrder,
    updateOrderStatus,
    updateOrderDate,
    updateOrderLocation,
    deleteOrder,
    clearAllOrders
  };
}
