const getAppUrl = () => {
  if (process.env.VERCEL_ENV === 'production') {
    return 'https://meetique.vercel.app';
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
};

export const BETTER_AUTH_URL = getAppUrl();
export const API_URL = getAppUrl();
