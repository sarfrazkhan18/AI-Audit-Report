import { useState, useCallback } from 'react';
import { FirebaseError } from 'firebase/app';
import { getAuthErrorMessage } from '../utils/auth/errors';
import { AuthErrorState } from '../types/auth';

export const useAuthError = () => {
  const [error, setError] = useState<AuthErrorState | null>(null);

  const handleError = useCallback((error: Error | FirebaseError) => {
    if (error instanceof FirebaseError) {
      setError({
        code: error.code,
        message: getAuthErrorMessage(error.code)
      });
    } else {
      setError({
        message: error.message
      });
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    setError: handleError,
    clearError
  };
};