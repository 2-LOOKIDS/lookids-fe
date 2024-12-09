import CommonHeader from '../../components/ui/CommonHeader';
import { Metadata } from 'next';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: '마이 페이지',
};

export default function layout({ children }: LayoutProps) {
  return (
    <>
      <header>
        <CommonHeader title={'마이 페이지'} ismenu={false} />
      </header>
      {children}
    </>
  );
}
