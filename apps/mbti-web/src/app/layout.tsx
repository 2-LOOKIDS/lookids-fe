import type { Metadata } from 'next';
import Image from 'next/image';
import './globals.css';
import { notoSansKr } from './utils/font';

export const metadata: Metadata = {
  title: 'Lookids MBTI Pet Recommender',
  description: 'Find your perfect pet based on your MBTI personality type',
  icons: {
    icon: 'favicon-96x96.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </head>
      <body
        className={`${notoSansKr.className} bg-gradient-to-r from-[#fd9340] to-orange-300 min-h-screen`}
      >
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
          <div className="container mx-auto px-4 py-2">
            <Image
              src="/lookids-logo.png"
              alt="Lookids Logo"
              width={180}
              height={60}
              className="h-auto w-auto"
              priority
            />
          </div>
        </header>
        <div className="pt-20">{children}</div>
      </body>
    </html>
  );
}
