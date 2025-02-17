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
  const uuid = session?.user?.uuid;
  const accesstoken = session?.user?.accessToken;
  return (
    <html lang="ko">
      <body
        className={`${notoSansKr.className} flex justify-center bg-[#F9F9F9] font-sans`}
      >
        <div className="min-h-screen w-full max-w-[430px] bg-[#F9F9F9]">
          <AuthContextProvider
            isAuth={isAuth}
            uuid={uuid}
            accessToken={accesstoken}
          >
            {children}
          </AuthContextProvider>
        </div>
      </body>
    </html>
  );
}
