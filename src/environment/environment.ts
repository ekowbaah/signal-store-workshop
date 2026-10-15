/**
 * Public development configuration only.
 * Replace these values at build/deploy time; never commit production secrets.
 */
export const environment = {
  production: false,
  supabaseUrl: 'http://127.0.0.1:54321',
  supabaseKey: 'local-development-anon-key',
};
