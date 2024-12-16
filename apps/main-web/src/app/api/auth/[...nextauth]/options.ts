import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import { refreshToken } from '../../../../actions/common/refreshToken';

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        loginId: { label: 'id', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.loginId || !credentials?.password) {
          throw new Error('Missing credentials');
        }
        const res = await fetch(
          `${process.env.BACKEND_URL}/auth-service/auth/sign-in`,
          {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          }
        );
        if (res.ok) {
          const user = await res.json();
          return user.result;
        } else {
          throw new Error('Invalid credentials');
        }
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope: 'openid email profile',
        },
      },
    }),
  ],
  cookies: {
    state: {
      name: 'next-auth.state-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      },
    },
  },
  callbacks: {
    async signIn({ profile, user, account }) {
      if (
        account?.provider === 'kakao' ||
        account?.provider === 'naver' ||
        account?.provider === 'google'
      ) {
        try {
          const res = await fetch(
            `${process.env.BACKEND_URL}/auth-service/auth/social-sign`,
            {
              method: 'POST',
              body: JSON.stringify({
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              }),
              headers: { 'Content-Type': 'application/json' },
            }
          );

          if (res.ok) {
            const data = await res.json();
            user.accessToken = data.result.accessToken;
            user.refreshToken = data.result.refreshToken;
            user.uuid = data.result.uuid;
            return true;
          } else {
            console.error('Social login failed:', await res.text());
            return false;
          }
        } catch (error) {
          console.error('Error during social sign-in:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.uuid = user.uuid;
        token.AccessTokenExpiredTime = user.AccessTokenExpiredTime;
      }

      if (
        token.refreshToken &&
        token.AccessTokenExpiredTime &&
        Date.now() > token.AccessTokenExpiredTime
      ) {
        try {
          const data = await refreshToken(
            token.refreshToken as string,
            token.uuid as string
          );
          token.accessToken = data.result.accessToken;
          token.AccessTokenExpiredTime = data.result.AccessTokenExpiredTime;
        } catch (error) {
          console.error('Token refresh failed:', error);
          token.error = 'RefreshTokenError';
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        uuid: token.uuid,
        refreshToken: token.refreshToken,
        accessToken: token.accessToken,
      };

      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
    error: '/error',
  },
  debug: true, // 디버깅 로그 활성화
};
