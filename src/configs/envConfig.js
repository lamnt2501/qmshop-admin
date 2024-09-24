const envVariable = import.meta.env;
export const {
  VITE_MANAGEMENT_API_URL,
  VITE_AUTH_API_URL,
  VITE_TINY_MCE_API_KEY,
  VITE_PUBLIC_API_URL,
  VITE_WEBSOCKET_URL,
} = envVariable;
