'use client';
import BottomAppBar from '../../components/layouts/BottomAppBar';
import { ReactNode, useState } from 'react';
import TopNavBar from '../../components/layouts/TopNavBar';
import { Sidebar } from '../../components/layouts/SideBar';

interface LayoutProps {
  children: ReactNode;
}

export default function layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <TopNavBar onMenuClick={() => setSidebarOpen(true)} />
      <div className={`flex flex-1 ${sidebarOpen} ? : overflow-auto`}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      {children}
      <footer>
        <BottomAppBar />
      </footer>
    </>
  );
}
