import React, { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuthError } from '../../hooks/useAuthError';

export const AuthRedirectHandler: React.FC = () => {
  const { setError } = useAuthError();

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log('Redirect sign-in successful');
        }
      } catch (error: any) {
        console.error('Redirect sign-in error:', error);
        setError(error);
      }
    };

    handleRedirectResult();
  }, [setError]);

  return null;
};