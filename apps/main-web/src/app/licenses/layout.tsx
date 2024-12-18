import CommonHeader from '../../components/ui/CommonHeader';
import { Metadata } from 'next';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Licenses',
};

export default function layout({ children }: LayoutProps) {
  return <>{children}</>;
}
