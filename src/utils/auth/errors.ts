export const AUTH_ERROR_CODES = {
  POPUP_BLOCKED: 'auth/popup-blocked',
  POPUP_CLOSED: 'auth/popup-closed-by-user',
  CANCELLED_POPUP: 'auth/cancelled-popup-request',
  UNAUTHORIZED_DOMAIN: 'auth/unauthorized-domain',
  INVALID_EMAIL: 'auth/invalid-email',
  USER_DISABLED: 'auth/user-disabled',
  USER_NOT_FOUND: 'auth/user-not-found',
  WRONG_PASSWORD: 'auth/wrong-password',
  TOO_MANY_REQUESTS: 'auth/too-many-requests',
  NETWORK_ERROR: 'auth/network-request-failed'
} as const;

export const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case AUTH_ERROR_CODES.POPUP_BLOCKED:
      return 'Pop-up was blocked by your browser. Please allow pop-ups or try another sign-in method.';
    case AUTH_ERROR_CODES.POPUP_CLOSED:
      return 'Sign-in window was closed. Please try again.';
    case AUTH_ERROR_CODES.UNAUTHORIZED_DOMAIN:
      return 'This domain is not authorized for authentication. Please contact support.';
    case AUTH_ERROR_CODES.INVALID_EMAIL:
      return 'Invalid email address. Please check and try again.';
    case AUTH_ERROR_CODES.USER_DISABLED:
      return 'This account has been disabled. Please contact support.';
    case AUTH_ERROR_CODES.USER_NOT_FOUND:
      return 'No account found with this email. Please check or create a new account.';
    case AUTH_ERROR_CODES.WRONG_PASSWORD:
      return 'Incorrect password. Please try again or reset your password.';
    case AUTH_ERROR_CODES.TOO_MANY_REQUESTS:
      return 'Too many unsuccessful attempts. Please try again later.';
    case AUTH_ERROR_CODES.NETWORK_ERROR:
      return 'Network error. Please check your internet connection and try again.';
    default:
      return 'An error occurred during authentication. Please try again.';
  }
};