import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        login_id: { label: "id", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.login_id || !credentials?.password) {
          return null;
        }
        // 로그인 요청을 보낼 URL
        const res = await fetch(
          `${process.env.BACKEND_URL}/api/v1/auth/sign-in`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          },
        );
        if (res.ok) {
          const user = await res.json();
          return user.data;
        }
        return null;
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ profile, user, account }) {
      // Kakao 로그인 처리
      if (account?.provider === "kakao") {
        const result = await fetch(
          `${process.env.BACKEND_URL}/api/v1/auth/sociallogin`,
          {
            method: "POST",
            body: JSON.stringify({
              provider: account.provider,
              provider_id: account.providerAccountId,
            }),
            headers: { "Content-Type": "application/json" },
          },
        );
        if (result.ok) {
          const data = await result.json();
          user.accessToken = data.data.accessToken;
          user.name = data.data.name;
          return true;
        } else if (result.status === 401) {
          const provider = account.provider;
          const providerAccountId = account.providerAccountId;
          //
        } else {
          throw new Error(`${account.provider} 로그인 중 오류 발생`);
        }
      }
      return true;
    },

    async jwt({ token, user, account, profile, session }) {
      if (account && user) {
        token.accessToken = user.accessToken; // accessToken을 string으로 캐스팅
      }

      return token;
    },

    async session({ session, token, user }) {
      session.user = {
        ...session.user,
        uuid: user.uuid,
        refreshToken: user.refreshToken,
        accessToken: token.accessToken as string, // token에서 accessToken을 string으로 캐스팅
      };
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
};
