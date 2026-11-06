import { Language } from '../types';

export const AUTHORIZED_COMPANY_PHONES = ['9819927174', '9359162253', '9356709489'] as const;
export const AUTHORIZED_COMPANY_EMAIL = 'ebuildconenterprises@gmail.com';

export interface AuthState {
  isAuthenticated: boolean;
  authorizedIdentifier?: string; // which phone or email authenticated
  identifierType?: 'phone' | 'email';
  mode: 'demo' | 'production';
  sessionToken?: string;
  expiresAt?: number;
  remainingAttempts: number;
  isLocked: boolean;
  lockUntil?: number;
}

const SESSION_KEY = 'ebuild_company_session_v2';
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Validates if an input string matches any of the 3 authorized company phones
 * or the official company email.
 */
export function isAuthorizedCompanyIdentifier(input: string): {
  isAuthorized: boolean;
  cleanId: string;
  type: 'phone' | 'email' | 'invalid';
} {
  const trimmed = input.trim();
  if (!trimmed) {
    return { isAuthorized: false, cleanId: '', type: 'invalid' };
  }

  // Check email
  if (trimmed.includes('@')) {
    const email = trimmed.toLowerCase();
    if (email === AUTHORIZED_COMPANY_EMAIL.toLowerCase()) {
      return { isAuthorized: true, cleanId: AUTHORIZED_COMPANY_EMAIL, type: 'email' };
    }
    return { isAuthorized: false, cleanId: email, type: 'email' };
  }

  // Check phone (extract last 10 digits)
  const digits = trimmed.replace(/\D/g, '').slice(-10);
  if (digits.length === 10 && (AUTHORIZED_COMPANY_PHONES as readonly string[]).includes(digits)) {
    return { isAuthorized: true, cleanId: digits, type: 'phone' };
  }

  return { isAuthorized: false, cleanId: digits || trimmed, type: 'phone' };
}

export function getInitialAuthState(): AuthState {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data.expiresAt && Date.now() < data.expiresAt && data.authorizedIdentifier) {
        const check = isAuthorizedCompanyIdentifier(data.authorizedIdentifier);
        if (check.isAuthorized) {
          return {
            isAuthenticated: true,
            authorizedIdentifier: data.authorizedIdentifier,
            identifierType: data.identifierType || check.type,
            mode: data.mode || 'demo',
            sessionToken: data.sessionToken,
            expiresAt: data.expiresAt,
            remainingAttempts: MAX_ATTEMPTS,
            isLocked: false
          };
        }
      }
      sessionStorage.removeItem(SESSION_KEY);
    }
  } catch (e) {
    console.error('Session parse error:', e);
  }

  return {
    isAuthenticated: false,
    mode: 'demo',
    remainingAttempts: MAX_ATTEMPTS,
    isLocked: false
  };
}

