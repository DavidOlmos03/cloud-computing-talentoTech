export const config = {
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000',
  API_LICENSES_ENDPOINT: process.env.REACT_APP_API_LICENSES_ENDPOINT || '/licenses',
  NODE_ENV: process.env.NODE_ENV || 'development'
};

export const isDevelopment = config.NODE_ENV === 'development';
export const isProduction = config.NODE_ENV === 'production'; 