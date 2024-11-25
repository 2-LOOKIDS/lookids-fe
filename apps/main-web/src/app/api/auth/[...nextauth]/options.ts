import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import { signOut } from 'next-auth/react';
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
          return null;
        }
        // 로그인 요청을 보낼 URL
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
        }
        return null;
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
    }),
  ],
  callbacks: {
    async signIn({ profile, user, account }) {
      if (
        account?.provider === 'kakao' ||
        account?.provider === 'naver' ||
        account?.provider === 'google'
      ) {
        const res = await fetch(
          `${process.env.BACKEND_URL}/auth-service/auth/social-sign-in`,
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
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // 초기 로그인 시 AccessToken과 RefreshToken 설정
      if (account && user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.uuid = user.uuid;
        token.AccessTokenExpiredTime = user.AccessTokenExpiredTime;
      }
      // 만료된 토큰인지 확인 후 갱신 로직 실행
      if (Date.now() > token.AccessTokenExpiredTime && token.refreshToken) {
        try {
          const data = await refreshToken(
            token.refreshToken as string,
            token.uuid as string
          );
          token.accessToken = data.result.accessToken; // 갱신된 AccessToken 저장
          token.AccessTokenExpiredTime = data.result.AccessTokenExpiredTime; // 갱신된 AccessToken 만료 시간 저장
        } catch (error) {
          signOut({ callbackUrl: '/sign-in' }); // 토큰 갱신 실패 시 로그아웃
          console.error('Token 갱신 실패:', error);
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
};
