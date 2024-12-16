'use client';

import { EllipsisVertical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MenuItem } from '../../types/common/MenuType';

interface CommonMenuProps {
  menuItems: MenuItem[];
}

export default function CommonMenu({ menuItems }: CommonMenuProps) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 메뉴 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      {/* 메뉴 버튼 */}
      <EllipsisVertical
        className="cursor-pointer text-gray-600 hover:text-gray-800"
        onClick={() => setMenuOpen((prev) => !prev)}
      />

      {/* 메뉴 아이템 */}
      {isMenuOpen && (
        <div className="absolute right-0 top-8 z-10 w-48 rounded-md bg-white shadow-lg transition-transform transform scale-100 origin-top-right">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 hover:text-gray-900 ${
                item.className || '' /* 메뉴 아이템마다 커스터마이징 가능 */
              }`}
              onClick={() => {
                item.onClick();
                setMenuOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