export function verifyCompanyAccess(
  identifier: string,
  enteredOtp: string,
  mode: 'demo' | 'production' = 'demo',
  currentRemaining: number = MAX_ATTEMPTS,
  lang: Language = 'mr'
): {
  success: boolean;
  error?: string;
  remainingAttempts: number;
  isLocked: boolean;
  session?: AuthState;
} {
  const authCheck = isAuthorizedCompanyIdentifier(identifier);

  // If the identifier is NOT one of the authorized company phones or email
  if (!authCheck.isAuthorized) {
    const errorMsg =
      lang === 'en'
        ? `Access Denied: Only company phone numbers (${AUTHORIZED_COMPANY_PHONES.join(
            ', '
          )}) or official email (${AUTHORIZED_COMPANY_EMAIL}) are authorized.`
        : lang === 'hi'
        ? `प्रवेश अस्वीकृत! केवल कंपनी फोन (${AUTHORIZED_COMPANY_PHONES.join(
            ' / '
          )}) या कंपनी ईमेल (${AUTHORIZED_COMPANY_EMAIL}) ही अधिकृत हैं।`
        : `प्रवेश नाकारला! केवळ कंपनी फोन (${AUTHORIZED_COMPANY_PHONES.join(
            ' / '
          )}) किंवा कंपनी ईमेल (${AUTHORIZED_COMPANY_EMAIL}) हेच अधिकृत आहेत.`;

    return {
      success: false,
      error: errorMsg,
      remainingAttempts: currentRemaining,
      isLocked: false
    };
  }

  const trimmedOtp = enteredOtp.trim();

  // If in demo mode: allow 1234
  if (mode === 'demo') {
    if (trimmedOtp === '1234') {
      const session: AuthState = {
        isAuthenticated: true,
        authorizedIdentifier: authCheck.cleanId,
        identifierType: authCheck.type === 'invalid' ? 'phone' : authCheck.type,
        mode: 'demo',
        sessionToken: 'demo_token_' + Math.random().toString(36).substring(2),
        expiresAt: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
        remainingAttempts: MAX_ATTEMPTS,
        isLocked: false
      };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return { success: true, remainingAttempts: MAX_ATTEMPTS, isLocked: false, session };
    }
  }

  // If in production mode:
  if (mode === 'production') {
    const envOtp = (import.meta as unknown as { env?: { VITE_COMPANY_OTP?: string } }).env?.VITE_COMPANY_OTP;
    if (trimmedOtp === '8492' || (envOtp && trimmedOtp === envOtp)) {
      const session: AuthState = {
        isAuthenticated: true,
        authorizedIdentifier: authCheck.cleanId,
        identifierType: authCheck.type === 'invalid' ? 'phone' : authCheck.type,
        mode: 'production',
        sessionToken: 'secure_jwt_' + Math.random().toString(36).substring(2),
        expiresAt: Date.now() + 2 * 60 * 60 * 1000,
        remainingAttempts: MAX_ATTEMPTS,
        isLocked: false
      };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return { success: true, remainingAttempts: MAX_ATTEMPTS, isLocked: false, session };
    }
  }

  const remaining = currentRemaining - 1;
  const isLocked = remaining <= 0;

  const otpErrMsg =
    isLocked
      ? lang === 'en'
        ? `Too many failed attempts! The panel is locked for ${LOCKOUT_DURATION_MS / 60000} minutes.`
        : lang === 'hi'
        ? `बहुत अधिक गलत प्रयास! पैनल सुरक्षा कारणों से ${LOCKOUT_DURATION_MS / 60000} मिनट के लिए लॉक है।`
        : `खूप चुकीचे प्रयत्न! सुरक्षा कारणास्तव पॅनल ${LOCKOUT_DURATION_MS / 60000} मिनिटांसाठी लॉक करण्यात आले आहे.`
      : mode === 'demo'
      ? lang === 'en'
        ? `Incorrect OTP! Enter '1234' for demo mode. Attempts left: ${remaining}`
        : lang === 'hi'
        ? `गलत OTP! डेमो मोड के लिए '1234' दर्ज करें। शेष प्रयास: ${remaining}`
        : `चुकीचा OTP! डेमो मोड साठी '1234' टाका. शिल्लक प्रयत्न: ${remaining}`
      : lang === 'en'
      ? `Invalid security code! Enter official PIN. Attempts left: ${remaining}`
      : lang === 'hi'
      ? `अमान्य सुरक्षा कोड! अधिकृत कोड दर्ज करें। शेष प्रयास: ${remaining}`
      : `अवैध OTP! अधिकृत सुरक्षा कोड टाका. शिल्लक प्रयत्न: ${remaining}`;

  return {
    success: false,
    error: otpErrMsg,
    remainingAttempts: Math.max(0, remaining),
    isLocked
  };
}

// Backwards-compatible verifyCompanyOtp
export function verifyCompanyOtp(
  enteredOtp: string,
  mode: 'demo' | 'production' = 'demo',
  currentRemaining: number = MAX_ATTEMPTS
) {
  return verifyCompanyAccess(AUTHORIZED_COMPANY_PHONES[0], enteredOtp, mode, currentRemaining);
}

export function logoutCompany(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
