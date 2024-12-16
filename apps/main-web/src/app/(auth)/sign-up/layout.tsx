import CommonHeader from '../../../components/ui/CommonHeader';
import { Metadata } from 'next';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: '회원가입',
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <header>
        <h1 className="sr-only">Lookids, 루키즈 | 회원가입</h1>
        <CommonHeader title="회원가입" ismenu={false} />
      </header>
      {children}
    </>
  );
}
