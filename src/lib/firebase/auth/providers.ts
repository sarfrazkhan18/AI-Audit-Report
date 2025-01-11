import { 
  GoogleAuthProvider, 
  GithubAuthProvider,
  AuthProvider
} from 'firebase/auth';

export type SocialProvider = 'google' | 'github';

const providers = {
  google: () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    return provider;
  },
  github: () => {
    const provider = new GithubAuthProvider();
    provider.addScope('user');
    provider.addScope('email');
    return provider;
  }
};

export const getProvider = (name: SocialProvider): AuthProvider => {
  const providerCreator = providers[name];
  if (!providerCreator) {
    throw new Error(`Unsupported provider: ${name}`);
  }
  return providerCreator();
};