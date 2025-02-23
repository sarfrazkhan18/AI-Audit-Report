import { getAuth, signInWithPopup, signInWithRedirect, AuthProvider } from 'firebase/auth';
import { app } from './config';
import { isAuthorizedDomain } from './auth-domains';

const auth = getAuth(app);

export const signInWithProvider = async (provider: AuthProvider): Promise<void> => {
  console.log('signInWithProvider called');
  console.log('Current domain:', window.location.hostname);
  console.log('Auth domains:', isAuthorizedDomain());
  
  if (!isAuthorizedDomain()) {
    console.error('Unauthorized domain detected');
    throw new Error(
      'This domain is not authorized for authentication. Please access the application through an authorized domain.'
    );
  }

  try {
    console.log('Attempting popup sign-in');
    await signInWithPopup(auth, provider);
    console.log('Popup sign-in successful');
  } catch (error: any) {
    console.error('Sign-in error:', {
      code: error.code,
      message: error.message,
      name: error.name
    });
    
    // If popup fails, try redirect
    if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
      console.log('Popup failed, attempting redirect sign-in');
      await signInWithRedirect(auth, provider);
    } else {
      throw error;
    }
  }
};

export { auth };