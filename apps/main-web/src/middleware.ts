export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/chatting/:path*',
    '/map/:path*',
    '/addFeed/:path*',
    '/notification/:path*',
    '/mypage/:path*',
    '/feed/:path*',
  ],
};
