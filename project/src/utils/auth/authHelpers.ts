import { 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  Auth, 
  AuthProvider,
  AuthError
} from 'firebase/auth';
import { AUTH_ERROR_CODES } from './errors';
import { isAuthorizedDomain } from './config';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export const handleAuthFlow = async (
  auth: Auth, 
  provider: AuthProvider
): Promise<void> => {
  console.log('Starting auth flow with provider:', provider.providerId);
  console.log('Current domain:', window.location.hostname);
  console.log('Is authorized domain:', isAuthorizedDomain());
  
  let retries = 0;
  
  const attemptAuth = async (): Promise<void> => {
    try {
      console.log(`Auth attempt ${retries + 1} of ${MAX_RETRIES}`);
      
      // Try popup first
      console.log('Attempting popup sign-in...');
      await signInWithPopup(auth, provider);
      console.log('Popup sign-in successful');
      
    } catch (error: any) {
      console.error('Auth error details:', {
        code: error.code,
        message: error.message,
        name: error.name,
        stack: error.stack
      });

      if (error.code === AUTH_ERROR_CODES.UNAUTHORIZED_DOMAIN) {
        console.log('Unauthorized domain, attempting redirect sign-in...');
        try {
          await signInWithRedirect(auth, provider);
          const result = await getRedirectResult(auth);
          if (!result) {
            console.error('Redirect sign-in failed - no result');
            throw new Error('Redirect sign-in failed');
          }
          console.log('Redirect sign-in successful');
        } catch (redirectError: any) {
          console.error('Redirect sign-in error:', redirectError);
          if (redirectError.code === AUTH_ERROR_CODES.UNAUTHORIZED_DOMAIN) {
            throw new Error('This domain is not authorized for authentication. Please try again later or contact support.');
          }
          throw redirectError;
        }
      } else if (
        [AUTH_ERROR_CODES.POPUP_BLOCKED, AUTH_ERROR_CODES.POPUP_CLOSED].includes(error.code) &&
        retries < MAX_RETRIES
      ) {
        retries++;
        console.log(`Retrying auth - attempt ${retries} of ${MAX_RETRIES}`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * retries));
        return attemptAuth();
      } else {
        throw error;
      }
    }
  };

  await attemptAuth();
};