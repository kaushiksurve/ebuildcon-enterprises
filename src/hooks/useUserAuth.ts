import { useState, useEffect, useCallback } from 'react';
import { UserProfile } from '../types';
import {
  loadRegisteredUsers,
  loadActiveUser,
  saveActiveUser,
  DEFAULT_USERS
} from '../utils/storage';
import {
  subscribeUsers,
  saveUserToDb
} from '../services/dbService';

export function useUserAuth() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => loadActiveUser());
  const [registeredUsers, setRegisteredUsers] = useState<UserProfile[]>(() => loadRegisteredUsers());

  // Save active user to local storage whenever active user changes
  useEffect(() => {
    saveActiveUser(currentUser);
  }, [currentUser]);

  // Subscribe to real-time Cloud Firestore updates for registered users
  useEffect(() => {
    const unsubscribe = subscribeUsers((cloudUsers) => {
      setRegisteredUsers(cloudUsers);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  // Clean phone string to 10 digits
  const cleanPhone = (val: string) => val.replace(/\D/g, '').slice(-10);

  // Login handler
  const login = useCallback(
    (phoneInput: string, pinInput: string, remember: boolean = true): { success: boolean; error?: string } => {
      const phone = cleanPhone(phoneInput);
      const pin = pinInput.trim();

      if (!phone || phone.length < 10) {
        return { success: false, error: 'invalid_phone' };
      }
      if (!pin) {
        return { success: false, error: 'pin_required' };
      }

      // Check against registered users
      const user = registeredUsers.find(u => cleanPhone(u.phone) === phone);

      if (!user) {
        return { success: false, error: 'user_not_found' };
      }

      if (user.pin && user.pin !== pin) {
        return { success: false, error: 'incorrect_pin' };
      }

      const updatedUser: UserProfile = {
        ...user,
        rememberMe: remember,
        lastLoginAt: new Date().toISOString()
      };

      // Optimistically update
      setRegisteredUsers(prev => prev.map(u => (u.id === user.id ? updatedUser : u)));
      setCurrentUser(updatedUser);

      // Persist to Cloud Firestore + local storage fallback
      saveUserToDb(updatedUser).catch(console.error);

      return { success: true };
    },
    [registeredUsers]
  );

  // Sign up handler
  const signup = useCallback(
    (data: {
      name: string;
      phone: string;
      pin: string;
      supervisorName?: string;
      supervisorPhone?: string;
      siteAddress?: string;
      deliveryLocation?: string;
      rememberMe?: boolean;
    }): { success: boolean; error?: string } => {
      const phone = cleanPhone(data.phone);
      const name = data.name.trim();
      const pin = data.pin.trim() || '1234';

      if (!name) {
        return { success: false, error: 'name_required' };
      }
      if (!phone || phone.length < 10) {
        return { success: false, error: 'invalid_phone' };
      }
      if (!pin || pin.length < 4) {
        return { success: false, error: 'pin_min_length' };
      }

      // If user already exists, update and log in
      const existing = registeredUsers.find(u => cleanPhone(u.phone) === phone);
      if (existing) {
        const updated: UserProfile = {
          ...existing,
          name,
          pin,
          supervisorName: data.supervisorName?.trim() || existing.supervisorName,
          supervisorPhone: data.supervisorPhone?.trim() || existing.supervisorPhone,
          siteAddress: data.siteAddress?.trim() || existing.siteAddress,
          deliveryLocation: data.deliveryLocation?.trim() || existing.deliveryLocation,
          rememberMe: data.rememberMe ?? true,
          lastLoginAt: new Date().toISOString()
        };
        setRegisteredUsers(prev => prev.map(u => (u.id === existing.id ? updated : u)));
        setCurrentUser(updated);
        saveUserToDb(updated).catch(console.error);
        return { success: true };
      }

      // Create new user profile
      const newUser: UserProfile = {
        id: `usr_${phone}_${Date.now()}`,
        name,
        phone,
        pin,
        supervisorName: data.supervisorName?.trim() || '',
        supervisorPhone: data.supervisorPhone?.trim() || '',
        siteAddress: data.siteAddress?.trim() || '',
        deliveryLocation: data.deliveryLocation?.trim() || '',
        rememberMe: data.rememberMe ?? true,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };

      setRegisteredUsers(prev => [newUser, ...prev]);
      setCurrentUser(newUser);
      saveUserToDb(newUser).catch(console.error);

      return { success: true };
    },
    [registeredUsers]
  );

  // Quick 1-click Demo Login
  const quickDemoLogin = useCallback((demoPhone: string = '9819927174') => {
    const user = registeredUsers.find(u => cleanPhone(u.phone) === demoPhone) || DEFAULT_USERS[0];
    const updated: UserProfile = {
      ...user,
      lastLoginAt: new Date().toISOString()
    };
    setCurrentUser(updated);
    saveUserToDb(updated).catch(console.error);
  }, [registeredUsers]);

  // Logout handler
  const logout = useCallback(() => {
    setCurrentUser(null);
    saveActiveUser(null);
  }, []);

  // Update profile
  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setCurrentUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      setRegisteredUsers(users => users.map(u => (u.id === prev.id ? updated : u)));
      saveUserToDb(updated).catch(console.error);
      return updated;
    });
  }, []);

  return {
    currentUser,
    isLoggedIn: !!currentUser,
    login,
    signup,
    quickDemoLogin,
    logout,
    updateProfile,
    registeredUsers
  };
}
