const getAppUrl = () => {
  if (process.env.VERCEL_ENV === 'production') {
    return 'https://meetique.vercel.app';
  }

  if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_BRANCH_URL) {
    return `https://${process.env.VERCEL_BRANCH_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
};

const getTrustedOrigins = () => {
  const origins = ['https://meetique.vercel.app']; // Production URL

  // Add preview URL if available
  if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_BRANCH_URL) {
    origins.push(`https://${process.env.VERCEL_BRANCH_URL}`);
  }

  // Add localhost for development
  if (process.env.NODE_ENV === 'development') {
    origins.push('http://localhost:3000');
  }

  return origins;
};

export const BETTER_AUTH_URL = getAppUrl();
export const API_URL = getAppUrl();
export const TRUSTED_ORIGINS = getTrustedOrigins();
