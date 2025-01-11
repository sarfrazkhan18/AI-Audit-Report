// List of authorized domains for Firebase Authentication
export const authorizedDomains = [
  'localhost',
  '127.0.0.1',
  'stackblitz.com',
  'webcontainer.io'
];

export const isAuthorizedDomain = (): boolean => {
  const hostname = window.location.hostname;
  return authorizedDomains.some(domain => hostname.includes(domain));
};