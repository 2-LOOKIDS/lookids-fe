'use client';
import { EllipsisVertical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MenuItem } from '../../types/common/MenuType';

interface CommonMenuProps {
  menuItems: MenuItem[];
}

export default function CommonMenu({ menuItems }: CommonMenuProps) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // 메뉴 영역 감지용 ref

  // 메뉴 외부 클릭 감지 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false); // 메뉴 닫기
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
        className="cursor-pointer"
        onClick={() => setMenuOpen((prev) => !prev)}
      />
      {/* 메뉴 아이템 렌더링 */}
      {isMenuOpen && (
        <div className="absolute right-0 top-8 z-10 w-48 rounded-md bg-white shadow-lg">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => {
                item.onClick();
                setMenuOpen(false); // 메뉴 닫기
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
