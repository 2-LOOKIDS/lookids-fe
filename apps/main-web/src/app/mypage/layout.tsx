import { Metadata } from 'next';
import { ReactNode } from 'react';
import CommonHeader from '../../components/ui/CommonHeader';

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'my page',
};

export default function layout({ children }: LayoutProps) {
  return (
    <>
      <header>
        <CommonHeader title={'MY PAGE'} ismenu={false} />
      </header>
      {children}
    </>
  );
}
