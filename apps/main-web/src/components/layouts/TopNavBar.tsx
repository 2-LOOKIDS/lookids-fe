'use client';
import { useEffect, useRef, useState } from 'react';
import NavMenus from './NavMenus';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function TopNavBar({ onMenuClick }: HeaderProps) {
  const [isView, setIsView] = useState(true);
  const prevScrollY = useRef(0);
  const ticking = useRef(false);

  const handleScroll = () => {
    if (!ticking.current) {
      ticking.current = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = Math.max(0, window.scrollY);
        const maxScrollY =
          document.documentElement.scrollHeight - window.innerHeight;

        if (currentScrollY === 0 || currentScrollY >= maxScrollY) {
          ticking.current = false;
          return;
        }

        if (currentScrollY > prevScrollY.current) {
          setIsView(false);
        } else if (currentScrollY < prevScrollY.current) {
          setIsView(true);
        }

        prevScrollY.current = currentScrollY;
        ticking.current = false;
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`flex justify-between items-center px-4 py-[0.8rem] transition-transform duration-300 
      fixed top-0 left-0 right-0 z-[20]
      backdrop-blur-md
      ${isView ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <NavMenus onMenuClick={onMenuClick} />
    </header>
  );
}
