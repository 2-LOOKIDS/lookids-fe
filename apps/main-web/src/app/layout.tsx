import '@repo/ui/styles.css';

import AuthContextProvider from '../providers/AuthContextProvider';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { notoSansKr } from '../utils/font';
import { options } from './api/auth/[...nextauth]/options';

// import { Toaster } from "@repo/ui/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    template: '%s | Lookids',
    default: 'Lookids',
  },
  description: '루키즈 공식 홈페이지',
  icons: {
    icon: '/icons/favicon-96x96.png',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const session = await getServerSession(options);
  const isAuth = session?.user ? true : false;

  return (
    <html lang="ko">
      <body
        className={`${notoSansKr.className} flex justify-center bg-[#757575] font-sans`}
      >
        <main className="min-h-screen w-full max-w-[430px] bg-white">
          <h1 className="text-[0px]">Lookids lookids 루키즈</h1>
          <AuthContextProvider isAuth={isAuth}>{children}</AuthContextProvider>
        </main>
      </body>
    </html>
  );
}
