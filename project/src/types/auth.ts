import { FirebaseError } from 'firebase/app';

export interface AuthErrorState {
  code?: string;
  message: string;
}

export type AuthErrorHandler = (error: Error | FirebaseError) => void;