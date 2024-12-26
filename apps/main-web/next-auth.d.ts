import 'next-auth';

declare module 'next-auth' {
  interface User {
    accessToken: string;
    refreshToken: string;
    uuid: string;
    AccessTokenExpiredTime: number;
  }
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
      uuid: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    uuid: string;
    AccessTokenExpiredTime: number;
  }
}
