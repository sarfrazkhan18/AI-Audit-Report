import { getAuth, signInWithPopup, signInWithRedirect, AuthProvider } from 'firebase/auth';
import { app } from '../config';
import { isAuthorizedDomain } from './domains';
import { getProvider, type SocialProvider } from './providers';

const auth = getAuth(app);

export const signInWithProvider = async (provider: AuthProvider): Promise<void> => {
  try {
    if (!isAuthorizedDomain()) {
      throw new Error(
        'This domain is not authorized for authentication. Please access the application through an authorized domain.'
      );
    }

    // Always try popup first
    await signInWithPopup(auth, provider);
  } catch (error: any) {
    console.error('Popup sign-in failed:', error);
    
    // If popup fails, try redirect
    if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
      await signInWithRedirect(auth, provider);
    } else {
      throw error;
    }
  }
};

export const handleSocialAuth = async (providerName: SocialProvider): Promise<void> => {
  try {
    const provider = getProvider(providerName);
    await signInWithProvider(provider);
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};

export { auth };