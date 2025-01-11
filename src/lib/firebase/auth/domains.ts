// Update authorized domains to include Netlify domains
export const authorizedDomains = [
  'localhost',
  '127.0.0.1',
  'stackblitz.com',
  'webcontainer.io',
  'netlify.app'
];

export const isAuthorizedDomain = (): boolean => {
  const hostname = window.location.hostname;
  return authorizedDomains.some(domain => hostname.includes(domain));
};