import React from 'react';
import { AlertCircle } from 'lucide-react';

interface AuthErrorProps {
  message: string;
}

export const AuthError: React.FC<AuthErrorProps> = ({ message }) => {
  return (
    <div className="rounded-md bg-destructive/10 p-4 mb-4">
      <div className="flex">
        <AlertCircle className="h-5 w-5 text-destructive" />
        <div className="ml-3">
          <p className="text-sm text-destructive">{message}</p>
          {message.includes('domain is not authorized') && (
            <p className="text-sm text-destructive mt-2">
              Authorized domains: localhost, stackblitz.com, webcontainer.io
            </p>
          )}
        </div>
      </div>
    </div>
  );
};