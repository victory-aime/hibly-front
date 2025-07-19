import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    access_token?: string;
    refresh_token?: string;
    roles?: string;
    permissions?: string[];
    error?: string;
  }

  interface JWT {
    access_token?: string;
    refresh_token?: string;
    expires_at?: number;
    decoded?: any;
    error?: string;
  }
}
