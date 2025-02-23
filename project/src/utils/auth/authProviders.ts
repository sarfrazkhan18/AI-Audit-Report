import { 
  GoogleAuthProvider, 
  GithubAuthProvider,
  AuthProvider
} from 'firebase/auth';
import { signInWithProvider } from '../../lib/firebase/auth';

export type SocialProvider = 'google' | 'github';

const providers = {
  google: () => {
    console.log('Creating Google provider');
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return provider;
  },
  github: () => {
    console.log('Creating GitHub provider');
    const provider = new GithubAuthProvider();
    provider.addScope('user');
    provider.addScope('email');
    return provider;
  }
};

export const getProvider = (name: SocialProvider): AuthProvider => {
  console.log('Getting provider for:', name);
  const providerCreator = providers[name];
  if (!providerCreator) {
    console.error('Unsupported provider:', name);
    throw new Error(`Unsupported provider: ${name}`);
  }
  return providerCreator();
};

export const handleAuthProvider = async (providerName: SocialProvider): Promise<void> => {
  console.log('Handling auth provider:', providerName);
  const provider = getProvider(providerName);
  console.log('Provider created, initiating sign in');
  await signInWithProvider(provider);
};