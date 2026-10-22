declare const process: any;

/**
 * Resolves the base API URL across Vercel Services, Node.js runtimes, and local development.
 * - In a server/runtime function with Vercel service binding: reads process.env.SERVER_URL
 * - In Vite with custom VITE_API_URL: reads import.meta.env.VITE_API_URL
 * - In the browser on Vercel: returns '' (relative path), so requests to '/api/...'
 *   are handled by Vercel's rewrite rule:
 *   { "source": "/api/(.*)", "destination": { "service": "server" } }
 */
export const getBaseApiUrl = (): string => {
  try {
    if (typeof process !== 'undefined' && process?.env) {
      if (process.env.SERVER_URL) {
        return String(process.env.SERVER_URL).replace(/\/$/, '');
      }
      if (process.env.VITE_API_URL) {
        return String(process.env.VITE_API_URL).replace(/\/$/, '');
      }
    }
  } catch {
    // Ignore in pure browser contexts where process is not defined
  }

  try {
    if (typeof import.meta !== 'undefined' && import.meta?.env?.VITE_API_URL) {
      return String(import.meta.env.VITE_API_URL).replace(/\/$/, '');
    }
  } catch {
    // Ignore
  }

  return '';
};
