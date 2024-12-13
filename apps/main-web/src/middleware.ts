export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/chatting/:path*',
    '/map/:path*',
    '/addFeed/:path*',
    '/notification/:path*',
    '/mypage/:path*',
    '/feed/:path*',
  ], // 모든 하위 경로 포함
};
