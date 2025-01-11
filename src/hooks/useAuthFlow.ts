import { useCallback } from 'react';
import { FirebaseError } from 'firebase/app';
import { signInWithProvider, SocialProvider } from '../utils/auth/authProviders';
import { useAuthError } from './useAuthError';
import { useNavigate } from 'react-router-dom';

export const useAuthFlow = () => {
  const { error, setError, clearError } = useAuthError();
  const navigate = useNavigate();

  const handleAuth = useCallback(async (providerName: SocialProvider) => {
    clearError();
    try {
      await signInWithProvider(providerName);
      navigate('/dashboard');
    } catch (error) {
      console.error('Authentication error:', error);
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/network-request-failed') {
          setError(new Error('Network error. Please check your internet connection and try again.'));
        } else if (error.code === 'auth/unauthorized-domain') {
          setError(new Error('This domain is not authorized for authentication. Please try again later.'));
        } else {
          setError(error);
        }
      } else if (error instanceof Error) {
        setError(error);
      }
    }
  }, [clearError, setError, navigate]);

  return {
    error,
    handleAuth,
    clearError
  };
};