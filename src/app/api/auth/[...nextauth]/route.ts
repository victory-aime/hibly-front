import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';
import { refreshAccessToken } from '_utils/auth';
import { APIS } from '_store/endpoints';
import { encrypted } from '_utils/crypt';
import axios from 'axios';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            APIS(process.env.NEXT_PUBLIC_BACKEND_URL).AUTH.LOGIN.url,
            {
              email: credentials?.email,
              password: credentials?.password,
            },
          );
          const data = res.data;
          if (!data.access_token || !data.refresh_token) {
            throw new Error('Invalid credentials');
          }

          const decoded = jwtDecode<{ sub: string }>(data.access_token);
          return {
            id: decoded.sub,
            access_token: data.access_token,
            refresh_token: data.refresh_token,
          };
        } catch (error) {
          console.error('Authorize error:', error);
          return null;
        }
      },
    }),
  ],
  jwt: {
    encrypt: true,
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      const now = Math.floor(Date.now() / 1000);
      if (user) {
        const decoded = jwtDecode<{
          exp: number;
          role: string;
          permissions: string[];
        }>(user.access_token);

        return {
          ...token,
          access_token: user.access_token,
          refresh_token: user.refresh_token,
          expires_at: decoded.exp,
          role: decoded.role,
          permissions: decoded.permissions,
          decoded,
        };
      }
      if (now < token.expires_at - 180) {
        return token;
      }
      try {
        const refreshed = await refreshAccessToken(token.refresh_token);

        if (!refreshed?.access_token || !refreshed?.refresh_token) {
          throw new Error('Invalid refresh response');
        }

        const decoded = jwtDecode<{
          exp: number;
          role: string;
          permissions: string[];
        }>(refreshed.access_token);

        return {
          ...token,
          access_token: refreshed.access_token,
          refresh_token: refreshed.refresh_token,
          expires_at: decoded.exp,
          role: decoded.role,
          permissions: decoded.permissions,
          decoded,
        };
      } catch (error) {
        console.error('Error refreshing access token', error);
        return { ...token, error: 'RefreshAccessTokenError' };
      }
    },

    async session({ session, token }: { session: any; token: any }) {
      session.access_token = token.access_token
        ? encrypted(token.access_token)
        : null;
      session.refresh_token = token.refresh_token
        ? encrypted(token.refresh_token)
        : null;
      session.expires_at = token.expires_at ?? null;
      session.roles = token.role ?? null;
      session.permissions = token.permissions ?? [];
      session.userId = token.decoded?.sub ?? null;
      session.error = token.error ?? null;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
